class PieChart {
    constructor(elementId, title, columns, datas) {
        this.elementId = elementId;
        this.title = title;
        this.columns = columns;
        this.datas = datas;
        this.chart = echarts.init(document.getElementById(this.elementId));
    }

    createChart() {
        const options = {
            title: {
                text: this.title,
                left: "center",
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                trigger: "item",
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
            legend: {
                orient: "vertical",
                left: "right",
                top: "bottom",
                textStyle: {
                    fontSize: 18, 
                    fontWeight: 'bold',
                },
            },
            series: [
                {
                    name: this.columns[1],
                    type: "pie",
                    radius: "50%",
                    data: this.datas.map((item) => ({ name: item[0], value: item[1] })),
                },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
        };

        this.chart.setOption(options);
    }
}

async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('data.json'); //recebendo os dados do servidor (por meio de promises)
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