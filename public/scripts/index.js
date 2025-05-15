import { PieChart } from './charts/PieChart.js';
import { BarChart } from './charts/BarChart.js';
import { LineChart } from './charts/LineChart.js';

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

//o uso do await fora de uma função async de nível superior, o que não funciona diretamente em arquivos .js incluídos no HTML.
async function initDashboard() {
    const dados = await fetchData();
    const datasPieChart = prepareNotaData(dados); // Prepara os dados no formato certo

    const columnsPieChart = ["Notas", "Quality"];

    const datasBarChart = frequenciaClientes(dados);

    const columnsBarChart = ["Clients", "Frequency"];

    const datasLineChart = preparePrioridadeData(dados);

    const columnsLineChart = ["Clients", "Priority",];

    const pieChartExample = new PieChart(
        "notaChart",
        "Notas atendimento",
        columnsPieChart, 
        datasPieChart
    );

    const barChartExample = new BarChart(
        "frequenciaClientes",
        "Frequência de Cada Cliente",
        columnsBarChart,
        datasBarChart
    );
    const lineChart = new LineChart(
        "preparePrioridadeData",
        "Prioridade de Atendimento",
        columnsLineChart,
        datasLineChart
    );

    pieChartExample.createChart();

    barChartExample.createChart();

    lineChart.createChart();
}

// Chamada para iniciar tudo
initDashboard();

