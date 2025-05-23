export async function createLineChart(elementId, title, columns, datas) {
    const chart = echarts.init(document.getElementById(elementId));


        const options = {
            title: {
                text: title,
                left: "center",
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                },
            },
            tooltip: {},
            xAxis: {
                type: "category",
                data: datas.map((item) => item[0]),
                axisLabel: {
                    rotate: 45,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    }
                }
            },
            yAxis: { type: "value" },
            series: columns.slice(1).map((column, index) => ({
                name: column,
                type: "line",
                data: datas.map((item) => item[index + 1]),
                label: { show: true, position: "top" },
            })),
        };

    chart.setOption(options);

    return chart;
};