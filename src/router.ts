import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

if (import.meta.hot) handleHotUpdate(router)

export default router
