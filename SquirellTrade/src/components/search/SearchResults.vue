<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-row justify="center">
        <v-col v-for="result in searchResults" :key="result.symbol" cols="12">
          <v-card class="" outlined @click="handleSymbolClick(result.symbol)">
            <v-card-text>
              <div>{{ result.symbol }} - {{ result.shortname }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  searchResults: Array,
});

const emit = defineEmits();

const handleSymbolClick = (symbol) => {
  emit('symbol-selected', symbol);
  emit('clear-results');
};
</script>
