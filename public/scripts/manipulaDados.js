// >>>MANIPULANDO OS DADOS DO ARQUIVO JSON<<<
async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('/api/data'); //recebendo os dados do servidor (por meio de promises)
    const data = await response.json(); 
    return data;
}

const dados = await fetchData();

export function prepareNotaData() {
    const notas = dados.reduce((acc, item) => {
        acc[item.nota] = (acc[item.nota] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(notas);
        return datas;
}

export function frequenciaClientes() {
    const clientes = dados.reduce((acc, item) => {
        acc[item.cliente] = (acc[item.cliente] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(clientes);

        return datas;
}

export function preparePrioridadeData() {
    const prioridades = dados.reduce((acc, item) => {
        acc[item.prioridade] = (acc[item.prioridade] || 0) + 1;
        return acc;
    }, {});

    const datas = Object.entries(prioridades);
    return datas;
}


export function createDataTable(){
    try {
        const rawDatas = dados;
        
        // Filtra e mapeia os dados conforme desejado
        const filteredDatas = rawDatas.map(item => ({
                codigo_atendimento: item.codigo_atendimento,
                cliente: item.cliente,
                servico: item.servico,
                atendente: item.atendente,
                nota: item.nota,
                interacoes: item.interacoes
            }));

        $('#tabelaAtendimentos').DataTable({
        data: filteredDatas,
        columns: [
            { data: 'codigo_atendimento' },
            { data: 'cliente' },
            { data: 'servico' },
            { data: 'atendente' },
            { data: 'nota' },
            { data: 'interacoes' }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        }
        });

    } catch (error) {
        alert('Erro ao carregar dados: ' + error.message);
    } 
}

export function atualizarTabelaPorNota(nota) {
    const rawDatas = dados;
    const filtrado = rawDatas
        .filter((item) => item.nota === nota)
        .map((item) => ({
            codigo_atendimento: item.codigo_atendimento,
            cliente: item.cliente,
            servico: item.servico,
            atendente: item.atendente,
            nota: item.nota,
            interacoes: item.interacoes
        }));

    if ($.fn.DataTable.isDataTable('#tabelaAtendimentos')) {
        $('#tabelaAtendimentos').DataTable().clear().rows.add(filtrado).draw();
    } else {
        $('#tabelaAtendimentos').DataTable({
            data: filtrado,
            columns: [
                { data: "codigo_atendimento", title: "Código" },
                { data: "cliente", title: "Cliente" },
                { data: "servico", title: "Serviço" },
                { data: "atendente", title: "Atendente" },
                { data: 'nota', title: "Nota" },
                { data: "interacoes", title: "Interações" },
            ],
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json",
            },
        });
    }
}