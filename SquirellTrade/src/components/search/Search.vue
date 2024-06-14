<template>
  <!-- Your existing template code -->
  <SearchBar
    v-model="selectedSymbol"
    @search="searchFunction"
    :searchResults="searchResults"
    @symbol-selected="selectSymbol"
    @clear-results="clearSearchResults"
    @changebar="changeSearchBarValue"
  />
  <SearchResults
    v-if="searchResults.length"
    :searchResults="searchResults"
    @symbol-selected="selectSymbol"
    @clear-results="clearSearchResults"
    @changebar="changeSearchBarValue"
  />
  <!-- Your existing template code -->
</template>

<script setup>
import { ref } from 'vue';
import SearchResults from '@/components/search/SearchResults.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import { useYahooFinanceApiStore } from '@/Services/YahooFinanceApi';

const selectedSymbol = ref('');
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
const props = defineProps({
  selectSymbol: Function,
});

const changeSearchBarValue = (symbol) => {
  selectedSymbol.value = symbol;
};

</script>
