import { createRouter, createWebHistory } from 'vue-router'
import mainView from '@/views/mainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: mainView,
    }
  ],
})

export default router
