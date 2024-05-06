<template>
  <SearchBar @search="searchFunction"/>
  <SearchResults
    v-if="searchResults"
    :searchResults="searchResults"
    @symbol-selected="selectSymbol"
  />
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import SearchResults from "@/components/search/SearchResults.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import {useYahooFinanceApiStore} from "@/Services/YahooFinanceApi";

defineProps({
  selectSymbol : Function
});

const search = ref('');
const searchResults = ref([]);
const store = useYahooFinanceApiStore();

const searchFunction = (query) => {
  store.search(query).then(value => {
    searchResults.value = value.quotes;
  });
};

watch(search, (newValue) => {
  searchFunction(newValue);
});

</script>
