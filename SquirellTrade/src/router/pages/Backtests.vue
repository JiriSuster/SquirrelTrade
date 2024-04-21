<script setup lang="ts">

</script>

<template>
  <v-container>
  <h1 class="mt-5 mb-5 text-center">Train on backtest data</h1>
  <h1 class="mt-5 mb-5">Backtests data</h1>
    <div class="d-flex flex-column w-33">
      <p>Stock</p>
      <v-text-field
        append-inner-icon="mdi-magnify"
        class="mt-2 w-100"
        v-model="search"
        label="Search"
        outlined
        placeholder="Type here to search..."
      ></v-text-field>

      <p>Timeframe</p>
      <v-row>
          <v-checkbox label="1D"></v-checkbox>
          <v-checkbox label="5D"></v-checkbox>
          <v-checkbox label="1M"></v-checkbox>
          <v-checkbox label="3M"></v-checkbox>
          <v-checkbox label="1Y"></v-checkbox>
      </v-row>

      <p>Format</p>
      <div class="mt-2 d-flex d-inline-block">
        <v-btn color="yellow" class="mr-2" size="large" density="compact" rounded="xl" >JSON</v-btn>
        <v-btn color="yellow" class="mr-2" size="large" density="compact" rounded="xl" >SVG</v-btn>
        <v-btn color="yellow" class="mr-2" size="large" density="compact" rounded="xl" >XML</v-btn>
      </div>

      <div class="mt-5 d-flex d-inline-block">
      <v-btn color="yellow" size="large" density="compact" rounded="xl"  prepend-icon="mdi-download" >Download</v-btn>
      </div>
    </div>


  </v-container>
</template>

<style scoped>

</style>
