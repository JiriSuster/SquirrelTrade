<script setup lang="ts">
import {useWatchlistStore} from "@/store/WatchListStocks";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import router from "@/router";
import Search from "@/components/search/Search.vue";

const isMobile = ref(window.innerWidth <= 768);

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768;
});

const watchStore = useWatchlistStore();
const yahooStore = useYahooFinanceApiStore();

const prices = ref<{
    symbol: string;
    high: number;
    low: number;
    open: number;
    close: number;
    lastPrice: number;
    change: string;
}[]>([]);

async function getPrices() {
    try {
        prices.value.splice(0)
        for (const symbol of watchStore.favoriteSymbols) {
            const symbolString = symbol.toString();
            const latestPrice = await yahooStore.getLatestPrice(symbolString);
            const latestChange = await yahooStore.scrapePercentage(symbolString)

            prices.value.push({
                symbol: symbolString,
                high: Math.round(latestPrice.high * 100) / 100,
                low: Math.round(latestPrice.low * 100) / 100,
                open: Math.round(latestPrice.open * 100) / 100,
                close: Math.round(latestPrice.close * 100) / 100,
                lastPrice: Math.round(latestPrice.lastPrice * 100) / 100,
                change: latestChange
            });

        }
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

const getChangeClass = (change: string) => {
  if (change.startsWith('+')) {
    return 'green';
  } else if (change.startsWith('-')) {
    return 'red';
  } else {
    return '';
  }
};

const selectSymbol = (symbol: string) => {
  router.push({ name: 'detail', query: { symbol } });
};

const redirectToDetailView = (symbol: string) => {
  router.push({ name: 'detail', query: { symbol: symbol } });
};



watchEffect(() => {
    getPrices();
});


</script>

<template>
  <v-container class="fill-height">
    <v-responsive>

      <v-row justify="center">
        <v-col cols="12" sm="8" class="text-center">
          <h1>Trade with us</h1>
          <Search :select-symbol="selectSymbol"></Search>
        </v-col>
      </v-row>

      <h1>Watchlist</h1>
      <div v-if="!isMobile">
        <v-list-item class="custom-list-item">
          <div class="d-flex justify-space-around">
            <v-col class="d-flex justify-center" cols="2">Name</v-col>
            <v-col class="d-flex justify-center" cols="2">Close</v-col>
            <v-col class="d-flex justify-center" cols="2">Change</v-col>
            <v-col class="d-flex justify-center" cols="2">High</v-col>
            <v-col class="d-flex justify-center" cols="2">Low</v-col>
            <v-col class="d-flex justify-center" cols="2">Unwatch</v-col>
          </div>
        </v-list-item>

        <v-list lines="one">
          <v-list-item class="custom-list-item mb-1"
              v-for="(stock,index) in prices"
              :key="index"
          >
            <div class="d-flex justify-space-between align-center pa-0">
              <v-col class="d-flex justify-center pa-0" cols="2">
                <v-btn color="purple" variant="text" @click="redirectToDetailView(stock.symbol)">{{stock.symbol}}</v-btn>
              </v-col>
              <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.close }}</v-col>
              <v-col :class="getChangeClass(stock.change)" class="d-flex justify-center pa-0" cols="2">{{ stock.change}}</v-col>
              <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.high }}</v-col>
              <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.low }}</v-col>
              <v-col class="d-flex justify-center pa-0" cols="2">
                <v-btn color="yellow-darken-2"  size="small" density="default" class="ma-1 delete-btn" rounded="xl" @click="watchStore.toggleFavorite(stock.symbol)">
                  Delete
                </v-btn>
              </v-col>


            </div>
          </v-list-item>
        </v-list>
      </div>



      <div v-else>
        <v-list lines="one">
          <v-list-item class="custom-list-item mb-1"
                       v-for="(stock,index) in prices"
                       :key="index"
          >
            <div class="d-flex flex-column pa-4">
              <div class="d-flex justify-center align-center mb-4">
                <v-btn color="purple" variant="text" @click="redirectToDetailView(stock.symbol)">{{stock.symbol}}</v-btn>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span>Close:</span> <span>{{ stock.close }}</span>
              </div>
              <div :class="getChangeClass(stock.change)" class="d-flex justify-space-between align-center">
                <span>Change:</span> <span>{{ stock.change }}</span>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span>High:</span> <span>{{ stock.high }}</span>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span>Low:</span> <span>{{ stock.low }}</span>
              </div>
              <div class="d-flex justify-center">
                <v-btn color="yellow-darken-2" width="400" size="small" density="default" class="mt-4 ma-1 delete-btn" rounded="xl" @click="watchStore.toggleFavorite(stock.symbol)">
                  Sell
                </v-btn>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </div>


    </v-responsive>
  </v-container>
</template>

<style scoped>

.delete-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-list-item {
  background-color: #f0f0f0;
  border-radius: 10px;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
