

export class Graficos {

  static getGraficoPopulacaoInsegurancaAlimentarBrasilConfig() {
    return {
      type: "bar",
      data: {
        labels: ["2017-2019", "2018-2020", "2019-2021"],
        datasets: [
          {
            label: "Grave",
            data: [3.9, 7.5, 15.4],
            backgroundColor: "red"
          },
          {
            label: "Grave ou moderada",
            data: [43.1, 49.6, 61.3],
            backgroundColor: "orange"
          }
        ]
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
            backgroundColor: "red"
          },
          {
            label: "Grave ou moderada",
            data: [23.4, 14.2, 9.8, 10.5, 4.5, 1.5],
            backgroundColor: "orange"
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
}
