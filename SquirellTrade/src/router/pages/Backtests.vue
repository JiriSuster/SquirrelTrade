<script setup lang="ts">

import {ref} from "vue";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";
import exportFromJSON from "export-from-json";
import Search from "@/components/search/Search.vue";
const selectedSymbol = ref("BTC-USD");
const selectedTimeFrame = ref("1d");
const selectedFormat = ref("JSON");
const store = useYahooFinanceApiStore();

const isDownloading = ref(false);
async function downloadData(){
    isDownloading.value = true
  const jsonData = await store.getRawData(selectedSymbol.value,selectedTimeFrame.value,"3mo");
  switch (selectedFormat.value){
    case("XML"):
      downloadXml(jsonData);
      break;
    case("CSV"):
      downloadCsv(jsonData);
      break;
    default:
      downloadJson(jsonData);
  }
    setTimeout(() => {
        isDownloading.value = false;
    }, 2000);
}

function downloadCsv(data : any) {
  const fileName = data.symbol; // TODO: Maybe add interval and range to the filename?
  const exportType = exportFromJSON.types.csv;
  exportFromJSON({ data: data.data, fileName, exportType });
}

function downloadXml(data: any){
  const fileName = data.symbol;
  const exportType =  exportFromJSON.types.xml;
  exportFromJSON({ data, fileName, exportType });
}

function downloadJson(data: any){
  const fileName = data.symbol;
  const exportType =  exportFromJSON.types.json;
  exportFromJSON({ data, fileName, exportType });
}

const selectSymbol = (symbol : any) => {
  selectedSymbol.value = symbol
};


</script>

<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1>Backtests</h1>
      <v-col cols="12" sm="6">
        <p>Stock</p>
        <Search :select-symbol="selectSymbol"></Search>
        <p class="mb-2">Timeframe</p>
        <v-row>
          <v-radio-group class="ml-2" v-model="selectedTimeFrame" inline>
            <v-radio label="1D" value="1d" @change="selectedTimeFrame = '1d'"></v-radio>
            <v-radio label="5D" value="5d" @change="selectedTimeFrame = '5d'"></v-radio>
            <v-radio label="1WK" value="1wk" @change="selectedTimeFrame = '1wk'"></v-radio>
            <v-radio label="1MO" value="1mo" @change="selectedTimeFrame = '1mo'"></v-radio>
          </v-radio-group>
        </v-row>

        <p>Format</p>
        <v-row class="mt-2 ml-2">
          <v-btn v-bind:variant="selectedFormat === 'JSON' ? 'elevated' : 'outlined'" @click="() => {selectedFormat = 'JSON'}" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl">JSON</v-btn>
          <v-btn v-bind:variant="selectedFormat === 'CSV' ? 'elevated' : 'outlined'" @click="selectedFormat = 'CSV'" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl" >CSV</v-btn>
          <v-btn v-bind:variant="selectedFormat === 'XML' ? 'elevated' : 'outlined'" @click="selectedFormat = 'XML'" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl" >XML</v-btn>
        </v-row>
        <v-row>
            <v-btn :color="isDownloading ? 'green-darken-2' : 'yellow-darken-2'" class="mb-2 mt-5 pl-4 pr-4" prepend-icon="mdi-download" size="large" density="compact" rounded="xl" @click="downloadData()">
               Download
            </v-btn>
        </v-row>
      </v-col>

    </v-responsive>
  </v-container>
</template>

<style scoped>
.v-icon {
    transition: color 0.3s ease;
}

.downloading .v-icon::before {
    color: green !important;
}
</style>
