<script lang="ts" setup>
const props = defineProps<{ name: string; title?: string }>()
</script>

<template>
  <div class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-50/50">
    <div class="rounded-xl border p-4 shadow-2xl">hello</div>
  </div>
</template>
