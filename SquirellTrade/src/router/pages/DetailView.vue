<script setup lang="ts">
import HighchartsStock from "@/components/StockChart.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useYahooFinanceApiStore } from "@/Services/YahooFinanceApi";
import { useWatchlistStore } from "@/store/WatchListStocks";
import { OwnedStock, useMyOwnedStocks } from "@/store/MyOwnedStocks";
import { useRoute } from "vue-router";

interface CandlestickData {
  type: string;
  name: string;
  data: any;
}

interface ChartOptions {
  value: {
    series: CandlestickData[];
  };
}

const chartOptions: ChartOptions = ref({
  rangeSelector: {
    enabled: false
  },
  series: []
});

const fetchChartData = (symbol: string) => {
  yahooStore.getChartData(symbol, "1m", "1d").then(candlestickData => {
    chartOptions.value.series = [{
      type: 'candlestick',
      name: "",
      data: candlestickData
    }];
  });
};

const yahooStore = useYahooFinanceApiStore();
const watchStore = useWatchlistStore();
const ownedStocksStore = useMyOwnedStocks();

const route = useRoute();
const symbol = route.query.symbol ? route.query.symbol.toString() : "NVDA";
fetchChartData(symbol);
var name = ref("");
var price = ref("");
var percentage = ref("");

yahooStore.getSymbolInfo(symbol).then(value => {
  name.value = value.shortName;
});

yahooStore.getLatestPrice(symbol).then(value => {
  price.value = value.lastPrice.toString();
});

yahooStore.scrapePercentage(symbol).then(value => {
  percentage.value = value.toString();
});

const selectedStockInfo = ref<OwnedStock>({ id: "", date: "", price: 100, quantity: 0, symbol: symbol });

function orderStock() {
  selectedStockInfo.value = {
    ...selectedStockInfo.value,
    date: new Date().toLocaleString()
  };
  ownedStocksStore.addStock(selectedStockInfo.value);
}

const isQuantityInvalid = computed(() => {
  return selectedStockInfo.value.quantity <= 0;
});

const heartColor = ref("red-darken-2");

const percentageColor = computed(() => {
  if (percentage.value.startsWith("+")) {
    return "text-green";
  } else if (percentage.value.startsWith("-")) {
    return "text-red";
  } else {
    return "";
  }
});
</script>



<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>{{ symbol }}</h1>
        <p>{{ name }}</p>
        <div class="d-flex align-center">
          <h1>{{ price }} USD</h1>
          <p :class="percentageColor" class="ml-4 font-weight-bold" >{{ percentage }}</p>
        </div>
        <v-btn class="mb-2 mt-4 pl-4 pr-4" color="yellow-darken-2" size="large" density="compact" rounded="xl" @click="watchStore.toggleFavorite(symbol);">
          <template v-slot:prepend>
            <v-icon icon="mdi-heart" :color="watchStore.isFavorite(symbol) ? 'red-darken-4' : 'white'"></v-icon>
          </template>
          Add to watchlist
        </v-btn>
        <h3 class="mt-5">Quantity</h3>
        <v-responsive class="mt-4 mb-4" max-width="500">
          <v-text-field
            v-model="selectedStockInfo.quantity"
            type="number"
            variant="filled"
            hide-details="auto"
            label="Quantity"
          ></v-text-field>
        </v-responsive>
        <v-btn class="mb-2 pl-4 pr-4" color="yellow-darken-2" size="large" density="compact" rounded="xl" prepend-icon="mdi-plus" :disabled="isQuantityInvalid" @click="orderStock()">
          Order
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <highcharts-stock :chartOptions="chartOptions"></highcharts-stock>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.text-green {
  color: green;
}
.text-red {
  color: red;
}
.font-weight-bold {
  font-weight: bold;
}
</style>
