<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" class="text-center">
        <h1>Trade with us</h1>
        <SearchBar @search="searchFunction"/>
        <SearchResults
          v-if="searchResults"
          :searchResults="searchResults"
          @symbol-selected="selectSymbol"
        />
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
import {ref, watch} from "vue";
import HighchartsStock from '@/components/StockChart.vue';
import { useYahooFinanceApiStore } from "@/Services/YahooFinanceApi";
import SearchResults from "@/components/SearchResults.vue";
import SearchBar from "@/components/Search.vue"

const search = ref('');
const searchResults = ref([]);

//example of filling chart with BTC-USD data
const store = useYahooFinanceApiStore();
const chartOptions = ref({
  series: []
});
store.getChartData("BTC-USD", "1m", "1d").then(candlestickData => {
  chartOptions.value.series = [{
    type: 'candlestick', //can be line
    name: 'BTC-USD',
    data: candlestickData
  }];
});
//////////////////////////////////////////////

const searchFunction = (query) => {
  store.search(query).then(value => {
    searchResults.value = value.quotes;
  });
};


watch(search, (newValue) => {
  searchFunction(newValue);
});


const selectSymbol = (symbol) => {
  store.getChartData(symbol, "1m", "1d").then(candlestickData => {
    chartOptions.value.series = [{
      type: 'candlestick',
      name: symbol,
      data: candlestickData
    }];
  });
};
</script>

