<script setup lang="ts">
import {useMyOwnedStocks} from "@/store/MyOwnedStocks";

const ownedStocks = useMyOwnedStocks()

</script>

<template>
  <v-container>
    <div class="d-flex justify-center align-center">
    <v-col cols="10">
    <v-text-field
      append-inner-icon="mdi-magnify"
      class="ma-5 w-100"
      v-model="search"
      label="Search"
      outlined
      placeholder="Type here to search..."
    ></v-text-field>
    </v-col>
    </div>

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
                     v-for="(stock,index) in ownedStocks.ownedStocks"
                     :key="index"
        >
          <div class="d-flex justify-space-between align-center pa-0">
            <v-col class="d-flex justify-center pa-0" cols="2">{{stock.symbol}}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.date }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.quantity }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">{{ stock.price }}</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">neco</v-col>
            <v-col class="d-flex justify-center pa-0" cols="2">
              <v-btn color="yellow-darken-2"  size="small" density="default" class="ma-1 delete-btn" rounded="xl" @click="ownedStocks.sellStock(stock)">
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
