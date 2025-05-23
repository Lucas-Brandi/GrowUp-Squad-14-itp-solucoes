export async function createDonutChart(elementId, title, columns, datas) {
    const chart = echarts.init(document.getElementById(elementId));

    const options = {
        title: {
            text: title,
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            trigger: 'item',
            textStyle: {
                fontSize: 14,
            },
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                fontSize: 14,
            },
        },
        series: [
            {
                name: columns[1], 
                type: 'pie',
                radius: ['40%', '70%'], 
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 14,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: datas.map((item) => ({
                    name: item[0],
                    value: item[1]
                })),
            }
        ]
    };

    chart.setOption(options);

    return chart;
}
