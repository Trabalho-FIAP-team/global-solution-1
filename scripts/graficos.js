export class Graficos {

  static getGraficoPopulacaoInsegurancaAlimentarBrasilConfig() {
    const datasets = [
      {
        label: "Grave",
        data: [3.9, 7.5, 15.4],
        backgroundColor: "#FF8787"
      },
      {
        label: "Grave ou moderada",
        data: [43.1, 49.6, 61.3],
        backgroundColor: "#B3C890"
      }
    ];

    return {
      type: "bar",
      data: {
        labels: ["2017-2019", "2018-2020", "2019-2021"],
        datasets
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            font: {
              size: 14
            },
            text: "Insegurança alimentar no Brasil",
          },
          subtitle: {
            display: true,
            text: 'ONU - 2021'
          },
          tooltip: {
            enabled: true,
            callbacks: {
              title: () => '',
              label: (tooltipItem) => `${tooltipItem.formattedValue} milhões`,
            },
          },
          datalabels: {
            formatter: (value) => `${value}mi`,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            
          },
          x: {
            max: Math.max(...datasets.map(d => d.data).flatMap((arr) => [...arr])),
            ticks: {
              display: false
            }
          }
        }
      },
      
    }
  }


  static getGraficoPopulacaoInsegurancaAlimentarConfig() {
    return {
      type: "bar",
      data: { 
        labels: ["África", "América Latina e Caribe", "Ásia", "Oceania", "América do Norte e Europa"],
        datasets: [
          {
            label: "Grave",
            data: [57.9, 40.6, 29.3, 24.6, 13, 8],
            backgroundColor: "#FF8787"
          },
          {
            label: "Grave ou moderada",
            data: [23.4, 14.2, 9.8, 10.5, 4.5, 1.5],
            backgroundColor: "#B3C890"
          }
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            font: {
              size: 14
            },
            text: "Porcentagem da população em insegurança alimentar",
          },
          subtitle: {
            display: true,
            text: 'ONU - 2021'
          },
          tooltip: {
            callbacks: {
              title: () => '',
              label: (tooltipItem) => `${tooltipItem.formattedValue}%`,
            },
          },
          datalabels: {
            formatter: (value) => `${value}`,
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              callback: (value) => value + '%'
            }
          }
        }
      }
    };
  }

  static getGraficoCrescimentoLinearInsegurancaAlimentar() {
    return {
      type: "line",
      data: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: "Grave",
            data: [7.7, 7.5, 7.9, 8.2, 9, 9.3, 10.9, 11.7],
            backgroundColor: "#FF8787",
            borderColor: "#FF8787",
            borderWidth: 2,
            radius: 4,
          }, {
            label: "Moderada ou grave",
            data: [21.2, 21.5, 22.7, 23.9, 25, 25.4, 29.5, 29.3],
            backgroundColor: "#B3C890",
            borderColor: "#B3C890",
            borderWidth: 2,
            radius: 4,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        animation: animacaoCrescimentoLinear(8, 1500),
        interaction: {
          mode: 'point'
        },
        plugins: {
          title: {
            display: true,
            font: {
              size: 14
            },
            text: "Crescimento da população em insegurança alimentar (em %)",
          },
          subtitle: {
            display: true,
            text: 'ONU - 2021'
          },
          tooltip: {
            callbacks: {
              title: () => '',
              label: (tooltipItem) => `${tooltipItem.formattedValue}%`,
            },
          },
          datalabels: {
            anchor: 'end',
            display: 'auto',
            clamp: false,
            align: '45',
            formatter: (value) => `${value}%`,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grace: 5,
          },
          x: {
            grace: 1,
            ticks: {
              padding: 10,
              
            }
          }
        }
      }
    }
  }
}



/**
 * Animação de crescimento linear horizontal
 */
function animacaoCrescimentoLinear(dataLength, duration = 2000) {

  const delayEntrePixels = duration / dataLength;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(10) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  
  return {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayEntrePixels,
      from: NaN, 
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayEntrePixels;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayEntrePixels,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayEntrePixels;
      }
    }
  };
}
