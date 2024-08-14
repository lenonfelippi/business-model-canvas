import { defineStore } from 'pinia'

export interface NoteItem {
  id: number
  text: string
  color: string
}

export interface CanvasState {
  partners: NoteItem[]
  activities: NoteItem[]
  resources: NoteItem[]
  valuePropositions: NoteItem[]
  customerRelationships: NoteItem[]
  channels: NoteItem[]
  customerSegments: NoteItem[]
  costStructure: NoteItem[]
  revenueStreams: NoteItem[]
}

export const useCanvasStore = defineStore('canvasStore', {
  state: (): CanvasState => ({
    partners: [
      {
        id: 1,
        text: 'www.contabilizei.com.br',
        color: '#a0c4ff'
      }
    ],
    activities: [],
    resources: [],
    valuePropositions: [],
    customerRelationships: [],
    channels: [],
    customerSegments: [],
    costStructure: [],
    revenueStreams: []
  }),

  actions: {
    addItem(column: keyof CanvasState, item: NoteItem) {
      this[column].push({ ...item, id: Date.now() })
    },

    updateItem(column: keyof CanvasState, item: NoteItem) {
      const index = this[column].findIndex((i) => i.id === item.id)
      if (index !== -1) {
        this[column][index] = item
      }
    },

    removeItem(column: keyof CanvasState, itemId: number) {
      this[column] = this[column].filter((item) => item.id !== itemId)
    }
  }
})
