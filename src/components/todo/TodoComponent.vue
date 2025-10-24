<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import ModalComponent from '@plugins/modals/ModalComponent.vue'
import { modalKey } from '@plugins/modals/model.ts'
import TodoCounters from '@components/todo/TodoCounters.vue'
import type { TodoModel } from '@components/todo/model.ts'
import TodosList from '@components/todo/TodosList.vue'
import { getDefaultTodo } from '@components/todo/service.ts'
import TodoForm from '@components/todo/TodoForm.vue'

const modalName = 'todo'

const item = ref<TodoModel>(getDefaultTodo())

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

const clearInput = () => (item.value = getDefaultTodo())

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const modals = inject(modalKey)

modals?.show(modalName).then(
  () => {
    addTodo()
  },
  () => {
    clearInput()
  }
)
</script>

<template>
  <section class="flex w-1/2 flex-col gap-10">
    <TodoCounters
      :completed="completed.length"
      :in-progress="0"
      :pending="pending.length"
    ></TodoCounters>
    <div class="flex flex-col gap-4">
      <ModalComponent :name="modalName">
        <TodoForm></TodoForm>
      </ModalComponent>
      <button
        class="hover: cursor-pointer self-end rounded-2xl bg-green-700 p-2 shadow-2xl hover:bg-green-900"
        @click="addTodo"
      >
        + Add
      </button>
    </div>

    <TodosList :todos="pending" @delete-todo="deleteTodo"></TodosList>

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
