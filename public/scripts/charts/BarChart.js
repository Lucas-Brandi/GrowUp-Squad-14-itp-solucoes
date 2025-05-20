export async function createBarChart(elementId, title, columns, datas) {
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
        tooltip: {
            trigger: "item",
            axisPointer: { type: "shadow" },
        },
        grid: {
            bottom: 100,
            left: 100
        },
        xAxis: {
            type: "category",
            data: datas.map((item) => item[0]),
            axisLabel: {
                rotate: 45,
                interval: 0,
                textStyle: {
                    fontSize: 12
                }
            }
        },
        yAxis: { type: "value" },
        series: columns.slice(1).map((column, index) => ({
            name: column,
            type: "bar",
            data: datas.map((item) => item[index + 1]),
            label: { show: true, position: "top" },
        })),
    };

    chart.setOption(options);

    // Envia os dados para o backend (exemplo simples com fetch)
    // try {
    //     await fetch('https://seu-backend.com/api/graficos', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ title, columns, datas })
    //     });
    // } catch (error) {
    //     console.error("Erro ao salvar gráfico no banco:", error);
    // }

    return chart;
}
