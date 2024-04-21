<script setup lang="ts">

</script>

<template>
  <v-card color="#dadada">
    <v-row align="center">
      <v-col cols="auto align-center ml-2">
        <router-link :to="{name: 'home'}">
        <v-avatar size="50">
          <v-img src="https://static.vecteezy.com/system/resources/previews/024/044/200/original/squirrel-icon-clipart-transparent-background-free-png.png" />
        </v-avatar>
        </router-link>
      </v-col>
      <v-col>
        <v-tabs
          align-tabs="end"
          color="black"
        >
          <v-tab :to="{name: 'watchlist'}" :value="1">Watchlist</v-tab>
          <v-tab :to="{name: 'mytrades'}" :value="2">My trades</v-tab>
          <v-tab :to="{name: 'news'}" :value="3">News</v-tab>
          <v-tab :to="{name: 'backtests'}" :value="4">Backtests</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>
