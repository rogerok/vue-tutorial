<script lang="ts" setup>
import type { TodoModel } from '@components/todo/model.ts'
import { getStatusList } from '@components/todo/service.ts'

const model = defineModel<TodoModel>('todo', {
  default: {},
})
</script>

<template>
  <div class="px flex flex-col items-center justify-between gap-4 py-6">
    <input
      v-model="model.text"
      autofocus
      class="w-full rounded-lg border border-gray-300 bg-gray-500 p-2"
    />
    <select v-model="model.status" class="w-full rounded-lg border border-gray-300 bg-gray-500 p-2">
      <option v-for="status in getStatusList()" :key="status.id" :value="status.id">
        {{ status.label }}
      </option>
    </select>
  </div>
</template>
