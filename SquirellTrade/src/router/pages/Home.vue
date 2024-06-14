<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" class="text-center">
        <h1>Trade with us</h1>
        <Search :select-symbol="selectSymbol"></Search>
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
                              @click="selectMarket(market)"
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
      <v-col cols="12" md="6">

        <h1>Stock gainers: </h1>


          <div v-for="gainer in gainers" :key="gainer.symbol">
            <GainerLoserListItem
              :name="gainer.name"
              :symbol="gainer.symbol"
              :price="gainer.price"
              :percentChange="gainer.percent_change"
            />
          </div>
      </v-col>
        <v-col cols="12" md="6">
        <h1>Stock losers: </h1>
          <div v-for="loser in losers" :key="loser.symbol">
            <GainerLoserListItem
              :name="loser.name"
              :symbol="loser.symbol"
              :price="loser.price"
              :percentChange="loser.percent_change"
            />
          </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import HighchartsStock from '@/components/StockChart.vue';
import { useYahooFinanceApiStore } from "@/Services/YahooFinanceApi";
import Search from "@/components/search/Search.vue";
import {useAlpacaApiStore} from "@/Services/AlpacaMarketApi";
import GainerLoserListItem from "@/components/GainerLoserListItem.vue";
import router from "@/router";

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

const fetchChartData = (symbol, name) => {
  store.getChartData(symbol, "1m", "1d").then(candlestickData => {
    chartOptions.value.series = [{
      type: 'candlestick',
      name: name,
      data: candlestickData
    }];
  });
};
fetchChartData(selectedMarket.value.symbol, selectedMarket.value.name);

const selectMarket = (market) => {
  selectedMarket.value = market;
  fetchChartData(market.symbol, market.name);
};
const selectSymbol = (symbol) => {
  //fetchChartData(symbol, symbol);
  router.push({ name: 'detail', query: { symbol } });
};

//gainers and loosers
const storeAlpa = useAlpacaApiStore();
const gainersAndLossersList = storeAlpa.getMarketMovers(5)


const gainers = ref([]);
const losers = ref([]);

onMounted(async () => {
  const storeAlpa = useAlpacaApiStore();
  const { gainers: fetchedGainers, losers: fetchedLosers } = await storeAlpa.getMarketMovers(5);
  gainers.value = fetchedGainers;
  losers.value = fetchedLosers;
});


</script>

