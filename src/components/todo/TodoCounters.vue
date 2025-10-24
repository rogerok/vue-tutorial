<script lang="ts" setup>
interface Props {
  pending: number
  completed: number
  inProgress: number
}

const props = defineProps<Props>()
</script>

<template>
  <ul class="800 flex list-none justify-between gap-5 text-lg text-black">
    <li class="flex flex-col gap-2 bg-gray-300 p-2">
      <span>Pending</span>
      <span>{{ props.pending }}</span>
    </li>
    <li class="flex flex-col gap-2 bg-green-300 p-2">
      <span>In progress</span>
      <span>{{ props.inProgress }}</span>
    </li>
    <li class="flex flex-col gap-2 bg-lime-300 p-2">
      <span>Completed</span>
      <span>{{ props.completed }}</span>
    </li>
  </ul>
</template>
