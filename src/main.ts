import App from './App.vue'
import router from './router'
import plugins from './plugins'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { IonicVue } from '@ionic/vue'

const app = createApp(App)

app.use(plugins)
app.use(IonicVue, { mode: 'md' })
app.use(createVuetify())
app.use(createPinia())
app.use(router)

router.isReady().then(() => {
	app.mount('#app')
})
