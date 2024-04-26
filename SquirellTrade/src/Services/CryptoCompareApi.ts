import axios from "axios";

// Define enum for sortOrder
export enum SortOrderEnum {
  Latest = "latest",
  Popular = "popular"
}

function getNewsRequest(sortOrder: SortOrderEnum = SortOrderEnum.Latest){
  let API_KEY = "c43a254cf394cdc743d36733fcf13f2ee5b3d2bb478a859d38c7a4b2224bbe97"; //TODO: add to .env
  let URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}&sortOrder=${sortOrder}`;
  return axios.get(URL);
}


export function getNews(sortOrder: SortOrderEnum = SortOrderEnum.Latest, count: number = 50) {
  return getNewsRequest(sortOrder).then(value => {
    var newData = value.data.Data;
    if (count < 50) {
      newData = newData.slice(0, count);
    }
    return newData;
  });
}

