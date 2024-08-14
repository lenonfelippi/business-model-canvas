<script setup lang="ts">
import { ref } from 'vue'
import NoteModal from '../components/NoteModal/NoteModal.vue'
import InfoModal from '../components/InfoModal/InfoModal.vue'
import Note from '../components/Note/Note.vue'
import CanvasRow from '../components/CanvasRow/CanvasRow.vue'
import CanvasCol from '../components/CanvasCol/CanvasCol.vue'
import CanvasDoubleCol from '../components/CanvasDoubleCol/CanvasDoubleCol.vue'
import { useScreenSize } from '../composables/useScreenSize'
import { useCanvasStore, type CanvasState, type NoteItem } from '../stores/canvasStore'
import { useDraggable } from 'vue-draggable-plus'
import html2pdf from 'html2pdf.js'

const { isMobile } = useScreenSize()
const isNoteModalVisible = ref(false)
const isInfoModalVisible = ref(false)
const infoModalContent = ref('')
const infoModalTitle = ref('')

const partnersCol = ref()
const activitiesCol = ref()
const resourcesCol = ref()
const valuePropositionsCol = ref()
const customerRelationshipsCol = ref()
const channelsCol = ref()
const customerSegmentsCol = ref()
const costStructureCol = ref()
const revenueStreamsCol = ref()

const activeColumn = ref<keyof CanvasState>('partners')
const itemToEdit = ref<NoteItem | undefined>(undefined)

const canvasStore = useCanvasStore()

useDraggable(partnersCol, canvasStore.partners, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(activitiesCol, canvasStore.activities, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(resourcesCol, canvasStore.resources, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(valuePropositionsCol, canvasStore.valuePropositions, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(customerRelationshipsCol, canvasStore.customerRelationships, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(channelsCol, canvasStore.channels, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(customerSegmentsCol, canvasStore.customerSegments, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(costStructureCol, canvasStore.costStructure, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(revenueStreamsCol, canvasStore.revenueStreams, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})

const exportToPDF = () => {
  const container = document.getElementById('element-to-pdf')
  const buttons = container ? container.querySelectorAll('button') : []

  buttons.forEach((button) => {
    button.style.visibility = 'hidden'
  })

  html2pdf(document.getElementById('element-to-pdf'), {
    margin: 0.2,
    filename: 'businessModelCanvas.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  }).then(() => {
    buttons.forEach((button) => {
      button.style.visibility = ''
    })
  })
}

const openNoteModal = (column: keyof CanvasState, item?: NoteItem) => {
  activeColumn.value = column
  itemToEdit.value = item || undefined
  isNoteModalVisible.value = true
}

const closeNoteModal = () => {
  isNoteModalVisible.value = false
}

const openInfoModal = (title: string, content: string) => {
  infoModalTitle.value = title
  infoModalContent.value = content
  isInfoModalVisible.value = true
}

const closeInfoModal = () => {
  isInfoModalVisible.value = false
}
</script>

<template>
  <main class="container animate-fade-in-up mt-10">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
      <h1 class="text-center text-xl sm:text-3xl font-bold">Business Model Canvas Online</h1>
      <button type="button" class="button gap-2" @click="exportToPDF">
        <mdicon name="download" />
        <span>Download PDF</span>
      </button>
    </div>

    <NoteModal
      :isVisible="isNoteModalVisible"
      :column="activeColumn"
      :itemToEdit="itemToEdit"
      @close="closeNoteModal"
    />
    <InfoModal
      :isVisible="isInfoModalVisible"
      :title="infoModalTitle"
      :content="infoModalContent"
      @close="closeInfoModal"
    />

    <div class="w-full flex flex-col gap-3" id="element-to-pdf">
      <CanvasRow>
        <CanvasCol
          title="Principais parceiros"
          :addButton="() => openNoteModal('partners')"
          :infoButton="
            () =>
              openInfoModal(
                'Principais parceiros',
                `
                <p>Quem são nossos parceiros chave?</p>
                <p>Quem São nossos provedores chave?</p>
                <p>Que recursos chave adquirimos de nossos parceiros?</p>
                <p>Que atividades chave realizam nossos parceiros?</p>
                `
              )
          "
        >
          <div ref="partnersCol" class="notes-wrapper">
            <Note
              v-for="item in canvasStore.partners"
              :key="item.id"
              :color="item.color"
              :id="item.id"
              :text="item.text"
              :editButton="() => openNoteModal('partners', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasDoubleCol>
          <CanvasCol
            title="Atividades principais"
            :addButton="() => openNoteModal('activities')"
            :infoButton="
              () =>
                openInfoModal(
                  'Atividades principais',
                  `
                  <p>Que atividades chave requerem nossas propostas de valor?</p>
                  <p>Nossos canais de distribuição?</p>
                  <p>Relações com clientes?</p>
                  <p>Fontes de renda?</p>
                  `
                )
            "
          >
            <div ref="activitiesCol" class="notes-wrapper">
              <Note
                v-for="item in canvasStore.activities"
                :key="item.id"
                :color="item.color"
                :id="item.id"
                :text="item.text"
                :editButton="() => openNoteModal('activities', item)"
              ></Note>
            </div>
          </CanvasCol>
          <CanvasCol
            title="Principais recursos"
            :addButton="() => openNoteModal('resources')"
            :infoButton="
              () =>
                openInfoModal(
                  'Principais recursos',
                  `
                  <p>Que recursos chave requerem nossas propostas de valor?</p>
                  <p>Nossos canais de distribuição?</p>
                  <p>Relações com clientes?</p>
                  <p>Fontes de renda?</p>
                  `
                )
            "
          >
            <div ref="resourcesCol" class="notes-wrapper">
              <Note
                v-for="item in canvasStore.resources"
                :key="item.id"
                :color="item.color"
                :id="item.id"
                :text="item.text"
                :editButton="() => openNoteModal('resources', item)"
              ></Note>
            </div>
          </CanvasCol>
        </CanvasDoubleCol>
        <CanvasCol
          title="Proposta de valor"
          :addButton="() => openNoteModal('valuePropositions')"
          :infoButton="
            () =>
              openInfoModal(
                'Proposta de valor',
                `
                <p>Que valor proporcionamos aos nossos clientes?</p>
                <p>Que problema de nossos clientes ajudamos a solucionar?</p>
                <p>Que pacotes de produtos ou serviços oferecemos a cada segmento de mercado?</p>
                <p>Que necessidade dos clientes satisfazemos?</p>
                `
              )
          "
        >
          <div ref="valuePropositionsCol" class="notes-wrapper">
            <Note
              v-for="item in canvasStore.valuePropositions"
              :key="item.id"
              :color="item.color"
              :id="item.id"
              :text="item.text"
              :editButton="() => openNoteModal('valuePropositions', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasDoubleCol>
          <CanvasCol
            title="Relacionamento com os clientes"
            :addButton="() => openNoteModal('customerRelationships')"
            :infoButton="
              () =>
                openInfoModal(
                  'Relacionamento com os clientes',
                  `
                  <p>Que tipo de relação esperam os diferentes segmentos de mercado?</p>
                  <p>Que tipo de relações temos estabelecido?</p>
                  <p>Qual é o custo destas relações?</p>
                  <p>Como estão integradas em nosso modelo de negócio?</p>
                  `
                )
            "
          >
            <div ref="customerRelationshipsCol" class="notes-wrapper">
              <Note
                v-for="item in canvasStore.customerRelationships"
                :key="item.id"
                :color="item.color"
                :id="item.id"
                :text="item.text"
                :editButton="() => openNoteModal('customerRelationships', item)"
              ></Note>
            </div>
          </CanvasCol>
          <CanvasCol
            title="Canais"
            :addButton="() => openNoteModal('channels')"
            :infoButton="
              () =>
                openInfoModal(
                  'Canais',
                  `
                  <p>Que canais preferem nossos segmentos de mercado?</p>
                  <p>Como estabelecemos atualmente o contato com os clientes?</p>
                  <p>Como se conjugam nossos canais?</p>
                  <p>Quais têm melhores resultados?</p>
                  <p>Quais são mais rentáveis?</p>
                  <p>Como se integram nas atividades diárias dos clientes?</p>
                  `
                )
            "
          >
            <div ref="channelsCol" class="notes-wrapper">
              <Note
                v-for="item in canvasStore.channels"
                :key="item.id"
                :color="item.color"
                :id="item.id"
                :text="item.text"
                :editButton="() => openNoteModal('channels', item)"
              ></Note>
            </div>
          </CanvasCol>
        </CanvasDoubleCol>
        <CanvasCol
          title="Segmentos de clientes"
          :addButton="() => openNoteModal('customerSegments')"
          :infoButton="
            () =>
              openInfoModal(
                'Segmentos de clientes',
                `
                <p>Para quem criamos valor?</p>
                <p>Quais são os nossos clientes mais importantes?</p>
                `
              )
          "
        >
          <div ref="customerSegmentsCol" class="notes-wrapper">
            <Note
              v-for="item in canvasStore.customerSegments"
              :key="item.id"
              :color="item.color"
              :id="item.id"
              :text="item.text"
              :editButton="() => openNoteModal('customerSegments', item)"
            ></Note>
          </div>
        </CanvasCol>
      </CanvasRow>
      <CanvasRow>
        <CanvasCol
          title="Estrutura de custos"
          :addButton="() => openNoteModal('costStructure')"
          :infoButton="
            () =>
              openInfoModal(
                'Estrutura de custos',
                `
                <p>Quais são os custos mais importantes inerentes ao nosso modelo de negócio?</p>
                <p>Quais são os recursos chave mais caros?</p>
                <p>Quais são as atividades chave mais caras?</p>
                `
              )
          "
        >
          <div
            ref="costStructureCol"
            class="notes-wrapper"
            :class="isMobile ? 'flex-col ' : '!flex-row !flex-wrap'"
          >
            <Note
              v-for="item in canvasStore.costStructure"
              :key="item.id"
              :color="item.color"
              :id="item.id"
              :text="item.text"
              :editButton="() => openNoteModal('costStructure', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasCol
          title="Fontes de receitas"
          :addButton="() => openNoteModal('revenueStreams')"
          :infoButton="
            () =>
              openInfoModal(
                'Fontes de receitas',
                `
                <p>Por que valor estão dispostos a pagar nossos clientes?</p>
                <p>Por que pagam atualmente?</p>
                <p>Como pagam atualmente?</p>
                <p>Como eles gostariam de pagar?</p>
                <p>Quanto geram as diferentes fontes de renda ao total da renda?</p>
                `
              )
          "
        >
          <div
            ref="revenueStreamsCol"
            class="notes-wrapper"
            :class="isMobile ? 'flex-col ' : '!flex-row !flex-wrap'"
          >
            <Note
              v-for="item in canvasStore.revenueStreams"
              :key="item.id"
              :color="item.color"
              :id="item.id"
              :text="item.text"
              :editButton="() => openNoteModal('revenueStreams', item)"
            ></Note>
          </div>
        </CanvasCol>
      </CanvasRow>
    </div>
  </main>
</template>

<style scoped>
.notes-wrapper {
  @apply flex flex-1 gap-1 w-full !min-h-[80px] flex-col;
}

.ghost {
  @apply shadow-2xl;
}
</style>
