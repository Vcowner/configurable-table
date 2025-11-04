<!--
 * @Author: liaokt
 * @Description: useSize Hook 使用示例
 * @Date: 2025-10-02 21:00:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 20:46:01
-->
<template>
  <div class="size-demo">
    <h2>useSize Hook 使用示例</h2>

    <!-- 示例1: 监听容器尺寸 -->
    <div class="demo-section">
      <h3>1. 监听容器尺寸变化</h3>
      <div ref="containerRef" class="resizable-container">
        <p>
          当前容器尺寸: {{ containerSize.width }} x {{ containerSize.height }}
        </p>
        <p>拖拽右下角调整容器大小</p>
      </div>
    </div>

    <!-- 示例2: 监听窗口尺寸 -->
    <div class="demo-section">
      <h3>2. 监听窗口尺寸变化</h3>
      <div class="window-size-info">
        <p>当前窗口尺寸: {{ windowSize.width }} x {{ windowSize.height }}</p>
        <p>调整浏览器窗口大小查看变化</p>
      </div>
    </div>

    <!-- 示例3: 监听表格尺寸 -->
    <div class="demo-section">
      <h3>3. 监听表格尺寸变化</h3>
      <div ref="tableContainerRef" class="table-container">
        <p>表格容器尺寸: {{ tableSize.width }} x {{ tableSize.height }}</p>
        <div class="mock-table">
          <div class="table-header">表格头部</div>
          <div class="table-body">
            <div class="table-row" v-for="i in 5" :key="i">
              行 {{ i }} - 表格内容
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例4: 动态调整内容 -->
    <div class="demo-section">
      <h3>4. 根据尺寸动态调整内容</h3>
      <div ref="dynamicRef" class="dynamic-content">
        <div class="content-info">
          <p>容器尺寸: {{ dynamicSize.width }} x {{ dynamicSize.height }}</p>
          <p>内容模式: {{ contentMode }}</p>
        </div>
        <div class="content-area" :class="contentMode">
          <div v-if="contentMode === 'compact'" class="compact-layout">
            <div class="item" v-for="i in 3" :key="i">紧凑模式 {{ i }}</div>
          </div>
          <div v-else class="normal-layout">
            <div class="item" v-for="i in 6" :key="i">正常模式 {{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSize, useWindowSize } from '@/hooks/useSize'

// 示例1: 监听容器尺寸
const containerRef = ref<HTMLElement | null>(null)
const containerSize = useSize(containerRef)

// 示例2: 监听窗口尺寸
const windowSize = useWindowSize()

// 示例3: 监听表格容器尺寸
const tableContainerRef = ref<HTMLElement | null>(null)
const tableSize = useSize(tableContainerRef)

// 示例4: 根据尺寸动态调整内容
const dynamicRef = ref<HTMLElement | null>(null)
const dynamicSize = useSize(dynamicRef)

// 根据容器宽度决定内容模式
const contentMode = computed(() => {
  return dynamicSize.value.width < 400 ? 'compact' : 'normal'
})
</script>

<style scoped>
.size-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.demo-section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 8px;
}

/* 示例1: 可调整大小的容器 */
.resizable-container {
  width: 300px;
  height: 200px;
  border: 2px dashed #1890ff;
  padding: 20px;
  background: #f0f8ff;
  resize: both;
  overflow: auto;
  border-radius: 4px;
}

.resizable-container p {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
}

/* 示例2: 窗口尺寸信息 */
.window-size-info {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.window-size-info p {
  margin: 8px 0;
  font-size: 16px;
  color: #333;
}

/* 示例3: 表格容器 */
.table-container {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.mock-table {
  width: 100%;
}

.table-header {
  background: #fafafa;
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #d9d9d9;
}

.table-body {
  background: white;
}

.table-row {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f5f5f5;
}

/* 示例4: 动态内容 */
.dynamic-content {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 20px;
  background: white;
}

.content-info {
  margin-bottom: 20px;
  padding: 12px;
  background: #f0f8ff;
  border-radius: 4px;
}

.content-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
}

.content-area {
  min-height: 100px;
}

.compact-layout {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.normal-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.item {
  padding: 12px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.compact-layout .item {
  background: #fff2e8;
  border-color: #ffbb96;
}
</style>
