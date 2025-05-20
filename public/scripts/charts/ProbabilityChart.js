export async function createScatterChart(elementId, title, datas, groupLabel = 'Grupo') {
  const chart = echarts.init(document.getElementById(elementId));

  // parâmetro 'datas' recebe valores no formato abaixo:
  /*    
  [
    [10.0, 8.04],
    [8.0, 6.95],
    [13.0, 7.58],
    [9.0, 8.81],
    [11.0, 8.33],
    [14.0, 9.96],
    [6.0, 7.24],
    [4.0, 4.26],
    [12.0, 10.84],
    [7.0, 4.82],
    [5.0, 5.68]
  ]
  */

  const markLineOpt = {
      animation: false,
      label: {
          formatter: 'y = 0.5 * x + 3',
          align: 'right'
      },
      lineStyle: {
          type: 'solid'
      },
      tooltip: {
          formatter: 'y = 0.5 * x + 3'
      },
      data: [
          [
              { coord: [0, 3], symbol: 'none' },
              { coord: [20, 13], symbol: 'none' }
          ]
      ]
  };

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
          formatter: `${groupLabel}: ({c})`,
          textStyle: {
              fontSize: 14,
          },
      },
      xAxis: {
          type: 'value',
          min: 0,
          max: 20
      },
      yAxis: {
          type: 'value',
          min: 0,
          max: 15
      },
      series: [
          {
              name: groupLabel,
              type: 'scatter',
              data: datas,
              markLine: markLineOpt,
              symbolSize: 10,
              emphasis: {
                  focus: 'series',
                  label: {
                      show: false
                  }
              }
          }
      ]
  };

  chart.setOption(options);

  return chart;
}
