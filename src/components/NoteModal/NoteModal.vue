<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCanvasStore, type CanvasState } from '../../stores/canvasStore'
import { z } from 'zod'

const props = defineProps<{
  isVisible: boolean
  column: keyof CanvasState
  itemToEdit?: { id: number; text: string; color: string }
}>()

const emit = defineEmits(['close'])

const colors = [
  '#f3f4f6',
  '#ffadad',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff'
]

const canvasStore = useCanvasStore()
const text = ref(props.itemToEdit?.text || '')
const selectedColor = ref(props.itemToEdit?.color || colors[0])
const isEditing = computed(() => !!props.itemToEdit)

const itemSchema = z.object({
  text: z.string().min(1, {
    message: 'A descrição não pode ser vazia'
  }),
  color: z.string().min(7, {
    message: 'Selecione uma cor'
  })
})

const save = () => {
  const validationResult = itemSchema.safeParse({
    text: text.value,
    color: selectedColor.value
  })

  if (!validationResult.success) {
    alert(validationResult.error.issues.map((issue) => issue.message).join('\n'))
    return
  }

  const item = {
    id: props.itemToEdit?.id || Date.now(),
    text: text.value,
    color: selectedColor.value
  }

  if (isEditing.value) {
    canvasStore.updateItem(props.column, item)
  } else {
    canvasStore.addItem(props.column, item)
  }
  resetForm()
  emit('close')
}

const closeModal = () => {
  resetForm()
  emit('close')
}

const deleteItem = () => {
  if (props.itemToEdit) {
    canvasStore.removeItem(props.column, props.itemToEdit.id)
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  text.value = ''
  selectedColor.value = colors[0]
}

watch(
  () => props.itemToEdit,
  (newVal) => {
    text.value = newVal?.text || ''
    selectedColor.value = newVal?.color || colors[0]
  }
)
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed w-full h-full bg-black/80 top-0 left-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div
      class="w-[250px] rounded-lg p-4"
      :style="{ backgroundColor: selectedColor || '#ffffff' }"
      @click.stop
    >
      <h2 class="text-lg font-bold mb-4">
        {{ isEditing ? 'Editar Item' : 'Adicionar Novo Item' }}
      </h2>
      <textarea
        v-model="text"
        placeholder="Descrição"
        class="w-full h-24 p-2 border rounded mb-4"
      />
      <div class="flex gap-2 mb-4">
        <label
          v-for="color in colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="w-6 h-6 rounded-full cursor-pointer border-2"
          :class="selectedColor === color ? 'border-black' : 'border-transparent'"
        >
          <input v-model="selectedColor" type="radio" :value="color" class="hidden" />
        </label>
      </div>
      <button
        class="w-full bg-primary hover:!bg-primary text-white py-2 rounded mb-2"
        @click="save"
      >
        {{ isEditing ? 'Salvar Alterações' : 'Adicionar' }}
      </button>
      <button class="w-full bg-gray-300 text-gray-700 py-2 rounded" @click="closeModal">
        Cancelar
      </button>
      <div v-if="isEditing" class="mt-4 text-center">
        <p>Deseja excluir esse item?</p>
        <button class="text-red-500 underline" @click="deleteItem">Excluir</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
