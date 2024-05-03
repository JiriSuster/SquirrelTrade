<script setup lang="ts">
import NewsCard from "@/components/NewsCard.vue";


import {reactive} from "vue";

import {SortOrderEnum, useCryptoCompareApiStore} from "@/Services/CryptoCompareApi"
var news = reactive({
  newsList: []
})

const store = useCryptoCompareApiStore()

store.getNews(SortOrderEnum.Latest,18).then(value => { //tady se vola ziskani news ze service, argumenty jsou optional
  news.newsList = value;
});



</script>

<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1 class="mb-5">Latest news</h1>
      <div v-if="news.newsList.length === 0">
        <p>Loading...</p>
      </div>
      <div v-else>
      <v-row class="justify-center">
        <div v-for="( _ , index) in news.newsList" :key="index">
          <NewsCard class="ml-5 mr-5 mb-5" color="grey-lighten-4" :newsData="news.newsList[index]" ></NewsCard>
        </div>
      </v-row>
      </div>
    </v-responsive>
  </v-container>

</template>

<style scoped>

</style>
