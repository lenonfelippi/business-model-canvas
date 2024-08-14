import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenSize() {
  const isMobile = ref(window.innerWidth < 640)

  const updateSize = () => {
    isMobile.value = window.innerWidth < 640
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  return { isMobile }
}
