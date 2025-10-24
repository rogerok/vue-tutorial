<script lang="ts" setup>
import type { TodoModel } from '@components/todo/model.ts'
import { getDefaultTodo } from '@components/todo/service.ts'

const emit = defineEmits<{ 'add-todo': void }>()

const model = defineModel<TodoModel>({
  default: getDefaultTodo(),
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="px flex items-center justify-between gap-4 pr-2">
      <input
        v-model="input"
        autofocus
        class="w-full rounded-lg border border-gray-300 bg-gray-500 p-2"
        @keyup.enter="emit('add-todo')"
      />
      <button
        class="hover: h-full cursor-pointer self-end rounded-lg border bg-gray-500 p-2 hover:bg-gray-600"
        @click="clearInput"
      >
        X
      </button>
    </div>
    <button
      class="hover: cursor-pointer self-end rounded-2xl bg-green-700 p-2 shadow-2xl hover:bg-green-900"
      @click="emit('add-todo')"
    >
      + Add
    </button>
  </div>
</template>
