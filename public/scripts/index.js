import { PieChart } from '../../src/charts/PieChart.js';

document.addEventListener("DOMContentLoaded", () => {
    const title = "Vendas por Categoria";
    const columns = ["Categoria", "Valor"];
    const datas = [
        ["Alimentos", 200],
        ["Bebidas", 150],
        ["Sobremesas", 100],
    ];
    
    // Criando e renderizando o gráfico
    const pie = new PieChart("nota", title, columns, datas);
    pie.createChart();

});

async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('../../src/data/data.json'); //recebendo os dados do servidor (por meio de promises)
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


//o uso do await fora de uma função async de nível superior, o que não funciona diretamente em arquivos .js incluídos no HTML.
async function initDashboard() {
    const dados = await fetchData();
    const datasPieChart = prepareNotaData(dados); // Prepara os dados no formato certo
    console.log(datasPieChart);

    const columnsPieChart = ["Notas", "Quality"];

    const pieChartExample = new PieChart(
        "notaChart",
        "Notas atendimento",
        columnsPieChart,
        datasPieChart
    );

    pieChartExample.createChart();
}

// Chamada para iniciar tudo
initDashboard();

// Simulando os dados:

