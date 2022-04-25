<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
/*import HighchartsGroupedCategories  from "highcharts-grouped-categories";
HighchartsGroupedCategories(Chart);*/

export default {
  name: "AreaChart",
  props: ["chartData", "title", "yAxisLabel"],

  data() {
    return {};
  },
  components: {
    highcharts: Chart,
  },
  methods: {},
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "area",
        },
        accessibility: {
          description:
            "Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.",
        },
        title: {
          text: this.title,
        },
        subtitle: {
          //text: 'Subtitle'
        },
        xAxis: {
          allowDecimals: false,
          categories: this.years,
          /*labels: {
      formatter: function () {
        return this.value; // clean, unformatted number for year
      }
    },*/
          /*accessibility: {
      rangeDescription: 'Range: 1940 to 2017.'
    }*/
        },
        yAxis: {
          title: {
            text: this.yAxisLabel,
          },
          labels: {
            /* formatter: function () {
        return this.value / 1000 + 'k';
      }*/
          },
        },
        tooltip: { shared: true, valueSuffix: " Fälle" },
        plotOptions: {
          area: {
            //pointStart: 1940,
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        series: this.series,
        legend: {
          useHTML:true,
          labelFormatter: function () {
            return `
              ${this.name} 
              
              <a class="legend-link" href="/akten-edition/alle-akten?filter=keyword-${this.chart.title.textStr}.${this.name}">&#8594</a>`
            ;
          },
        },
      };
    },
    years() {
      let years = [];
      if (this.chartData.children) {
        this.chartData.children.forEach((item) => {
          if (item.cases) {
            item.cases.forEach((cs) => {
              if (cs.start_date) {
                const year = new Date(cs.start_date).getFullYear();
                if (years.indexOf(year) === -1) years.push(year);
              }
            });
          }
        });
      }
      years.sort((a, b) => a - b);
      return years;
    },
    series() {
      let series = [];
      if (this.chartData.children) {
        this.chartData.children.forEach((item, idx) => {
          let data = [];
          this.years.forEach((year) => {
            data.push(
              item.cases
                ? item.cases.filter(
                    (cs) => new Date(cs.start_date).getFullYear() === year
                  ).length
                : 0
            );
          });
          // item.cases.forEach(cs=>sieres)
          if (idx === 0) {
            series.push({ name: item.prefLabel, data: data, color: "#C6C2BC" });
          } else
            series.push({ name: item.prefLabel, data: data, visible: false });
        });

        let totals = [];

        
          this.years.forEach((year) => {
            totals.push(
              
              this.$store.getters.cases.filter(
                    (cs) => new Date(cs.start_date).getFullYear() === year
                  ).length
            );
          })
        let totalSeries = {
          name: "Gesamt",
          type: "line",
          stacking: false,
          marker: { enabled: false },
          showInLegend: false,
          color: "#FF0000",
          data: totals,
        };
        series.push(totalSeries);
      }
      return series;
      /*[{
    name: 'USA',
    data: [
      null, null, null, null, null, 6, 11, 32, 110, 235,
      369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
      20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
      26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
      24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
      21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
      10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
      5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
    ]
  }, {
    name: 'USSR/Russia',
    data: [null, null, null, null, null, null, null, null, null, null,
      5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
      1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
      11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
      30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
      37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
      21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
      12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
    ]
  }]*/
    },
  },
};
</script>
<style>
.legend-link {
  font-size:1.2em;
}

a {
  color: #000;
}
</style>
