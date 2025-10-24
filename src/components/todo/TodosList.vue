<script lang="ts" setup>
import type { TodoModel } from '@components/todo/model.ts'

interface Props {
  todos: TodoModel[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'delete-todo': [id: number]
}>()
</script>
<template>
  <div>
    <ul class="flex w-full list-none flex-col gap-8">
      <li v-for="todo in props.todos" :key="todo.id" class="w-full border-b border-green-50">
        <div class="flex justify-between">
          <label class="flex items-center gap-2" for="{{todo.id}}">
            <input v-model="todo.completed" type="checkbox" />
            <span>
              {{ todo.text }}
            </span>
          </label>

          <button
            class="hover: cursor-pointer rounded-full bg-red-300 p-1 shadow-2xl hover:bg-red-500"
            @click="emit('delete-todo', todo.id)"
          >
            X
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
