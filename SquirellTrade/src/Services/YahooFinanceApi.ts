import {defineStore} from "pinia";
import axios from "axios";
const proxyEnv = import.meta.env.VITE_DEFAULT_PROXY
const chartEnv = import.meta.env.VITE_CHART_ENDPOINT
const searchEnv = import.meta.env.VITE_SEARCH_ENDPOINT

export const useYahooFinanceApiStore = defineStore('yahoo', () => {

  async function search(query: string){
    const URL = `${proxyEnv}${searchEnv}${(query)}`

    try {
      const response = await axios.get(URL);
      const data = response.data;
      return data

    } catch (error){

    }
  }

  async function fetchData(symbol: string, interval: string, range: string) {
    const url = `${proxyEnv}${chartEnv}${symbol}?interval=${interval}&range=${range}}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.chart.result === null) {
        throw new Error(data.chart.error.description);
      } else {
        const timestamps = data.chart.result[0].timestamp;
        const openPrices = data.chart.result[0].indicators.quote[0].open;
        const highPrices = data.chart.result[0].indicators.quote[0].high;
        const lowPrices = data.chart.result[0].indicators.quote[0].low;
        const closePrices = data.chart.result[0].indicators.quote[0].close;

        const candlestickData = timestamps.map((timestamp: number, i: number) => ([
          timestamp * 1000,
          openPrices[i],
          highPrices[i],
          lowPrices[i],
          closePrices[i]
        ]));

        return candlestickData;
      }
    } catch (error) {
      console.error('Error fetching data from Yahoo Finance:', error);
      throw new Error('Error fetching data from Yahoo Finance.');
    }
  }

  async function getChartData(symbol: string, interval: string, range: string) {
    return await fetchData(symbol,interval,range);
  }

  async function getRawData(symbol: string, interval: string, range: string) {
    const data = await fetchData(symbol,interval,range);
    return { symbol, data };
  }

  return {getChartData, search, getRawData}
})
