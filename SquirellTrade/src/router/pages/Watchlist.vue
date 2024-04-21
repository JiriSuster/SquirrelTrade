<script setup lang="ts">

</script>

<template>
  <v-container>
    <div class="d-flex justify-center align-center">
      <v-col cols="10">
        <v-text-field
          append-inner-icon="mdi-magnify"
          class="ma-5 w-100"
          v-model="search"
          label="Search"
          outlined
          placeholder="Type here to search..."
        ></v-text-field>
      </v-col>
    </div>

    <h1>Watchlist</h1>
  </v-container>
</template>

<style scoped>

</style>
