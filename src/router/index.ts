/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-09-16 11:30:57
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 16:55:08
 */
import { createRouter, createWebHistory } from 'vue-router'
import componentsRouter from './components'
import Home from '../views/Home.vue'
import {
  DashboardOutlined,
  TableOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '仪表盘',
        icon: DashboardOutlined,
        showInMenu: true,
        order: 1,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: '关于',
        icon: InfoCircleOutlined,
        showInMenu: true,
        order: 3,
      },
    },
    {
      path: '/table-generator',
      name: 'tableGenerator',
      component: () => import('../views/TableGenerator.vue'),
      meta: {
        title: '表格生成器',
        icon: TableOutlined,
        showInMenu: true,
        order: 2,
      },
    },
    ...componentsRouter,
  ],
})

export default router
