<template>
  <b-container>
    <div v-if="this.$store.getters.getEarliestAndLatestCaseDate.length > 0">
      <highcharts
        class="custom-gantt"
        :constructor-type="'ganttChart'"
        :options="chartOptions"
        :callback="chartCallback"
      ></highcharts>
    </div>
  </b-container>
</template>

<script>
import gs from "./ganttseries.json";
import { dateFormat } from "highcharts";
export default {
  name: "GanttTimeLine",
  data() {
    return {};
  },
  methods: {
    chartCallback(chart) {
      console.log(chart);
      let chartWidth = (30 * chart.series[0].data.length) / 8;
      let chartHeight =
        15 *
        (this.endDate.getMonth() -
          this.startDate.getMonth() +
          12 * (this.endDate.getFullYear() - this.startDate.getFullYear()));

      chart.update({
        chart: {
          width: chartWidth,
          height: chartHeight,
        },
      });
    },
  },
  computed: {
    chartOptions() {
      /*gs[0].point = {"events": {
      "click":function (e) {
        console.log(e.point.name);
      }}};*/
      return {
        chart: {
          inverted: true,
          width: 1,
        },
        title: {
          text: "Zeitstrahl",
        },
        tooltip: {
          dateTimeLabelFormats: {
            day: "%A, %e. %B %Y",
          },
          useHTML: true,
          headerFormat: "<div>",
          pointFormatter: function () {
            let end = this.startendidentical === true ? this.start : this.end;
            return `<span style="font-weight:bold">${this.name}</span><br/>
        <span>${dateFormat("%A, %e. %B %Y", this.start)}</span><br/>
        <span>${dateFormat("%A, %e. %B %Y", end)}</span><br/>
        <span>${this.docs_count} Dokumente</span><br/>`;
          },
          footerFormat: "</div>",
        },
        yAxis: {
          labels: {
            enabled: false,
          },
          gridLineWidth: 0,
          categories: [],
        },
        xAxis: [
          {
            tickColor: "#fff",
            gridLineWidth: 2,
            gridLineColor: "#fff",
            opposite: false,
            labels: {
              format: "{value:%m/%Y}",
              style: {
                fontSize: "11px",
              },
            },
            tickInterval: 1000 * 60 * 60 * 24 * 30,
            min: Date.UTC(
              this.startDate.getFullYear(),
              this.startDate.getMonth() - 1,
              this.startDate.getDay()
            ),
            max: Date.UTC(
              this.endDate.getFullYear(),
              this.endDate.getMonth() + 1,
              this.endDate.getDay()
            ),
          },
        ],
        series: gs,

        /*[{
              name: 'Project 1',
              data: [{
                  name: 'Start prototype',
                  start: Date.UTC(2012, 11, 18),
                  end: Date.UTC(2014, 3, 25),
                  completed: 0.25
              }, {
                  name: 'Test prototype',
                  start: Date.UTC(2012, 10, 27),
                  end: Date.UTC(2014, 10, 29)
              }, {
                  name: 'Develop',
                  start: Date.UTC(2013, 10, 20),
                  end: Date.UTC(2014, 10, 25),
                  completed: {
                      amount: 0.12,
                      fill: '#fa0'
                  }
              }, {
                  name: 'Run acceptance tests',
                  start: Date.UTC(2012, 10, 23),
                  end: Date.UTC(2014, 10, 26)
              }]
          }]*/
      };
    },
    series() {
      let series = [
        { borderColor: "none", borderRadius: 0, name: "", data: [] },
      ];
      let cases = this.$store.getters.cases;
      let sortedCasesByTitle = cases.sort((a, b) =>
        parseInt(
          b.id.substring(3, b.id.length - 4) -
            parseInt(a.id.substring(3, a.id.length - 4))
        )
      );
      console.log(sortedCasesByTitle);
      sortedCasesByTitle.forEach((cs, idx) => {
        if (idx < 216) {
          const startdate = Date.UTC(
            new Date(cs.start_date).getFullYear(),
            new Date(cs.start_date).getMonth(),
            new Date(cs.start_date).getDate()
          );
          const enddate =
            cs.start_date == cs.end_date
              ? Date.UTC(
                  new Date(cs.end_date).getFullYear(),
                  new Date(cs.end_date).getMonth(),
                  new Date(cs.end_date).getDate(),
                  23
                )
              : Date.UTC(
                  new Date(cs.end_date).getFullYear(),
                  new Date(cs.end_date).getMonth(),
                  new Date(cs.end_date).getDate()
                );

          series[0].data.push({
            color: "#C85545",
            name: cs.title,
            start: startdate,
            end: enddate,
            docs_count: cs.docs_count,
            y: 0,
          });
          console.log(series);
        }
      });

      return series;
    },
    startDate() {
      return new Date(
        gs[0].data.slice().sort((a, b) => a.start - b.start)[0].start
      );
    },
    endDate() {
      return new Date(gs[0].data.slice().sort((a, b) => b.end - a.end)[0].end);
    },
  },
};
</script>
<style scoped>
.container {
  grid-template-columns: unset;
}
/*.custom-gantt {
  overflow: scroll !important;
  max-width:100%;
  max-height:100%;
}*/
</style>
<style>
.highcharts-plot-background {
  fill: #eeedeb;
}

.highcharts-fixed {
  max-width: 100%;
}

.highcharts-yaxis,
.highcharts-axis-line {
  display: none;
}
</style>