export function createPieChart(elementId, chartTitle, columns, chartData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`[createPieChart] Elemento HTML com ID '${elementId}' não encontrado.`);
        return null;
    }
    const chart = echarts.init(chartElement);
    const pieData = chartData[0] && typeof chartData[0].name !== 'undefined' && typeof chartData[0].value !== 'undefined'
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
            formatter: '{a} <br/>{b}: {c} ({d}%)' // {a} = series name, {b} = data name, {c} = value, {d} = percentage
        },
        legend: {
            orient: "vertical",
            right: 10,
            top: "center",
            type: 'scroll' 
        },
        series: [{
            name: columns && columns.length > 1 ? columns[1] : chartTitle, 
            type: "pie",
            radius: "60%", 
            center: ['50%', '55%'], 
            data: pieData, 
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            label: {
                show: true,
                formatter: '{b}: {d}%', // Mostra nome da categoria e porcentagem
                fontSize: 12
            },
        }],
    };
    chart.setOption(options);
    return chart;
}
