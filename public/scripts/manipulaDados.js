const CATEGORIA_CORES = {
    'Excelente': '#5470c6', // Azul/Roxo ECharts padrão
    'Regular': '#91cc75',   // Verde ECharts padrão
    'Bom': '#fac858',       // Amarelo ECharts padrão
    'Ruim': '#ee6666',      // Vermelho ECharts padrão

    // Para 'prioridade' (exemplos)
    'Alta': '#fc8452',
    'Média': '#3ba272', 
    'Media': '#3ba272',
    'Baixa': '#73c0de',
    'Urgente': '#d03030', // Um vermelho mais forte

};
function getCorParaCategoria(categoriaNome, corPadrao = '#cccccc') {
    return CATEGORIA_CORES[categoriaNome] || corPadrao;
}

// >>>MANIPULANDO OS DADOS DO ARQUIVO JSON<<<
async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('/api/data'); //recebendo os dados do servidor (por meio de promises)
    const data = await response.json(); 
    return data;
}

const dados = await fetchData();

export const dadosMestres = await fetchData();

// --- GERENCIAMENTO DE FILTROS ---
let activeFilters = {
    cliente: null,
    servico: null,
    prioridade: null,
    nota: null,
    atendente: null 
};
export function getActiveFilters() {
    return { ...activeFilters }; 
}
export function applyFilter(filterType, filterValue) {
    if (typeof activeFilters[filterType] === 'undefined') {
        console.warn(`Tipo de filtro desconhecido: ${filterType}`);
        return;
    }
// Comportamento de alternância: se clicar no mesmo valor, limpa o filtro para esse tipo.
    if (activeFilters[filterType] === filterValue) {
        activeFilters[filterType] = null;
        console.log(`Filtro para '${filterType}' removido.`);
    } else {
        activeFilters[filterType] = filterValue;
        console.log(`Filtro para '${filterType}' definido como '${filterValue}'.`);
    }

    // Dispara a atualização de todos os componentes visuais
    if (window.dashboard && typeof window.dashboard.refreshAllVisuals === 'function') {
        window.dashboard.refreshAllVisuals();
    } else {
        console.warn("Função window.dashboard.refreshAllVisuals não encontrada.");
    }
}

export function clearAllFilters() {
    console.log("Limpando todos os filtros.");
    for (let key in activeFilters) {
        activeFilters[key] = null;
    }
    if (window.dashboard && typeof window.dashboard.refreshAllVisuals === 'function') {
        window.dashboard.refreshAllVisuals();
    }
}

// --- FUNÇÃO PARA OBTER DADOS FILTRADOS ---
export function getFilteredData() {
    if (!dadosMestres || dadosMestres.length === 0) {
        return [];
    }
    let filtered = [...dadosMestres];

    for (const type in activeFilters) {
        if (activeFilters[type] !== null) {
            filtered = filtered.filter(item => item[type] === activeFilters[type]);
        }
    }
    console.log("getFilteredData: retornando", filtered.length, "registros filtrados.");
    return filtered;
}
// --- FUNÇÕES DE PREPARAÇÃO DE DADOS (MODIFICADAS PARA ACEITAR currentData) ---
export function prepareNotaData(currentData) {
    if (!currentData || currentData.length === 0) return [];
    const notasContagem = currentData.reduce((acc, item) => {
        if (item && typeof item.nota !== 'undefined') { // Verifica se item e item.nota existem
            acc[item.nota] = (acc[item.nota] || 0) + 1;
        }
        return acc;
    }, {}); // Inicia com objeto vazio
    return Object.entries(notasContagem).map(([nomeCategoria, valor]) => ({
        name: nomeCategoria,
        value: valor,
        itemStyle: {
            color: getCorParaCategoria(nomeCategoria) // Assumindo que getCorParaCategoria existe
        }
    }));
}

export function frequenciaClientes(currentData) {
    if (!currentData || currentData.length === 0) {
        console.warn("[frequenciaClientes] currentData está vazio ou não definido.");
        return [];
    }
    const clientesContagem = currentData.reduce((acc, item) => {
        if (item && typeof item.cliente !== 'undefined'&& item.cliente !== null && String(item.cliente).trim() !== "") { // VERIFICAÇÃO IMPORTANTE
            acc[item.cliente] = (acc[item.cliente] || 0) + 1;
        }
        return acc;
    }, {}); // Inicia com objeto vazio, garantindo que clientesContagem seja sempre um objeto

    return Object.entries(clientesContagem).sort((a,b) => b[1] - a[1]);
    
}

export function preparePrioridadeData(currentData) {
    if (!currentData || currentData.length === 0) {
        console.warn("[preparePrioridadeData] currentData está vazio ou não definido.");
        return [];
    }
    const prioridadesContagem = currentData.reduce((acc, item) => {
        if (item && typeof item.prioridade !== 'undefined') { // VERIFICAÇÃO IMPORTANTE
            acc[item.prioridade] = (acc[item.prioridade] || 0) + 1;
        }
        return acc;
    }, {}); // Inicia com objeto vazio

    return Object.entries(prioridadesContagem);
}

export function prepareServicoPopularidadeData(currentData) {
    if (!currentData || currentData.length === 0) {
        console.warn("[prepareServicoPopularidadeData] currentData está vazio ou não definido.");
        return [];
    }
    const servicosContagem = currentData.reduce((acc, item) => {
        if (item && typeof item.servico !== 'undefined') { // VERIFICAÇÃO IMPORTANTE
            acc[item.servico] = (acc[item.servico] || 0) + 1;
        }
        return acc;
    }, {}); // Inicia com objeto vazio

    return Object.entries(servicosContagem).sort((a, b) => a[1] - b[1]);
}

let dataTableInstance = null;

export function createOrUpdateDataTable(currentData) {
    if (!currentData) {
        console.warn("createOrUpdateDataTable: currentData está indefinido.");
        currentData = []; // Evita erro, mas a tabela ficará vazia
    }
    const mappedData = currentData.map(item => ({
        codigo_atendimento: item.codigo_atendimento,
        cliente: item.cliente,
        servico: item.servico,
        atendente: item.atendente,
        nota: item.nota,
        interacoes: item.interacoes
    }));

    const tableElement = $('#tabelaAtendimentos');
    if (!tableElement.length) {
        console.error("Elemento da DataTable '#tabelaAtendimentos' não encontrado.");
        return;
    }
    
    try {
        if ($.fn.DataTable.isDataTable(tableElement)) {
            dataTableInstance = tableElement.DataTable();
            dataTableInstance.clear().rows.add(mappedData).draw();
            console.log("DataTable atualizada com", mappedData.length, "registros.");
        } else {
            dataTableInstance = tableElement.DataTable({
                data: mappedData,
                columns: [
                    { data: 'codigo_atendimento', title: 'Código' },
                    { data: 'cliente', title: 'Cliente' },
                    { data: 'servico', title: 'Serviço' },
                    { data: 'atendente', title: 'Atendente' },
                    { data: 'nota', title: 'Nota' },
                    { data: 'interacoes', title: 'Interações' }
                ],
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
                },
                destroy: true
            });
            console.log("DataTable criada com", mappedData.length, "registros.");
        }
    } catch (e) {
        console.error("Erro ao criar/atualizar DataTable:", e);
    }
}
