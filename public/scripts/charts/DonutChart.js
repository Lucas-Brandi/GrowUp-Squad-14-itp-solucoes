export function createDonutChart(elementId, chartTitle, columns, chartData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`[createDonutChart] Elemento HTML com ID '${elementId}' não encontrado.`);
        return null;
    }
    const chart = echarts.init(chartElement);

    const donutData = chartData[0] && typeof chartData[0].name !== 'undefined' && typeof chartData[0].value !== 'undefined'
        ? chartData 
        : chartData.map((item) => ({ name: item[0], value: item[1] })); 
    const options = {
        title: {
            text: chartTitle,
            left: "center",
            textStyle: { fontSize: 18, fontWeight: "bold" }
        },
        tooltip: {
            trigger: "item",
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            type: 'scroll' 
        },
        series: [
            {
                name: columns && columns.length > 1 ? columns[1] : chartTitle,
                type: 'pie',
                radius: ['40%', '65%'], 
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter: '{b}\n{d}%', 
                },
                emphasis: {
                    label: { 
                        show: true,
                        fontSize: '16', 
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    }
                },
                labelLine: {
                    show: true
                },
                data: donutData 
                
            }
        ]
    };

    chart.setOption(options);
    return chart;
}
