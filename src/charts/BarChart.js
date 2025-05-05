export class BarChart {
    constructor(elementId, title, columns, datas) {
    this.elementId = elementId;
    this.title = title;
    this.columns = columns;
    this.datas = datas;
    this.chart = echarts.init(document.getElementById(this.elementId));
    }

  //Método para criar o gráfico
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
            axisPointer: { type: "shadow" },
        },
        xAxis: {
            type: "category",
            data: this.datas.map((item) => item[0]),
            axisLabel: {
                textStyle: {
                fontSize: 15 // 👈 tamanho da fonte dos rótulos do eixo Y
                }
            }
        },
        yAxis: { type: "value" },
        series: this.columns.slice(1).map((column, index) => ({
            name: column,
            type: "bar",
            data: this.datas.map((item) => item[index + 1]),
            label: { show: true, position: "top" },
        })),
        };

        this.chart.setOption(options);
    }

    //Método para atualizar os dados dinamicamente
    updateChart(newDatas) {
        this.datas = newDatas;
        this.createChart();
    }
}
