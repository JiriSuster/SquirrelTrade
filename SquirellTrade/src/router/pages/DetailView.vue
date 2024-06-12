<script setup lang="ts">

import HighchartsStock from "@/components/StockChart.vue";
import {ref} from "vue";

//dodelat
const chartOptions = ref({
  series: []
});

const stockAmount = ref<number>(0)

</script>


<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>NVDA</h1>
        <p>Nvidia Corporation</p>
        <div class="d-flex align-center">
          <h1>345.0 USD</h1>
          <p class="ml-4">28.2 %</p>
        </div>

        <v-btn class="mb-2 mt-4 pl-4 pr-4" color="yellow-darken-2" size="large" density="compact" rounded="xl" prepend-icon="mdi-plus">
          Add to watchlist
        </v-btn>


        <h3 class="mt-5">Quantity</h3>

        <v-responsive
          class="mt-4 mb-4"
          max-width="500"
        >
          <v-text-field
            v-model="stockAmount"
            type="number"
            variant="filled"
            hide-details="auto"
            label="Quantity"
          ></v-text-field>
        </v-responsive>

        <v-btn class="mb-2 pl-4 pr-4" color="yellow-darken-2" size="large" density="compact" rounded="xl" prepend-icon="mdi-plus">
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

</style>
