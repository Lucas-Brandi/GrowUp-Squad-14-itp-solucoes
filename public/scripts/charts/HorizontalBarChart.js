export function createHorizontalBarChart(elementId, chartTitle, columns, chartData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`[createHorizontalBarChart] Elemento HTML com ID '${elementId}' não encontrado.`);
        return null;
    }
    const chart = echarts.init(chartElement);

    const options = {
        title: {
            text: chartTitle,
            left: "center",
            textStyle: { fontSize: 18, fontWeight: 'bold' },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true 
        },
        xAxis: { 
            type: "value",
            name: columns && columns.length > 1 ? columns[1] : 'Valor', 
            boundaryGap: [0, 0.01]
        },
        yAxis: { // Eixo Y agora é o de categoria
            type: "category",
            data: chartData.map((item) => item[0]), // Nomes dos serviços/categorias
            axisLabel: {
                interval: 0, // Mostrar todos os labels
                fontSize: 12
            }
        },
        series: [ 
            {
                name: columns && columns.length > 1 ? columns[1] : (columns && columns.length === 1 ? columns[0] : chartTitle), 
                type: "bar",
                barWidth: '60%',
                data: chartData.map((item) => item[1]), 
                label: { show: true, position: "right" },
            }
        ]
    };

    chart.setOption(options);
    return chart; 
}
