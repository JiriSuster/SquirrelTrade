<script setup lang="ts">


import {ref} from "vue";

const show = ref(false);

function redirectToURL(url: string){
  window.open(url, '_blank')
}

const props = defineProps({
  newsData: String
})
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    min-width="344"
  >
    <v-img
      height="200px"
      :src="newsData.imageurl"
      alt="Article Image"
      cover
    ></v-img>

    <v-card-title>
      {{newsData.title}}
    </v-card-title>

    <v-card-subtitle>
      {{newsData.categories}}
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
