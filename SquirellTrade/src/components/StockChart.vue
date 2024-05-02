<script setup>
import { Chart } from "highcharts-vue";
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';

stockInit(Highcharts);
</script>

<template>
  <Chart :options="chartOptions" :constructor-type="'stockChart'"></Chart>
</template>

<script>
export default {
  props: {
    chartOptions: Object
  }
}
</script>
