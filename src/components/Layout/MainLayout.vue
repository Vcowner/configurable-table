<template>
  <a-layout class="min-h-screen">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :width="240"
      :collapsed-width="80"
    >
      <!-- Logo -->
      <div :class="!collapsed ? 'logo' : 'logo justify-center'">
        <div v-if="!collapsed" class="logo-text">
          <div
            class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2"
          >
            <span class="text-white font-bold">C</span>
          </div>
          <div>
            <h2 class="text-white font-bold text-lg">配置化系统</h2>
            <span class="text-gray-300 text-xs">Vue 3 + Ant Design</span>
          </div>
        </div>
        <div v-else class="logo-icon">
          <div
            class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold">C</span>
          </div>
        </div>
      </div>

      <!-- 菜单 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        class="menu"
      >
        <template v-for="item in menuItems" :key="item.key">
          <!-- 有子菜单的情况 -->
          <a-sub-menu v-if="item.children" :key="`sub-${item.key}`">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #title>{{ item.title }}</template>
            <a-menu-item
              v-for="child in item.children"
              :key="child.key"
              @click="navigateTo(child.path!)"
            >
              <template #icon>
                <component :is="child.icon" />
              </template>
              <span>{{ child.title }}</span>
            </a-menu-item>
          </a-sub-menu>

          <!-- 没有子菜单的情况 -->
          <a-menu-item
            v-else
            :key="`item-${item.key}`"
            @click="navigateTo(item.path!)"
          >
            <template #icon>
              <component :is="item.icon" />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header class="header">
        <div class="header-content">
          <!-- 折叠按钮 -->
          <a-button type="text" @click="collapsed = !collapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer class="footer">
        <div class="text-center text-gray-500">
          Vue 3 Configurable App ©2024 Created with ❤️
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import {
  generateMenuFromRoutes,
  getMenuSelectedKeys,
  type MenuItem,
} from '@/utils/menu'

const router = useRouter()
const route = useRoute()

// 侧边栏状态
const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 动态生成菜单
const menuItems = computed(() => {
  const routes = router.getRoutes()
  return generateMenuFromRoutes(routes)
})

// 导航函数
const navigateTo = (path: string) => {
  router.push(path)
}

// 更新菜单选中状态
const updateMenuSelection = () => {
  const { selectedKeys: newSelectedKeys, openKeys: newOpenKeys } =
    getMenuSelectedKeys(route.path, menuItems.value)

  selectedKeys.value = newSelectedKeys
  openKeys.value = newOpenKeys
}

// 监听路由变化，更新选中的菜单项
watch(
  () => route.path,
  () => {
    updateMenuSelection()
  },
  { immediate: true }
)

// 组件挂载时初始化菜单状态
onMounted(() => {
  updateMenuSelection()
})
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #1f1f1f;
}

.logo-text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.logo-text h2 {
  margin: 0;
  line-height: 1.2;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu {
  border-right: none;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #f0f0f0;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.breadcrumb {
  margin-left: 16px;
  flex: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  font-size: 16px;
}

.user-menu {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
}

.content {
  background: #f5f5f5;
  min-height: calc(100vh - 64px - 70px);
}

.content-wrapper {
  padding: 24px;
  min-height: 100%;
}

.footer {
  background: #fff;
  text-align: center;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
}

/* 暗色主题 */
.dark .header {
  background: #1f1f1f;
  border-bottom-color: #303030;
}

.dark .content {
  background: #141414;
}

.dark .footer {
  background: #1f1f1f;
  border-top-color: #303030;
}

.dark .breadcrumb :deep(.ant-breadcrumb-link) {
  color: #fff;
}

.dark .breadcrumb :deep(.ant-breadcrumb-separator) {
  color: #666;
}
</style>
