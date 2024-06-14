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

watch(search, (newValue) => {
  emit('search', newValue);
});
</script>
