<!--
 * @Author: liaokt
 * @Description: useSize Hook 测试页面
 * @Date: 2025-10-02 21:00:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 21:00:00
-->
<template>
  <Container :padding="12" :full-height="true">
    <div class="use-size-test">
      <h2>useSize Hook 测试</h2>

      <!-- 测试容器 -->
      <div ref="testContainer" class="test-container">
        <div class="size-display">
          <h3>容器尺寸监听</h3>
          <p>宽度: {{ size.width }}px</p>
          <p>高度: {{ size.height }}px</p>
          <p>宽高比: {{ aspectRatio }}</p>
        </div>

        <div class="controls">
          <button @click="toggleResize">切换可调整大小</button>
          <button @click="randomSize">随机尺寸</button>
        </div>
      </div>

      <!-- 窗口尺寸显示 -->
      <div class="window-info">
        <h3>窗口尺寸</h3>
        <p>窗口宽度: {{ windowSize.width }}px</p>
        <p>窗口高度: {{ windowSize.height }}px</p>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Container } from '@/components/Container'
import { useSize, useWindowSize } from '@/hooks/useSize'

// 测试容器引用
const testContainer = ref<HTMLElement | null>(null)

// 使用 useSize hook
const size = useSize(testContainer, {
  immediate: true,
  listenWindowResize: false,
})

// 使用 useWindowSize hook
const windowSize = useWindowSize()

// 计算宽高比
const aspectRatio = computed(() => {
  if (size.value.height === 0) return 0
  return (size.value.width / size.value.height).toFixed(2)
})

// 切换可调整大小
const toggleResize = () => {
  if (testContainer.value) {
    const currentResize = testContainer.value.style.resize
    testContainer.value.style.resize =
      currentResize === 'both' ? 'none' : 'both'
  }
}

// 随机尺寸
const randomSize = () => {
  if (testContainer.value) {
    const width = Math.floor(Math.random() * 400) + 200
    const height = Math.floor(Math.random() * 300) + 150
    testContainer.value.style.width = `${width}px`
    testContainer.value.style.height = `${height}px`
  }
}
</script>

<style scoped>
.use-size-test {
  max-width: 800px;
  margin: 0 auto;
}

.test-container {
  width: 400px;
  height: 300px;
  border: 2px solid #1890ff;
  border-radius: 8px;
  padding: 20px;
  background: #f0f8ff;
  resize: both;
  overflow: auto;
  margin-bottom: 20px;
}

.size-display {
  margin-bottom: 20px;
}

.size-display h3 {
  margin-top: 0;
  color: #1890ff;
}

.size-display p {
  margin: 8px 0;
  font-size: 16px;
  color: #333;
}

.controls {
  display: flex;
  gap: 12px;
}

.controls button {
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #40a9ff;
}

.window-info {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}

.window-info h3 {
  margin-top: 0;
  color: #333;
}

.window-info p {
  margin: 8px 0;
  font-size: 16px;
  color: #666;
}
</style>
