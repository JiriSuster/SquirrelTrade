<script setup lang="ts">

import {ref} from "vue";
import {Builder} from "xml2js";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";

const selectedTimeFrame = ref("1D");
const selectedFormat = ref("JSON");
const store = useYahooFinanceApiStore();

//const tempData = '{"chart":{"result":[{"meta":{"currency":"USD","symbol":"NVDA","exchangeName":"NMS","fullExchangeName":"NasdaqGS","instrumentType":"EQUITY","firstTradeDate":917015400,"regularMarketTime":1714766407,"hasPrePostMarketData":true,"gmtoffset":-14400,"timezone":"EDT","exchangeTimezoneName":"America/New_York","regularMarketPrice":887.89,"fiftyTwoWeekHigh":892.81,"fiftyTwoWeekLow":870.4,"regularMarketDayHigh":892.81,"regularMarketDayLow":870.4,"regularMarketVolume":39595568,"chartPreviousClose":858.17,"previousClose":858.17,"scale":3,"priceHint":2,"currentTradingPeriod":{"pre":{"timezone":"EDT","start":1714723200,"end":1714743000,"gmtoffset":-14400},"regular":{"timezone":"EDT","start":1714743000,"end":1714766400,"gmtoffset":-14400},"post":{"timezone":"EDT","start":1714766400,"end":1714780800,"gmtoffset":-14400}},"tradingPeriods":[[{"timezone":"EDT","start":1714743000,"end":1714766400,"gmtoffset":-14400}]],"dataGranularity":"1h","range":"1d","validRanges":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]},"timestamp":[1714743000,1714746600,1714750200,1714753800,1714757400,1714761000,1714764600,1714766400],"indicators":{"quote":[{"volume":[13341628,5760484,4067185,4038656,3757541,4036069,2798449,0],"close":[878.6199951171875,880.2459106445312,885.4099731445312,888.239990234375,891.219970703125,888.6300048828125,887.8699951171875,887.8900146484375],"high":[889.474609375,885.4000244140625,887.469970703125,891.0999755859375,892,892.8099975585938,889.2999267578125,887.8900146484375],"open":[877.8900146484375,878.8699951171875,880.5,885.5626831054688,888.239990234375,891.2650146484375,888.780029296875,887.8900146484375],"low":[870.4000854492188,875.2600708007812,879.8900146484375,884.4801025390625,886.0999755859375,886.0200805664062,885.969970703125,887.8900146484375]}]}}],"error":null}}';



async function downloadData(){
   const jsonData = JSON.stringify(await store.getRawData("NVDA","1h","1d"));
   console.log(jsonData)
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

function convertJsonToCsv(data: string) {
  try {
    // Parse JSON data
    const jsonData = JSON.parse(data);

    const headers = ["timestamp", ...Object.keys(jsonData.data[0])];

    const rows = jsonData.data.map((entry: any) => {
      return headers.map(header => {
        // Handle special characters in values
        let value = entry[header];
        if (typeof value === 'string') {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    // Join headers and rows
    return [headers.join(','), ...rows].join('\n');

  } catch (error) {
    console.error('Error converting JSON to CSV:', error);
    throw error;
  }
}



function downloadCsv(data: any){
  data = convertJsonToCsv(data);
  const blob = new Blob([data], { type: 'application/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.csv';
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}

function convertJsonToXml(data: any){
  const builder = new Builder();
  return builder.buildObject(data);
}

function downloadXml(data: string){
  data = convertJsonToXml(data);
  const blob = new Blob([data], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.xml';
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}

function downloadJson(data: string){
  const blob = new Blob([data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
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
