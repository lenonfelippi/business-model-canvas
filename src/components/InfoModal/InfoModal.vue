<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
  title: string
  content: string
}>()

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed w-full h-full bg-black/80 top-0 left-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div class="w-[300px] bg-white rounded-lg p-4" @click.stop>
      <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
      <div class="text-gray-700 mb-4" v-html="content"></div>
      <button
        class="w-full bg-primary hover:!bg-primary text-white py-2 rounded"
        @click="closeModal"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
