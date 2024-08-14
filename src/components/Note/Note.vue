<script setup lang="ts">
const props = defineProps<{
  id: number
  text: string
  color: string
  editButton: () => void
}>()
</script>

<template>
  <div
    class="flex flex-col w-full sm:max-w-[250px] p-1 pb-5 shadow-sm shrink-0"
    :style="{ backgroundColor: color }"
  >
    <div class="flex items-center justify-between">
      <mdicon name="drag" size="14" class="cursor-move" />
      <button
        type="button"
        @click="editButton"
        class="h-6 w-6 rounded-full flex justify-center items-center cursor-pointer"
      >
        <mdicon name="pencil" size="14" />
      </button>
    </div>
    <div data-testid="note-text" class="flex-1 flex justify-center items-center text-center">
      {{ text }}
    </div>
  </div>
</template>

<style scoped></style>
