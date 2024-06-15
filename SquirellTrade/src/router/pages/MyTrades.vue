<script setup lang="ts">
import {useMyOwnedStocks} from "@/store/MyOwnedStocks";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";
import {ref, watchEffect} from "vue";
import Search from "@/components/search/Search.vue";
import router from "@/router";

const ownedStocks = useMyOwnedStocks()
const yahooStore = useYahooFinanceApiStore()

const stockInfo = ref<{
    id: string;
    symbol: string;
    date: string;
    quantity: number;
    price: number;
    profit: number
}[]>([]);


async function getStockInfo() {
    stockInfo.value.splice(0)
    try {
        for (const stock of ownedStocks.ownedStocks) {
            const latestPrice = await yahooStore.getLatestPrice(stock.symbol);
            const currentTotalValue = latestPrice.close * stock.quantity;
            const initialTotalValue = stock.price * stock.quantity;
            const profit = currentTotalValue - initialTotalValue;

            stockInfo.value.push({
                id: stock.id,
                symbol: stock.symbol,
                date: stock.date,
                quantity: stock.quantity,
                price: stock.price,
                profit: profit
            });

        }
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

const selectSymbol = (symbol: string) => {
  router.push({ name: 'detail', query: { symbol } });
};

watchEffect(() => {
    getStockInfo();
});


</script>

<template>
  <v-container>

    <v-row justify="center">
      <v-col cols="12" sm="8" class="text-center">
        <h1>Trade with us</h1>
        <Search :select-symbol="selectSymbol"></Search>
      </v-col>
    </v-row>

    <h1>My trades</h1>


    <div>
      <v-list-item class="custom-list-item">
        <div class="d-flex justify-space-around">
          <v-col class="d-flex justify-center" cols="2">Name</v-col>
          <v-col class="d-flex justify-center" cols="2">Date</v-col>
          <v-col class="d-flex justify-center" cols="2">Qty</v-col>
          <v-col class="d-flex justify-center" cols="2">Price</v-col>
          <v-col class="d-flex justify-center" cols="2">Profit</v-col>
          <v-col class="d-flex justify-center" cols="2">Sell</v-col>
        </div>
      </v-list-item>

      <v-list lines="one">
        <v-list-item class="custom-list-item mb-1"
                     v-for="(stock,index) in stockInfo"
                     :key="index"
        >
          <div class="d-flex justify-space-between align-center pa-0">
            <v-col class="d-flex justify-center pa-0" cols="2">{{stock.symbol}}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.date }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.quantity }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.price }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.profit.toFixed(2) }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">
              <v-btn color="yellow-darken-2"  size="small" density="default" class="ma-1 delete-btn" rounded="xl" @click="ownedStocks.sellStock(stock.id)">
                Sell
              </v-btn>
            </v-col>


          </div>
        </v-list-item>
      </v-list>
    </div>


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
</style>
