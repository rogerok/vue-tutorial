<script lang="ts" setup>
import { computed, inject } from 'vue'
import { modalKey } from '@plugins/modals/model.ts'

interface Props {
  name: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Modal',
})

const modals = inject(modalKey)

const show = computed(() => modals?.active() === props.name)

const close = (accepted = false) => {
  if (accepted) {
    modals?.accept()
  } else {
    modals?.cancel()
  }
}
</script>

<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-50/50"
  >
    <div class="rounded-xl border bg-gray-900 p-4 shadow-2xl">
      <header>{{ props.title }}</header>
      <main class="min-h-20 max-w-[40rem]">
        <slot></slot>
      </main>
      <footer class="flex gap-2">
        <button class="rounded border p-2" @click="close(true)">Accept</button>
        <button class="rounded border bg-red-400 p-2" @click="close(false)">Cancel</button>
      </footer>
    </div>
  </div>
</template>
