import {defineStore} from "pinia";
import axios from "axios";

export const useYahooFinanceApiStore = defineStore('yahoo', () => {

  async function getChartData(symbol: string, interval: string, range: string): Promise<number[][]> {
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

        // [timestamp, open, high, low, close]
        const candlestickData = timestamps.map((timestamp: number, i: number) => [
          timestamp * 1000,
          openPrices[i],
          highPrices[i],
          lowPrices[i],
          closePrices[i]
        ]);


        return candlestickData;
      }

    } catch (error) {
      console.error('Error fetching data from Yahoo Finance:', error);
      throw new Error('Error fetching data from Yahoo Finance.');
    }
  }
  return {getChartData}
})
