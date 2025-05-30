export async function createHorizontalBarChart(elementId, chartTitle, columns, chartData) {
    const chart = echarts.init(document.getElementById(elementId));

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
            containLabel: true // Importante para nomes de categoria longos no eixo Y
        },
        xAxis: { 
            type: "value",
            boundaryGap: [0, 0.01]
        },
        yAxis: { 
            type: "category",
            data: chartData.map((item) => item[0]), 
            axisLabel: {
                interval: 0, // Mostrar todos os labels
                
            }
        },
        series: [
            {
                name: columns[1] || 'Quantidade', // Nome da série, ex: "Quantidade"
                type: "bar",
                data: chartData.map((item) => item[1]), // Valores dos serviços
                label: { show: true, position: "right" }, // Mostrar valor à direita da barra
                
            }
        ]
    };

    chart.setOption(options);
    return chart;
}
