<script setup lang="ts">
const props = defineProps<{
  title: string
  addButton: () => void
  infoButton: () => void
}>()
</script>

<template>
  <div
    class="flex-1 flex flex-col gap-2 border border-solid rounded-md shadow-md p-2 h-auto bg-white"
  >
    <div class="flex items-center justify-between border-b pb-1 shrink-0">
      <h2 class="text-xs font-bold">{{ title }}</h2>
      <button
        type="button"
        @click="infoButton"
        class="w-6 h-6 rounded-full border flex justify-center items-center"
      >
        <mdicon name="information-variant" size="14" />
      </button>
    </div>

    <slot></slot>

    <div class="w-full shrink-0">
      <button
        type="button"
        @click="addButton"
        class="h-6 rounded-full border flex justify-center items-center w-full"
      >
        <mdicon name="plus" size="14" />
        <span>Adicionar</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
