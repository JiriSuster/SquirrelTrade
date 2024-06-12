<script setup lang="ts">


import {ref} from "vue";


interface SourceInfo {
  name: string;
  img: string;
  lang: string;
}

interface NewsData {
  id: string;
  guid: string;
  publishedOn: number;
  imageUrl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  lang: string;
  upVotes: string;
  downVotes: string;
  categories: string[];
  sourceInfo: SourceInfo;
  source: string;
}

const show = ref(false);

function redirectToURL(url: string){
  window.open(url, '_blank')
}

const props = defineProps<{ newsData: NewsData }>();
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    min-width="344"
  >
    <v-img
      height="200px"
      :src="newsData.imageUrl"
      alt="Article Image"
      cover
    ></v-img>

    <v-card-title>
      {{newsData.title}}
    </v-card-title>


    <v-card-subtitle v-if="newsData.categories.length > 0">
      {{ newsData.categories }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="yellow-darken-2"
        text="Open"
        @click="redirectToURL(newsData.url)"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{newsData.body + "..."}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>

</style>
