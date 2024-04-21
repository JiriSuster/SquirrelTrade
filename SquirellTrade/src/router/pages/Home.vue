<template>
  <v-container>
    <v-row justify="center">

      <v-col cols="10" class="text-center">
        <h1>Trade with us</h1>
        <v-text-field
          append-inner-icon="mdi-magnify"
          class="ma-5 w-100"
          v-model="search"
          label="Search"
          outlined
          placeholder="Type here to search..."
        ></v-text-field>
      </v-col>
    </v-row>


    <h1>World markets</h1>
    <div class="d-flex justify-space-between">
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
      <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain">Sap500</v-btn>
    </div>


      <v-row class="mt-5 d-flex justify-space-between">
        <v-col>
        <h1>Stock gainers: </h1>
          <div class="d-flex flex-column">
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          </div>
        </v-col>

        <v-col>
        <h1>Stock losers: </h1>
          <div class="d-flex flex-column">
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
            <v-btn size="x-large" rounded="xl" prepend-icon="mdi-domain" class="ma-2">Sap500</v-btn>
          </div>
        </v-col>
      </v-row>


  </v-container>



</template>

<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";
</script>
