// import * as echarts from 'echarts';

export class PieChart {
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

    //Método para atualizar os dados dinamicamente
    updateChart(newDatas) {
        this.datas = newDatas;
        this.createChart();
    }
}

