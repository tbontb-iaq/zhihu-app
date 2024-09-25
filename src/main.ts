import '@styles/layers.scss'
import '@styles/main.scss'

import App from './App.vue'
import plugins from './plugins'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { IonicVue } from '@ionic/vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'

const history = createWebHistory(import.meta.env.BASE_URL),
  router = createRouter({ routes, history }),
  vuetify = createVuetify(),
  pinia = createPinia(),
  app = createApp(App)

app
  .use(IonicVue, { mode: 'md' })
  .use(vuetify)
  .use(pinia)
  .use(DataLoaderPlugin, { router })
  .use(router)
  .use(plugins)

if (import.meta.hot) handleHotUpdate(router)

router.isReady().then(() => {
  app.mount('#app')
})
