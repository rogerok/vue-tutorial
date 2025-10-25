<script lang="ts" setup>
import type { TodoModel } from '@components/todo/model.ts'

interface Props {
  todos: TodoModel[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'delete:todo': [id: number]
  'edit:todo': [false, todo: TodoModel]
  'toggle:status': [todo: TodoModel]
}>()
</script>

<template>
  <div>
    <ul class="flex w-full list-none flex-col gap-8">
      <li v-for="todo in props.todos" :key="todo.id" class="w-full border-b border-green-50">
        <div class="flex justify-between">
          <button
            class="hover: cursor-pointer rounded-full bg-amber-300 p-1 shadow-2xl hover:bg-amber-500"
            @click="emit('toggle:status', todo)"
          >
            toggle status
          </button>
          <span>{{ todo.status }}</span>

          <span>{{ todo.text }}</span>
          <button
            class="hover: cursor-pointer rounded-full bg-red-300 p-1 shadow-2xl hover:bg-red-500"
            @click="emit('edit:todo', false, todo)"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
