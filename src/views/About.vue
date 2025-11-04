<template>
  <div class="about">
    <a-layout>
      <a-layout-header>
        <div class="header-content">
          <h1 style="color: white; margin: 0">关于页面</h1>
        </div>
      </a-layout-header>

      <a-layout-content style="padding: 24px; min-height: 400px">
        <a-card title="关于这个项目">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="项目名称"
              >Vue 3 Configurable App</a-descriptions-item
            >
            <a-descriptions-item label="Vue 版本">3.5.18</a-descriptions-item>
            <a-descriptions-item label="UI 框架"
              >Ant Design Vue 4.x</a-descriptions-item
            >
            <a-descriptions-item label="构建工具">Vite 7.x</a-descriptions-item>
            <a-descriptions-item label="状态管理"
              >Pinia 3.x</a-descriptions-item
            >
            <a-descriptions-item label="路由"
              >Vue Router 4.x</a-descriptions-item
            >
            <a-descriptions-item label="类型检查"
              >TypeScript 5.x</a-descriptions-item
            >
          </a-descriptions>
        </a-card>

        <a-card title="技术栈" style="margin-top: 16px">
          <a-timeline>
            <a-timeline-item color="green">
              <template #dot>
                <a-icon type="check-circle" />
              </template>
              <h4>Vue 3 Composition API</h4>
              <p>使用最新的 Composition API 进行组件开发</p>
            </a-timeline-item>
            <a-timeline-item color="blue">
              <template #dot>
                <a-icon type="check-circle" />
              </template>
              <h4>TypeScript</h4>
              <p>完整的类型安全支持</p>
            </a-timeline-item>
            <a-timeline-item color="purple">
              <template #dot>
                <a-icon type="check-circle" />
              </template>
              <h4>Ant Design Vue</h4>
              <p>企业级 UI 设计语言和组件库</p>
            </a-timeline-item>
            <a-timeline-item color="orange">
              <template #dot>
                <a-icon type="check-circle" />
              </template>
              <h4>Vite</h4>
              <p>快速的构建工具和开发服务器</p>
            </a-timeline-item>
          </a-timeline>
        </a-card>

        <a-card title="导航" style="margin-top: 16px">
          <a-space>
            <a-button type="primary" @click="$router.push('/')">
              返回首页
            </a-button>
            <a-button @click="showModal = true"> 打开对话框 </a-button>
          </a-space>
        </a-card>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        <a-button type="link" @click="$router.push('/')">返回首页</a-button>
      </a-layout-footer>
    </a-layout>

    <a-modal
      v-model:open="showModal"
      title="示例对话框"
      @ok="showModal = false"
    >
      <p>这是一个使用 Ant Design Vue 的对话框示例。</p>
      <p>你可以在这里添加任何内容。</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style scoped>
.about {
  min-height: 100vh;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
