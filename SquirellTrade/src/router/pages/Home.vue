<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <h1>Trade with us</h1>
        <v-text-field
          append-inner-icon="mdi-magnify"
          class="ma-5 w-100"
          v-model="search"
          label="Search"
          outlined
          placeholder="Type here to search..."
        ></v-text-field>
      </v-col>
    </v-row>

    <h1>World markets</h1>
    <div class="d-flex justify-space-between">
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
    </div>

    <!-- Highcharts Stock Chart Component -->
    <v-row class="mt-5">
      <v-col cols="12">
        <highcharts-stock :options="chartOptions"></highcharts-stock>
      </v-col>
    </v-row>

    <v-row class="mt-5 d-flex justify-space-between">
      <v-col>
        <h1>Stock gainers: </h1>
        <div class="d-flex flex-column">
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
        </div>
      </v-col>

      <v-col>
        <h1>Stock losers: </h1>
        <div class="d-flex flex-column">
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";

import HighchartsStock from '@/components/StockChart.vue';
import {useYahooFinanceApiStore} from "@/services/YahooFinanceApi";
const chartOptions = {
  title: {
    text: 'Stock Chart'
  },
  series: [{
    type: 'candlestick',
    name: 'BTC-USD',
    data: [
        [1509494400000, 101.00, 101.50, 99.00, 100.50], // [timestamp, open, high, low, close]
        [1509580800000, 100.50, 102.00, 100.00, 101.50],
        [1509667200000, 101.50, 103.00, 101.00, 102.50],
        [1509753600000, 102.50, 103.50, 102.00, 103.00],
        [1509840000000, 103.00, 104.00, 102.50, 103.50],
        [1509926400000, 103.50, 104.50, 103.00, 104.00],
        [1510012800000, 104.00, 105.00, 103.50, 104.50],
        [1510099200000, 104.50, 105.50, 104.00, 105.00],
        [1510185600000, 105.00, 106.00, 104.50, 105.50],
        [1510272000000, 105.50, 107.00, 105.00, 106.50],
        [1510358400000, 106.50, 108.00, 106.00, 107.50],
        [1510444800000, 107.50, 109.00, 107.00, 108.50],
        [1510531200000, 108.50, 110.00, 108.00, 109.50],
        [1510617600000, 109.50, 111.00, 109.00, 110.50],
        [1510704000000, 110.50, 112.00, 110.00, 111.50],
        [1510790400000, 111.50, 113.00, 111.00, 112.50],
        [1510876800000, 112.50, 114.00, 112.00, 113.50],
        [1510963200000, 113.50, 115.00, 113.00, 114.50],
        [1511049600000, 114.50, 116.00, 114.00, 115.50],
        [1511136000000, 115.50, 117.00, 115.00, 116.50]
    ]
  }]
};
/*
//example of printing data to console
const store = useYahooFinanceApiStore()
//METHOD1
store.getChartData("BTC-USD","1m","1d").then(value => {
  console.log(value)
})
//METHOD2
const data = await store.getChartData("BTC-USD","1m","1d")
console.log(data)
*/
</script>
