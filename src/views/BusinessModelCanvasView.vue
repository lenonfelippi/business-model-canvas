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

useDraggable(partnersCol, canvasStore.partners as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(activitiesCol, canvasStore.activities as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(resourcesCol, canvasStore.resources as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(valuePropositionsCol, canvasStore.valuePropositions as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(customerRelationshipsCol, canvasStore.customerRelationships as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(channelsCol, canvasStore.channels as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(customerSegmentsCol, canvasStore.customerSegments as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(costStructureCol, canvasStore.costStructure as any, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'canvas'
})
useDraggable(revenueStreamsCol, canvasStore.revenueStreams as any, {
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
      :is-visible="isNoteModalVisible"
      :column="activeColumn"
      :item-to-edit="itemToEdit"
      @close="closeNoteModal"
    />
    <InfoModal
      :is-visible="isInfoModalVisible"
      :title="infoModalTitle"
      :content="infoModalContent"
      @close="closeInfoModal"
    />

    <div id="element-to-pdf" class="w-full flex flex-col gap-3">
      <CanvasRow>
        <CanvasCol
          title="Principais parceiros"
          :add-button="() => openNoteModal('partners')"
          :info-button="
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
              :id="item.id"
              :key="item.id"
              :color="item.color"
              :text="item.text"
              :edit-button="() => openNoteModal('partners', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasDoubleCol>
          <CanvasCol
            title="Atividades principais"
            :add-button="() => openNoteModal('activities')"
            :info-button="
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
                :id="item.id"
                :key="item.id"
                :color="item.color"
                :text="item.text"
                :edit-button="() => openNoteModal('activities', item)"
              ></Note>
            </div>
          </CanvasCol>
          <CanvasCol
            title="Principais recursos"
            :add-button="() => openNoteModal('resources')"
            :info-button="
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
                :id="item.id"
                :key="item.id"
                :color="item.color"
                :text="item.text"
                :edit-button="() => openNoteModal('resources', item)"
              ></Note>
            </div>
          </CanvasCol>
        </CanvasDoubleCol>
        <CanvasCol
          title="Proposta de valor"
          :add-button="() => openNoteModal('valuePropositions')"
          :info-button="
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
              :id="item.id"
              :key="item.id"
              :color="item.color"
              :text="item.text"
              :edit-button="() => openNoteModal('valuePropositions', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasDoubleCol>
          <CanvasCol
            title="Relacionamento com os clientes"
            :add-button="() => openNoteModal('customerRelationships')"
            :info-button="
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
                :id="item.id"
                :key="item.id"
                :color="item.color"
                :text="item.text"
                :edit-button="() => openNoteModal('customerRelationships', item)"
              ></Note>
            </div>
          </CanvasCol>
          <CanvasCol
            title="Canais"
            :add-button="() => openNoteModal('channels')"
            :info-button="
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
                :id="item.id"
                :key="item.id"
                :color="item.color"
                :text="item.text"
                :edit-button="() => openNoteModal('channels', item)"
              ></Note>
            </div>
          </CanvasCol>
        </CanvasDoubleCol>
        <CanvasCol
          title="Segmentos de clientes"
          :add-button="() => openNoteModal('customerSegments')"
          :info-button="
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
              :id="item.id"
              :key="item.id"
              :color="item.color"
              :text="item.text"
              :edit-button="() => openNoteModal('customerSegments', item)"
            ></Note>
          </div>
        </CanvasCol>
      </CanvasRow>
      <CanvasRow>
        <CanvasCol
          title="Estrutura de custos"
          :add-button="() => openNoteModal('costStructure')"
          :info-button="
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
              :id="item.id"
              :key="item.id"
              :color="item.color"
              :text="item.text"
              :edit-button="() => openNoteModal('costStructure', item)"
            ></Note>
          </div>
        </CanvasCol>
        <CanvasCol
          title="Fontes de receitas"
          :add-button="() => openNoteModal('revenueStreams')"
          :info-button="
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
              :id="item.id"
              :key="item.id"
              :color="item.color"
              :text="item.text"
              :edit-button="() => openNoteModal('revenueStreams', item)"
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
