import axios from "axios";
import {defineStore} from "pinia";
const api_key = import.meta.env.VITE_CRYPTO_COMPARE_API_KEY
const news = import.meta.env.VITE_NEWS_ENDPOINT


export enum SortOrderEnum {
  Latest = "latest",
  Popular = "popular"
}

export const useCryptoCompareApiStore = defineStore('crypto', () => {
  function getNewsRequest(sortOrder: SortOrderEnum = SortOrderEnum.Latest){
    let URL = `${news}&api_key=${api_key}&sortOrder=${sortOrder}`;
    return axios.get(URL);
  }


  function getNews(sortOrder: SortOrderEnum = SortOrderEnum.Latest, count: number = 50) {
    return getNewsRequest(sortOrder).then(value => {
      var newData = value.data.Data;
      if (count < 50) {
        newData = newData.slice(0, count);
      }
      return newData;
    });
  }

  return {getNews}

})


