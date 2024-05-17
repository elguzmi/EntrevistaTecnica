import './assets/main.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'material-icons/iconfont/material-icons.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  unstyled: false,
  ripple: true
})

app.mount('#app')
