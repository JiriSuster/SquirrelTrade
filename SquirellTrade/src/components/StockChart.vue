<template>
  <div ref="chart"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsVue from 'highcharts-vue'

export default {
  name: 'HighchartsStock',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mixins: [HighchartsVue],
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = Highcharts.stockChart(this.$refs.chart, this.options)
    }
  }
}
</script>
