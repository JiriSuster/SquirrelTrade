<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" class="text-center">
        <h1>Trade with us</h1>
        <Search :select-symbol="selectSymbol(selectedMarket)"></Search>
      </v-col>
    </v-row>

      <v-row justify="center" class="my-5">
          <v-col cols="12">
              <h1>World markets</h1>
              <v-row>
                  <v-col v-for="(market, index) in markets" :key="index" cols="6" md="2">
                      <v-btn
                              size="x-large"
                              rounded="xl"
                              prepend-icon="mdi-domain"
                              class="pr-10 pl-10 fixed-btn-width"
                              @click="selectedMarket = market"
                              :color="isSelectedMarket(market) ? 'yellow-darken-2' : ''"
                      >
                          {{ market.name }}
                      </v-btn>
                  </v-col>
              </v-row>
          </v-col>
      </v-row>


    <!-- Highcharts Stock Chart Component -->
    <v-row class="mt-5">
      <v-col cols="12">
        <highcharts-stock :chartOptions="chartOptions"></highcharts-stock>
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

<script setup>
import {ref} from "vue";
import HighchartsStock from '@/components/StockChart.vue';
import { useYahooFinanceApiStore } from "@/Services/YahooFinanceApi";
import Search from "@/components/search/Search.vue";

const markets = ref([
    {name: "S&P500",symbol: "^GSPC"},
    {name: "Nasdaq",symbol: "^IXIC"},
    {name: "Dow 30",symbol: "^DJI"},
    {name: "Nikkei",symbol: "^N225"}])

const selectedMarket = ref({name: "S&P500",symbol: "^GSPC"})

const isSelectedMarket = (market) => {
    return selectedMarket.value.symbol === market.symbol;
};


const store = useYahooFinanceApiStore();
const chartOptions = ref({
  series: []
});
store.getChartData(selectedMarket.value.symbol, "1m", "1d").then(candlestickData => {
  chartOptions.value.series = [{
    type: 'candlestick', //can be line
    name: selectedMarket.value.name,
    data: candlestickData
  }];
});

const selectSymbol = (market) => {
  store.getChartData(market.symbol, "1m", "1d").then(candlestickData => {
    chartOptions.value.series = [{
      type: 'candlestick',
      name: market.name,
      data: candlestickData
    }];
  });
};



</script>

