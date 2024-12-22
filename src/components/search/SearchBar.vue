<template>
  <v-text-field
    append-inner-icon="mdi-magnify"
    class="w-100"
    v-model="search"
    label="Search"
    outlined
    placeholder="Type here to search..."
    @keydown.enter="handleEnterKey"
  ></v-text-field>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";

const props = defineProps({
  searchResults: Array,
});

const emit = defineEmits();
const search = ref('');

watch(search, (newValue) => {
  emit('search', newValue);
});

const handleEnterKey = () => {
  if (props.searchResults.length > 0) {
    emit('symbol-selected', props.searchResults[0].symbol);
    emit('changebar', props.searchResults[0].symbol);
    emit('clear-results');
  }
};
</script>
