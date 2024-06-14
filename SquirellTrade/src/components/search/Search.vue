<template>
  <SearchBar
    @search="searchFunction"
    :searchResults="searchResults"
    @symbol-selected="selectSymbol"
    @clear-results="clearSearchResults"
  />
  <SearchResults
    v-if="searchResults.length"
    :searchResults="searchResults"
    @symbol-selected="selectSymbol"
    @clear-results="clearSearchResults"
  />
</template>

<script setup>
import { ref } from 'vue';
import SearchResults from '@/components/search/SearchResults.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import { useYahooFinanceApiStore } from '@/Services/YahooFinanceApi';

const props = defineProps({
  selectSymbol: Function,
});

const searchResults = ref([]);
const store = useYahooFinanceApiStore();

const searchFunction = (query) => {
  store.search(query).then((value) => {
    searchResults.value = value.quotes;
  });
};

const clearSearchResults = () => {
  searchResults.value = [];
};
</script>
