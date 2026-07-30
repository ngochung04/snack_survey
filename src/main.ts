import { createApp } from 'vue'
import { VueFire } from 'vuefire'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { firebaseApp } from './plugins/firebase'
import { applyStoredTheme } from './core/theme/applyTheme'
import '@vuepic/vue-datepicker/dist/main.css'
import '@mdi/font/css/materialdesignicons.css'
import './index.css'

applyStoredTheme()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp
})
app.mount('#app')

export default app
