import { createApp } from 'vue'
import store from './store/index.js'
import './style.css'
import App from './App.vue'
import { router } from './router/router.js'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
