<template>
  <v-text-field
    append-inner-icon="mdi-magnify"
    class="w-100"
    v-model="search"
    label="Search"
    outlined
    placeholder="Type here to search..."
  ></v-text-field>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits();
const search = ref('');

const searchFunction = (query) => {
  emit('search', query);
};

watch(search, (newValue) => {
  searchFunction(newValue);
});
</script>
