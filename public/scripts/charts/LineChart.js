export function createLineChart(elementId, chartTitle, columns, chartData) {
    const chartElement = document.getElementById(elementId);
    if (!chartElement) {
        console.error(`[createLineChart] Elemento HTML com ID '${elementId}' não encontrado.`);
        return null;
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
            trigger: 'axis' 
        },
        legend: { // Adicionar legenda se houver múltiplas séries
            data: columns && columns.length > 1 ? columns.slice(1) : [],
            bottom: 10, // Posição da legenda
            type: 'scroll' // Permite scroll se muitos itens na legenda
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%', // Espaço para labels do eixo X e legenda
            containLabel: true
        },
        xAxis: {
            type: "category",
            boundaryGap: false, 
            data: chartData.map((item) => item[0]), 
            axisLabel: {
                rotate: 45,
                interval: 0,
                textStyle: {
                    fontSize: 12, 
                }
            }
        },
        yAxis: {
            type: "value",
            name: "Valores" 
        },
        series: (columns && columns.length > 1 ? columns.slice(1) : [''])
            .map((columnName, index) => ({
                name: columnName || (columns && columns.length === 1 ? columns[0] : chartTitle), // Nome da série
                type: "line",
                smooth: true, 
                data: chartData.map((item) => item[index + 1]), 
                label: { show: false, position: "top" }, 
                
        })),
    };

    chart.setOption(options);

    return chart; 
}
