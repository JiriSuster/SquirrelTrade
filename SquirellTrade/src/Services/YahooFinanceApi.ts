import {defineStore} from "pinia";
import axios from "axios";

export const useYahooFinanceApiStore = defineStore('yahoo', () => {

  async function search(query: string){
    const proxy: string = "https://user.mendelu.cz/xsuster/proxy.php?url="
    const endpoint: string = "https://query2.finance.yahoo.com/v1/finance/search?q="
    const URL = `${proxy}${(endpoint)}${(query)}`

    try {
      const response = await axios.get(URL);
      const data = response.data;
      return data

    } catch (error){

    }
  }

  async function fetchData(symbol: string, interval: string, range: string) {
    const url = `https://user.mendelu.cz/xsuster/proxy.php?url=${encodeURIComponent(`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`)}`;
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

        const candlestickData = timestamps.map((timestamp: number, i: number) => ({
          timestamp: timestamp * 1000,
          open: openPrices[i],
          high: highPrices[i],
          low: lowPrices[i],
          close: closePrices[i]
        }));

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
