/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-09-16 11:30:57
 * @LastEditors: liaokt
 * @LastEditTime: 2025-09-25 09:45:51
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
