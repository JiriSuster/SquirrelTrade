<template>
  <v-card class="pa-4 mt-2 mb-2" outlined rounded="lg" @click="redirectToDetailView">
    <v-row align="center">
      <v-col cols="auto">
        <v-avatar size="40" color="red">
          <span class="white--text">{{ symbolInitial }}</span>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">{{ name }}</span>
          <span class="grey--text">{{ symbol }}</span>
        </div>
      </v-col>
      <v-col class="text-right">
        <span class="font-weight-bold">{{ price.toPrecision(2) }} USD</span>
        <div :class="percentageColor">{{ percentChange }}%</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import router from "@/router";

const props = defineProps({
  name: String,
  symbol: String,
  price: Number,
  percentChange: Number,
});

const symbolInitial = computed(() => props.symbol!.charAt(0));

const percentageColor = computed(() => {
  return {
    'green-style': props.percentChange! > 0,
    'red-style': props.percentChange! < 0,
  };
});

const redirectToDetailView = () => {
  router.push({ name: 'detail', query: { symbol: props.symbol } });
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}

.font-weight-bold {
  font-weight: bold;
}

.green-style {
  color: green;
}

.red-style {
  color: red;
}
</style>
