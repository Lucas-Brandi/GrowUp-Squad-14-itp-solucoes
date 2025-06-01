// >>>IMPORTANDO GRÁFICOS<<<
import { createBarChart } from './charts/BarChart.js';
import { createLineChart } from './charts/LineChart.js';
import { createPieChart } from './charts/PieChart.js';
import { createDonutChart } from './charts/DonutChart.js';
import { createHorizontalBarChart } from './charts/HorizontalBarChart.js';

// >>>IMPORTANDO MANIPULAÇÃO DE DADOS<<<
import {
    getFilteredData,
    applyFilter,
    clearAllFilters,
    prepareNotaData,
    frequenciaClientes,
    preparePrioridadeData,
    prepareServicoPopularidadeData,
    createOrUpdateDataTable
} from './manipulaDados.js';

// Armazena instâncias dos gráficos ECharts para atualizações
const chartInstances = {};

// >>> FUNÇÃO GLOBAL PARA ATUALIZAR TODOS OS VISUAIS <<<
window.dashboard = {
    refreshAllVisuals: function() {
        const currentFilteredData = getFilteredData();
        console.log("[refreshAllVisuals] Iniciando com", currentFilteredData.length, "registros filtrados.");

        // --- Atualizar Gráfico de Pizza (Notas) ---
        const pieChartInstance = chartInstances.noteServiceChart;
        if (pieChartInstance && !pieChartInstance.isDisposed()) {
            const newPieData = prepareNotaData(currentFilteredData); // Agora retorna dados com itemStyle.color
            console.log("[refreshAllVisuals] Dados para noteServiceChart:", JSON.stringify(newPieData));
            pieChartInstance.setOption({
                series: [{
                    data: newPieData // Os dados já contêm name, value e itemStyle.color
                }]
            });
        }

// --- Atualizar Gráfico de Donut (Notas) ---
            const donutChartInstance = chartInstances.donutChart;
            if (donutChartInstance && !donutChartInstance.isDisposed()) {
                const newDonutData = prepareNotaData(currentFilteredData); 
                console.log("[refreshAllVisuals] Dados para donutChart:", JSON.stringify(newDonutData));
                donutChartInstance.setOption({
                    series: [{
                        data: newDonutData // Os dados já contêm name, value e itemStyle.color
                   }]
                });
            }
            
        // --- Atualizar Gráfico de Barras (Frequência de Clientes) ---
        const barChartInstance = chartInstances.frequenciaClientesChart;
        if (barChartInstance && !barChartInstance.isDisposed()) {
            const newBarData = frequenciaClientes(currentFilteredData);

            console.log("[refreshAllVisuals] Dados brutos para frequenciaClientesChart:", JSON.stringify(newBarData));

            const xAxisData = newBarData.map(item => item[0]);
            const seriesData = newBarData.map(item => item[1]);
            barChartInstance.setOption({
                xAxis: [{ data: xAxisData }],
                series: [{ data: seriesData }]
            });
        }

        // --- Atualizar Gráfico de Linha (Prioridade de Atendimento) ---
        const lineChartInstance = chartInstances.prioridadeLineChart;
        if (lineChartInstance && !lineChartInstance.isDisposed()) {
            const newLineData = preparePrioridadeData(currentFilteredData);
            console.log("[refreshAllVisuals] Dados para prioridadeLineChart:", JSON.stringify(newLineData));
            lineChartInstance.setOption({
                xAxis: [{ data: newLineData.map(item => item[0]) }],
                series: [{
                    data: newLineData.map(item => item[1])
                }]
            });
        }

        // --- Atualizar Gráfico de Barras Horizontais (Serviços Mais Utilizados) ---
        const hBarChartInstance = chartInstances.servicosChart;
        if (hBarChartInstance && !hBarChartInstance.isDisposed()) {
            const newHBarData = prepareServicoPopularidadeData(currentFilteredData);
            console.log("[refreshAllVisuals] Dados para servicosChart (HBar):", JSON.stringify(newHBarData));
            hBarChartInstance.setOption({
                yAxis: [{ data: newHBarData.map(item => item[0]) }], // Eixo Y para barras horizontais
                series: [{
                    data: newHBarData.map(item => item[1])
                }]
            });
        }
        
        // --- Atualizar DataTable ---
        createOrUpdateDataTable(currentFilteredData);
        console.log("[refreshAllVisuals] Concluído.");
    }
};


// >>>CRIANDO OS GRÁFICOS<<<
async function initDashboard() {
    console.log("Iniciando Dashboard...");
    // Espera que 'dadosMestres' em manipulaDados.js esteja carregado.
    const initialData = getFilteredData();
    if (!initialData) { // Checa se initialData é null ou undefined (se fetchData falhou criticamente)
        console.error("initDashboard: Falha ao obter dados iniciais. Dashboard não pode ser carregado.");
        // Pode mostrar uma mensagem ao usuário na interface aqui.
        return;
    }
    if (initialData.length === 0 && window.dadosMestres && window.dadosMestres.length > 0) {
         console.warn("initDashboard: Dados iniciais estão vazios, mas dadosMestres existem. Verifique os filtros padrão ou a lógica de getFilteredData.");
    } else if (initialData.length === 0) {
        console.warn("initDashboard: Dados iniciais vazios. O dashboard pode aparecer vazio até que os dados sejam carregados ou filtros sejam aplicados.");
    }
    console.log("initDashboard: Dados iniciais para gráficos:", initialData.length, "registros.");

    // --- Gráfico de Pizza (Notas) ---
    const datasNoteService = prepareNotaData(initialData);
    const columnsNoteService = ["Notas", "Quantidade"];
    const pieChart = createPieChart("noteServiceChart", "Notas de Serviço", columnsNoteService, datasNoteService);
    if (pieChart) {
        chartInstances.noteServiceChart = pieChart;
        pieChart.on('click', function (params) {
            const filterValue = params.data && typeof params.data.name !== 'undefined' ? params.data.name : params.name;
            if (typeof filterValue !== 'undefined') {
                applyFilter('nota', filterValue);
            }
        });
    }

    // --- DataTable ---
    createOrUpdateDataTable(initialData);

    // --- Gráfico de Donut (Notas) ---
    const donutData = prepareNotaData(initialData); 
    const donutChart = createDonutChart("donutChart", "Distribuição de Notas (Donut)", columnsNoteService, donutData);
    if (donutChart) {
        chartInstances.donutChart = donutChart;
        donutChart.on('click', function (params) {
            const filterValue = params.data && typeof params.data.name !== 'undefined' ? params.data.name : params.name;
            if (typeof filterValue !== 'undefined') {
                applyFilter('nota', filterValue);
            }
        });
    }
    
    // --- Gráfico de Barras (Frequência de Clientes) ---
    const datasBarChart = frequenciaClientes(initialData);
    const columnsBarChart = ["Clientes", "Frequência"];
    const barChart = createBarChart("frequenciaClientes", "Frequência por Cliente", columnsBarChart, datasBarChart);
    if (barChart) {
        chartInstances.frequenciaClientesChart = barChart;
        barChart.on('click', function (params) {
            if (typeof params.name !== 'undefined') {
                applyFilter('cliente', params.name);
            }
        });
    }

    // --- Gráfico de Linha (Prioridade de Atendimento) ---
    const datasLineChart = preparePrioridadeData(initialData);
    const columnsLineChart = ["Prioridade", "Contagem"];
    const lineChart = createLineChart("preparePrioridadeData", "Contagem por Prioridade", columnsLineChart, datasLineChart);
    if (lineChart) {
        chartInstances.prioridadeLineChart = lineChart;
        lineChart.on('click', function(params) {
            if (typeof params.name !== 'undefined') {
                applyFilter('prioridade', params.name);
            }
        });
    }

    // --- Gráfico de Barras Horizontais (Serviços Mais Utilizados) ---
    const datasServicosPopularidade = prepareServicoPopularidadeData(initialData);
    const columnsServicosPopularidade = ["Serviço", "Quantidade"];
    if (datasServicosPopularidade && datasServicosPopularidade.length > 0) {
        const hBarChart = createHorizontalBarChart("servicosChart", "Serviços Mais Utilizados", columnsServicosPopularidade, datasServicosPopularidade);
        if (hBarChart) {
            chartInstances.servicosChart = hBarChart;
            hBarChart.on('click', function(params) {
                if (typeof params.name !== 'undefined') {
                    applyFilter('servico', params.name);
                }
            });
        }
    } else {
        console.log("Sem dados para o gráfico de popularidade de serviços.");
    }
    
    console.log("Dashboard inicializado com todos os gráficos configurados.");
}

// Chama a inicialização do dashboard
initDashboard().catch(err => {
    console.error("Falha crítica ao inicializar o dashboard:", err);
    alert("Ocorreu um erro grave ao carregar o dashboard. Verifique o console para mais detalhes.");
});
