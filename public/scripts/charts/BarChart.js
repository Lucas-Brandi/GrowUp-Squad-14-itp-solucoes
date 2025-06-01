export function createBarChart(elementId, chartTitle, columns, chartData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`[createBarChart] Elemento HTML com ID '${elementId}' não encontrado.`);
        return null; // Retorna null se o elemento não for encontrado
    }
    const chart = echarts.init(chartElement);

    const options = {
        title: {
            text: chartTitle,
            left: "center",
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            trigger: "axis", 
            axisPointer: { type: "shadow" },
        },
        grid: { // Ajuste a grade para melhor visualização dos labels do eixo X
            left: '3%',
            right: '4%',
            bottom: '15%', // Aumentado para dar espaço para labels rotacionados
            containLabel: true
        },
        xAxis: {
            type: "category",
            data: chartData.map((item) => item[0]), 
            axisLabel: {
                rotate: 45,
                interval: 0, 
                textStyle: {
                    fontSize: 12
                }
            }
        },
        yAxis: {
            type: "value",
            name: columns && columns.length > 1 ? columns[1] : 'Valor' 
        },
        series: (columns && columns.length > 1 ? columns.slice(1) : ['']) 
            .map((columnName, index) => ({
                name: columnName || (columns && columns.length === 1 ? columns[0] : chartTitle),
                type: "bar",
                barWidth: '60%', 
                data: chartData.map((item) => item[index + 1]), 
                label: { show: true, position: "top" }, // Mostrar valor no topo da barra
        })),
    };

    chart.setOption(options);

    return chart; 
}
