import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.sass'

// Vue アプリケーションの作成
const app = createApp(App)

// Vue Router の登録
app.use(router)

// アプリケーションをマウント
app.mount('#app')
