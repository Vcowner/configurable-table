<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard">
    <!-- 欢迎卡片 -->
    <a-card class="welcome-card" :bordered="false">
      <div class="welcome-content">
        <div class="welcome-text">
          <h1 class="welcome-title">欢迎使用配置化系统</h1>
          <p class="welcome-subtitle">{{ message }}</p>
          <div class="welcome-actions">
            <a-button
              type="primary"
              size="large"
              @click="message = '欢迎使用配置化系统！'"
            >
              开始使用
            </a-button>
            <a-button size="large" @click="$router.push('/table-generator')">
              表格生成器
            </a-button>
          </div>
        </div>
        <div class="welcome-illustration">
          <div class="illustration-box">
            <div class="box-item box-1"></div>
            <div class="box-item box-2"></div>
            <div class="box-item box-3"></div>
          </div>
        </div>
      </div>
    </a-card>

    <!-- 功能卡片网格 -->
    <a-row :gutter="[24, 24]" class="feature-grid">
      <!-- 功能特性 -->
      <a-col :xs="24" :sm="12" :lg="8">
        <a-card title="功能特性" class="feature-card">
          <a-list :data-source="features" size="small">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar size="small" style="background-color: #1890ff">
                      <CheckOutlined />
                    </a-avatar>
                  </template>
                  <template #title>{{ item }}</template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <!-- 快速开始 -->
      <a-col :xs="24" :sm="12" :lg="8">
        <a-card title="快速开始" class="feature-card">
          <a-steps direction="vertical" size="small">
            <a-step
              v-for="(step, index) in steps"
              :key="index"
              :title="step.title"
              :description="step.description"
            />
          </a-steps>
        </a-card>
      </a-col>

      <!-- 统计信息 -->
      <a-col :xs="24" :sm="12" :lg="8">
        <a-card title="系统统计" class="feature-card">
          <a-statistic-group>
            <a-statistic title="表格配置" :value="12" />
            <a-statistic title="表单配置" :value="8" />
            <a-statistic title="图表配置" :value="5" />
          </a-statistic-group>
        </a-card>
      </a-col>
    </a-row>

    <!-- 最近活动 -->
    <a-card title="最近活动" class="activity-card">
      <a-timeline>
        <a-timeline-item color="green">
          <template #dot>
            <PlusOutlined />
          </template>
          <h4>创建了新的表格配置</h4>
          <p>用户管理表格 - 2小时前</p>
        </a-timeline-item>
        <a-timeline-item color="blue">
          <template #dot>
            <EditOutlined />
          </template>
          <h4>更新了表单配置</h4>
          <p>登录表单 - 4小时前</p>
        </a-timeline-item>
        <a-timeline-item color="orange">
          <template #dot>
            <BarChartOutlined />
          </template>
          <h4>生成了新的图表</h4>
          <p>销售数据图表 - 1天前</p>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CheckOutlined,
  PlusOutlined,
  EditOutlined,
  BarChartOutlined,
} from '@ant-design/icons-vue'

const message = ref('Hello Ant Design Vue + Tailwind CSS!')

const features = [
  'Vue 3.5.18',
  'TypeScript 支持',
  'Ant Design Vue 4.x',
  'Tailwind CSS 4.x',
  'Vue Router 4.x',
  'Pinia 状态管理',
  'Vite 构建工具',
  '可配置表格生成器',
  '响应式设计',
]

const steps = [
  { title: '安装依赖', description: 'pnpm install' },
  { title: '启动开发服务器', description: 'pnpm dev' },
  { title: '开始开发', description: '编辑 src/views/Home.vue' },
]
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.welcome-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
}

.welcome-text {
  flex: 1;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: white;
}

.welcome-subtitle {
  font-size: 1.2rem;
  margin: 0 0 24px 0;
  color: rgba(255, 255, 255, 0.9);
}

.welcome-actions {
  display: flex;
  gap: 16px;
}

.welcome-illustration {
  flex: 0 0 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-box {
  position: relative;
  width: 120px;
  height: 120px;
}

.box-item {
  position: absolute;
  border-radius: 8px;
  opacity: 0.8;
}

.box-1 {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
  top: 0;
  left: 0;
  animation: float 3s ease-in-out infinite;
}

.box-2 {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  top: 20px;
  right: 0;
  animation: float 3s ease-in-out infinite 1s;
}

.box-3 {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.25);
  bottom: 0;
  left: 30px;
  animation: float 3s ease-in-out infinite 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-grid {
  margin-bottom: 24px;
}

.feature-card {
  height: 100%;
}

.activity-card {
  margin-bottom: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
  }

  .welcome-illustration {
    margin-top: 24px;
  }

  .welcome-actions {
    justify-content: center;
  }
}
</style>
