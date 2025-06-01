// >>>IMPORTANDO GRÁFICOS<<<
import { createBarChart } from './charts/BarChart.js';
import { createLineChart } from './charts/LineChart.js';
import { createPieChart } from './charts/PieChart.js'
import { createDonutChart } from './charts/DonutChart.js';
import { createHorizontalBarChart } from './charts/HorizontalBarChart.js';
import { frequenciaClientes, prepareNotaData, preparePrioridadeData, createDataTable, prepareServicoPopularidadeDa } from './manipulaDados.js';


// >>>CRIANDO OS GRÁFICOS<<<
async function initDashboard() {
    const datasNoteService = prepareNotaData();
    const columnsNoteService = ["Notes", "Quality"];

    createPieChart("noteServiceChart", "Service notes", columnsNoteService, datasNoteService);

    createDataTable();

    createDonutChart("donutChart", "Exemplo Donut Chart", columnsNoteService, datasNoteService);

    const datasBarChart = frequenciaClientes();
    const columnsBarChart = ["Clients", "Frequency"];

    createBarChart("frequenciaClientes", "Frequência de Cada Cliente", columnsBarChart, datasBarChart);

    const datasLineChart = preparePrioridadeData();
    const columnsLineChart = ["Clients", "Priority",];

    createLineChart("preparePrioridadeData", "Prioridade de Atendimento", columnsLineChart, datasLineChart);

    const datasServicosPopularidade = prepareServicoPopularidadeData(); 
    const columnsServicosPopularidade = ["Serviço", "Quantidade"]; 
    if (datasServicosPopularidade && datasServicosPopularidade.length > 0) {
        createHorizontalBarChart(
            "servicosChart", 
            "Serviços Mais Utilizados", 
            columnsServicosPopularidade,
            datasServicosPopularidade
        );
    }  

}

initDashboard();

