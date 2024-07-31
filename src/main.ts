import App from './App.vue'
import plugins from './plugins'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { IonicVue } from '@ionic/vue'

import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'

import { SplashScreen } from '@capacitor/splash-screen'

SplashScreen.show()

const history = createWebHistory(import.meta.env.BASE_URL),
  router = createRouter({ routes, history }),
  vuetify = createVuetify(),
  pinia = createPinia(),
  app = createApp(App)

app
  .use(plugins)
  .use(IonicVue, { mode: 'md' })
  .use(vuetify)
  .use(pinia)
  .use(router)

if (import.meta.hot) handleHotUpdate(router)

router.isReady().then(() => {
  app.mount('#app')
})

setTimeout(
  () =>
    router.isReady().then(() => {
      SplashScreen.hide()
    }),
  1000
)
