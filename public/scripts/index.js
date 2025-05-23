// >>>IMPORTANDO GRÁFICOS<<<
import { createBarChart } from './charts/BarChart.js';
import { createLineChart } from './charts/LineChart.js';
import { createPieChart } from './charts/PieChart.js'
import { createDonutChart } from './charts/DonutChart.js';
import { createScatterChart } from './charts/ProbabilityChart.js';



// >>>MANIPULANDO OS DADOS DO ARQUIVO JSON<<<
async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('/api/data'); //recebendo os dados do servidor (por meio de promises)
    const data = await response.json(); 
    return data;
}

function prepareNotaData(atendimentos) {
    const notas = atendimentos.reduce((acc, item) => {
        acc[item.nota] = (acc[item.nota] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(notas);
        return datas;
}

function frequenciaClientes(atendimentos) {
    const clientes = atendimentos.reduce((acc, item) => {
        acc[item.cliente] = (acc[item.cliente] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(clientes);

        return datas;
}

function preparePrioridadeData(atendimentos) {
    const prioridades = atendimentos.reduce((acc, item) => {
        acc[item.prioridade] = (acc[item.prioridade] || 0) + 1;
        return acc;
    }, {});

    const datas = Object.entries(prioridades);
    return datas;
}


// >>>CRIANDO OS GRÁFICOS<<<
async function initDashboard() {
    const dados = await fetchData();
    const datasNoteService = prepareNotaData(dados);
    const columnsNoteService = ["Notes", "Quality"];

    createPieChart("noteServiceChart", "Service notes", columnsNoteService, datasNoteService);

    createDonutChart("donutChart", "Exemplo Donut Chart", columnsNoteService, datasNoteService);

    const datasBarChart = frequenciaClientes(dados);
    const columnsBarChart = ["Clients", "Frequency"];

    createBarChart("frequenciaClientes", "Frequência de Cada Cliente", columnsBarChart, datasBarChart);

    const datasLineChart = preparePrioridadeData(dados);
    const columnsLineChart = ["Clients", "Priority",];

    createLineChart("preparePrioridadeData", "Prioridade de Atendimento", columnsLineChart, datasLineChart);

    
}

initDashboard();

