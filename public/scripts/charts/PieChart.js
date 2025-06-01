import { atualizarTabelaPorNota } from '../manipulaDados.js';

export async function createPieChart(elementId, title, columns, datas) {
    const chart = echarts.init(document.getElementById(elementId));

    const options = {
        title: {
            text: title,
            left: "center",
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
            },
        },       

        tooltip: {
            trigger: "item",
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
            },
        },

      legend: {
        orient: "vertical",
        left: "right",
        top: "bottom",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      
      series: [
        {
          name: columns[1],
          type: "pie",
          radius: "50%",
          data: datas.map((item) => ({ name: item[0], value: item[1] })),
          emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
    };

    chart.setOption(options);

    // //  Evento de clique
    // chart.on('click', function (params) {
    //     const container = document.getElementById('interaction-output');
    //     if (!document.getElementById(`info-${params.name}`)) {
    //       const p = document.createElement('p');
    //       p.id = `info-${params.name}`;
    //       p.textContent = `Você clicou em: ${params.name} (${params.value})`;
    //       container.appendChild(p);
    //     }
    // });

    chart.on("click", function (params) {
      const notaSelecionada = params.name;
      atualizarTabelaPorNota(notaSelecionada);
    });

    return chart;
};