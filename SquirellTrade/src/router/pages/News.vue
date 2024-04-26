<script setup lang="ts">;
import {reactive} from "vue";

import {getNews, SortOrderEnum} from "@/Services/CryptoCompareApi"
var news = reactive({
  newsList: []
})

getNews(SortOrderEnum.Latest,5).then(value => { //tady se vola ziskani news ze service, argumenty jsou optional
  news.newsList = value; //list of news
});
</script>

<template>
  <v-container>
    <h1>News</h1>
    <div v-if="news.newsList.length === 0">
      <p>Loading...</p>
    </div>
    <div v-else>
      {{ news.newsList[0]}} <!-- jedno vypsani clanku v plaintextu, abys videl ktere parametry jeste muzes pouzit(body,url...) -->
      <div v-for="(article, index) in news.newsList" :key="index">
        <h2>{{ article.title }}</h2>
        <img :src="article.imageurl" alt="Article Image" /> <!-- to ze to sviti cervene nevadi XD -->
        <p>{{ article.body }}</p>
      </div>
    </div>
  </v-container>
</template>

<style scoped>

</style>
