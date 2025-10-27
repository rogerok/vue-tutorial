<script lang="ts" setup>
const searchTerm = defineModel<string>('searchTerm', {
  default: '',
})
</script>

<template>
  <input v-model="searchTerm" class="w-full rounded-lg border border-gray-300 bg-gray-500 p-2" />
</template>
