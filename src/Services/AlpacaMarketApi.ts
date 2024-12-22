import { defineStore } from "pinia";
import axios from "axios";

const api_key = import.meta.env.VITE_ALPACA_API_KEY;
const secret = import.meta.env.VITE_ALPACA_SECRET;
const endpoint = import.meta.env.VITE_ALPACA_ENDPOINT;

export const useAlpacaApiStore = defineStore('alpaca', () => {
  function getMarketMoversRequest(count: Number) {
    let URL = `${endpoint}?top=${count}`;
    return axios.get(URL, {
      headers: {
        'APCA-API-KEY-ID': api_key,
        'APCA-API-SECRET-KEY': secret,
        'Accept': 'application/json'
      }
    });
  }

  async function getMarketMovers(count: Number) {
    try {
      const response = await getMarketMoversRequest(count);
      const data = response.data;

      const gainers = data.gainers.map((gainer: any) => ({
        symbol: gainer.symbol,
        price: gainer.price,
        change: gainer.change,
        percent_change: gainer.percent_change,
      }));

      const losers = data.losers.map((loser: any) => ({
        symbol: loser.symbol,
        price: loser.price,
        change: loser.change,
        percent_change: loser.percent_change,
      }));

      return {
        gainers,
        losers,
      };
    } catch (error) {
      console.error("Failed to fetch market movers:", error);
      return {
        gainers: [],
        losers: [],
      };
    }
  }

  return {
    getMarketMovers
  };
});

/* EXAMPLE USAGE

import {useAlpacaApiStore} from "@/Services/AlpacaMarketApi";
const storeAlpa = useAlpacaApiStore();

storeAlpa.getMarketMovers(5).then( value => {
    console.log(value.gainers[0].symbol)
    console.log(value.gainers[0].price)
    console.log(value.losers[0].percent_change)
  }
)

 */
