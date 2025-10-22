<script lang="ts" setup>
import { computed, ref } from 'vue'

interface TodoModel {
  text: string
  completed: boolean
  id: number
}

const input = ref('')
const todos = ref<TodoModel[]>([])

const completed = computed(() => todos.value.filter((item) => item.completed))
const pending = computed(() => todos.value.filter((item) => !item.completed))

const addTodo = () => {
  if (input.value) {
    todos.value.push({
      text: input.value,
      id: new Date().valueOf(),
      completed: false,
    })
    clearInput()
  }
}

const clearInput = () => (input.value = '')

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <section class="flex w-1/2 flex-col gap-10">
    <h1>Todos list</h1>
    <ul class="800 flex list-none justify-between gap-5 text-lg text-black">
      <li class="flex flex-col gap-2 bg-gray-300 p-2">
        <span>Pending</span>
        <span>{{ pending.length }}</span>
      </li>
      <li class="flex flex-col gap-2 bg-green-300 p-2">
        <span>In progress</span>
        <span>{{ pending.length }}</span>
      </li>
      <li class="flex flex-col gap-2 bg-lime-300 p-2">
        <span>Completed</span>
        <span>{{ completed.length }}</span>
      </li>
    </ul>

    <div class="flex flex-col gap-4">
      <div class="px flex items-center justify-between pr-2">
        <input
          v-model="input"
          autofocus
          class="rounded-lg border border-gray-300 bg-gray-500 p-2"
          @keyup.enter="addTodo"
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
        @click="addTodo"
      >
        + Add
      </button>
    </div>

    <div>
      <h2 class="mb-3">Pending Todos {{ pending.length }}</h2>
      <ul class="flex w-full list-none flex-col gap-8">
        <li v-for="todo in pending" :key="todo.id" class="w-full border-b border-green-50">
          <div class="flex justify-between">
            <label class="flex items-center gap-2" for="{{todo.id}}">
              <input v-model="todo.completed" type="checkbox" />
              <span>
                {{ todo.text }}
              </span>
            </label>

            <button
              class="hover: cursor-pointer rounded-full bg-red-300 p-1 shadow-2xl hover:bg-red-500"
              @click="deleteTodo(todo.id)"
            >
              X
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="mb-3">Completed Todos {{ completed.length }}</h2>
      <ul class="flex list-none flex-col gap-8">
        <li v-for="todo in completed" :key="todo.id" class="border-b border-green-50">
          <div class="flex justify-between">
            <label class="flex items-center gap-2" for="{{todo.id}}">
              <input v-model="todo.completed" type="checkbox" />
              <span>
                {{ todo.text }}
              </span>
            </label>

            <button
              class="hover: cursor-pointer rounded-full bg-red-300 p-1 shadow-2xl hover:bg-red-500"
              @click="deleteTodo(todo.id)"
            >
              X
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
