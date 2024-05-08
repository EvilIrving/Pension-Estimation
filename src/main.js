import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/windIndex.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

// 全局注册ElementPlusIconsVue组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())

app.mount('#app')
