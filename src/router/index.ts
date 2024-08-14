import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BusinessModelCanvasView from '../views/BusinessModelCanvasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/business-model-canvas',
      name: 'business-model-canvas',
      component: BusinessModelCanvasView
    }
  ]
})

// router.beforeEach((to, from) => {
//   document.title = to.meta?.title ?? 'Business Model Canvas Online'
// })

export default router
