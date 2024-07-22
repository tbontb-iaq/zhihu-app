import indexTabs from '@/views/tabs/tabs'

import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabs',
  },
  {
    path: '/tabs',
    component: () => import('@/views/tabs/index.vue'),
    children: [
      {
        path: '',
        name: 'Index Tabs',
        redirect: `/tabs/${indexTabs[0].path}`,
      },
      ...indexTabs,
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

export default router
