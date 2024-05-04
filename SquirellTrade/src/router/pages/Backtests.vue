<script setup lang="ts">

import {ref} from "vue";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";
import exportFromJSON from "export-from-json";

const selectedTimeFrame = ref("1D");
const selectedFormat = ref("JSON");
const store = useYahooFinanceApiStore();

async function downloadData(){
  const jsonData = await store.getRawData("NVDA","1h","1d");
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

</script>

<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1>Backtests</h1>
      <v-col cols="12" sm="6">
        <p>Stock</p>
        <v-text-field
          append-inner-icon="mdi-magnify"
          class="mt-2 w-100"
          v-model="search"
          label="Search"
          outlined
          placeholder="Type here to search..."
        ></v-text-field>

        <p class="mb-2">Timeframe</p>
        <v-row>
          <v-radio-group class="ml-2" v-model="selectedTimeFrame" inline>
            <v-radio label="1D" value="1D" @change="selectedTimeFrame = '1D'"></v-radio>
            <v-radio label="5D" value="5D" @change="selectedTimeFrame = '5D'"></v-radio>
            <v-radio label="1M" value="1M" @change="selectedTimeFrame = '1M'"></v-radio>
            <v-radio label="3M" value="3M" @change="selectedTimeFrame = '3M'"></v-radio>
            <v-radio label="1Y" value="1Y" @change="selectedTimeFrame = '1Y'"></v-radio>
          </v-radio-group>
        </v-row>

        <p>Format</p>
        <v-row class="mt-2 ml-2">
          <v-btn v-bind:variant="selectedFormat === 'JSON' ? 'elevated' : 'outlined'" @click="() => {selectedFormat = 'JSON'}" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl">JSON</v-btn>
          <v-btn v-bind:variant="selectedFormat === 'CSV' ? 'elevated' : 'outlined'" @click="selectedFormat = 'CSV'" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl" >CSV</v-btn>
          <v-btn v-bind:variant="selectedFormat === 'XML' ? 'elevated' : 'outlined'" @click="selectedFormat = 'XML'" color="yellow-darken-2" class="mr-2 pa-1" size="large" density="compact" rounded="xl" >XML</v-btn>
        </v-row>
        <v-row>
          <v-btn class="ml-2 mb-2 mt-5 pl-4 pr-4" color="yellow-darken-2" size="large" density="compact" rounded="xl"  prepend-icon="mdi-download" @click="downloadData()">Download</v-btn>
        </v-row>
      </v-col>

    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
