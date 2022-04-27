import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'

export function createApp() {
    const app = createSSRApp(App)
    app.use(createPinia()).use(Vant)
    return {
        app,
    }
}
