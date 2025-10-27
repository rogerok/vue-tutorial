<script lang="ts" setup>
import { computed, inject, reactive, ref } from 'vue'
import ModalComponent from '@plugins/modals/ModalComponent.vue'
import { modalKey } from '@plugins/modals/model.ts'
import TodoCounters from '@components/todo/TodoCounters.vue'
import type { TodoModel } from '@components/todo/model.ts'
import TodosList from '@components/todo/TodosList.vue'
import { getDefaultTodo, makeCopy, toggleStatus } from '@components/todo/service.ts'
import TodoForm from '@components/todo/TodoForm.vue'
import TodoFilter from '@components/todo/TodoFilter.vue'

const item = ref<TodoModel>(getDefaultTodo())
const items = reactive<TodoModel[]>([])

const searchTerm = ref('')

const filteredItems = computed(() =>
  items.filter((t) => t.text.toLocaleLowerCase().includes(searchTerm.value.toLowerCase()))
)

const counters = computed(() =>
  items.reduce(
    (acc, i) => {
      switch (i.status) {
        case 'completed':
          acc.completed = acc.completed + 1
          break
        case 'inProgress':
          acc.inProgress = acc.inProgress + 1
          break
        case 'notStarted':
          acc.notStarted = acc.notStarted + 1
          break
      }
      return acc
    },
    {
      notStarted: 0,
      completed: 0,
      inProgress: 0,
    }
  )
)

const deleteTodo = (id: number) => {
  const idx = items.findIndex((todo) => todo.id === id)
  if (idx >= 0) {
    items.splice(idx, 1)
  }
}

const modals = inject(modalKey)
const modalName = 'todo'

const handleModal = (isNew = true, todo: TodoModel = getDefaultTodo()) => {
  if (isNew) {
    item.value = getDefaultTodo()
  } else {
    item.value = makeCopy(todo)
  }
  modals?.show(modalName).then(
    () => {
      if (isNew) {
        items.push(item.value)
      } else {
        const idx = items.findIndex((t) => t.id === todo.id)
        if (idx >= 0) {
          items[idx] = item.value
        }
      }
    },
    () => {
      item.value = getDefaultTodo()
    }
  )
}

const changeStatus = (todo: TodoModel) => {
  todo.status = toggleStatus(todo.status)
}
</script>

<template>
  <section class="flex w-1/2 flex-col gap-10">
    <TodoCounters
      :completed="counters.completed"
      :in-progress="counters.inProgress"
      :not-started="counters.notStarted"
    ></TodoCounters>
    <TodoFilter v-model:search-term="searchTerm" />
    <ModalComponent :name="modalName">
      <TodoForm :todo="item"></TodoForm>
    </ModalComponent>
    <button
      class="hover: cursor-pointer self-end rounded-2xl bg-green-700 p-2 shadow-2xl hover:bg-green-900"
      @click="handleModal(true)"
    >
      + Add
    </button>

    <TodosList
      :todos="filteredItems"
      @delete:todo="deleteTodo"
      @edit:todo="handleModal"
      @toggle:status="changeStatus"
    ></TodosList>
  </section>
</template>
