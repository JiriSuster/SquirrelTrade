import {defineStore} from "pinia";
import axios from "axios";
const proxyEnv = import.meta.env.VITE_DEFAULT_PROXY
const chartEnv = import.meta.env.VITE_CHART_ENDPOINT
const searchEnv = import.meta.env.VITE_SEARCH_ENDPOINT
const infoEnv = import.meta.env.VITE_INFO_ENDPOINT

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

  async function fetchData(symbol: string, interval: string, range: string, format: string) {
    const url = `${proxyEnv}${chartEnv}${symbol}?interval=${interval}&range=${range}`;
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

        if(format == "chart") { //array of arrays for highcharts
          return timestamps.map((timestamp: number, i: number) => ([
            timestamp * 1000,
            openPrices[i],
            highPrices[i],
            lowPrices[i],
            closePrices[i]
          ]));
        }else if (format == "backtests"){ //array of objects for exportFromJSON
          return timestamps.map((timestamp: number, i: number) => ({
            timestamp: timestamp * 1000,
            open: openPrices[i],
            high: highPrices[i],
            low: lowPrices[i],
            close: closePrices[i]
          }));
        }

      }
    } catch (error) {
      console.error('Error fetching data from Yahoo Finance:', error);
      throw new Error('Error fetching data from Yahoo Finance.');
    }
  }

  async function getChartData(symbol: string, interval: string, range: string) {
    return await fetchData(symbol,interval,range,"chart");
  }

  async function getRawData(symbol: string, interval: string, range: string) {
    const data = await fetchData(symbol,interval,range,"backtests");
    return { symbol, data };
  }

  async function getSymbolInfo(symbol: String){
    const url = `${proxyEnv}${infoEnv}?symbol=${symbol}`;
    const response = await axios.get(url);
    return response.data.quoteType.result[0];
  }

  async function getLatestPrice(symbol: string) {
    const data = await fetchData(symbol, '1m', '1d', 'backtests');
    if (data.length > 0) {
      const latestPrice = data[data.length - 1].close;
      return Math.floor(latestPrice);
    } else {
      throw new Error('No data available for the given symbol.');
    }
  }
  async function getPercentageChangeFromYesterday(symbol: string) {
    const now = Date.now();
    const twentyFourHoursAgo = now - (86400000); //1 day in ms
    const fromTimestamp = Math.floor(twentyFourHoursAgo / 1000);
    const data = await fetchData(symbol, '1m', '1d', 'backtests');

    if (data.length > 0) {
      const startIndex = data.findIndex((d: any) => d.timestamp >= fromTimestamp);

      if (startIndex !== -1) {
        const yesterdayClose = data[startIndex].close;
        const latestPrice = data[data.length - 1].close;
        const percentageChange = ((latestPrice - yesterdayClose) / yesterdayClose) * 100;

        return percentageChange.toFixed(2);

      } else {
        throw new Error('No data available for the last 24 hours.');
      }
    } else {
      throw new Error('No data available for the given symbol.');
    }
  }


  return {getChartData, search, getRawData, getSymbolInfo,getLatestPrice, getPercentageChangeFromYesterday}
})
