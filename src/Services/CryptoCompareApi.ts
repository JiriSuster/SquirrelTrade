import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";
import {is} from "cheerio/lib/api/traversing";
const api_key = import.meta.env.VITE_CRYPTO_COMPARE_API_KEY
const news = import.meta.env.VITE_NEWS_ENDPOINT


export enum SortOrderEnum {
  Latest = "latest",
  Popular = "popular"
}

export const useCryptoCompareApiStore = defineStore('crypto', () => {
  const isLoading = ref(true)

  function getNewsRequest(sortOrder: SortOrderEnum = SortOrderEnum.Latest){
    let URL = `${news}&api_key=${api_key}&sortOrder=${sortOrder}`;
    return axios.get(URL);
  }


  function getNews(sortOrder: SortOrderEnum = SortOrderEnum.Latest, count: number = 50) {
    isLoading.value = true
    return getNewsRequest(sortOrder).then(value => {
      var newData = value.data.Data;
      if (count < 50) {
        newData = newData.slice(0, count);
      }
      isLoading.value = false
      return newData;
    });
  }

  return {getNews,isLoading}

})


