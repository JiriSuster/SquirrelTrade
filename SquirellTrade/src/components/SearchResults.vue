<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-row justify="center">
        <v-col v-for="result in searchResults" :key="result.symbol" cols="12">
          <v-card class="" outlined @click="selectSymbol(result.symbol)">
            <v-card-text>
              <div>{{ result.symbol }} - {{ result.shortname }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    searchResults: Array
  },
  methods: {
    selectSymbol(symbol) {
      this.$emit('symbol-selected', symbol);
    }
  }
}
</script>
