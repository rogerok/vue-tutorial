import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Modals from '@plugins/modals/index.ts'

const app = createApp(App)

app.use(router).use(Modals)

app.mount('#app')
