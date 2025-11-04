<!--
 * @Author: liaokt
 * @Description: 容器布局组件 - 用于 Layout 的 main 元素内部
 * @Date: 2025-10-02 17:10:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 21:29:13
-->
<template>
  <div ref="containerRef" :class="containerClass" :style="containerStyle">
    <div class="p-2!">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

interface Props {
  /** 内边距配置 */
  padding?: number | string
  /** 最小高度 */
  minHeight?: number | string
  /** 是否全屏高度 */
  fullHeight?: boolean
  /** 背景色 */
  backgroundColor?: string
  /** 是否响应式调整 */
  responsive?: boolean
  /** 自定义类名 */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: 12,
  minHeight: 'auto',
  fullHeight: false,
  backgroundColor: '#ffffff',
  responsive: true,
  customClass: '',
})

// 响应式状态
const containerRef = ref<HTMLElement>()
const containerHeight = ref<number>(0)
const isCalculating = ref<boolean>(false)
const resizeTimeout = ref<number>()

// 计算容器样式
const containerStyle = computed(() => {
  const style: Record<string, any> = {
    backgroundColor: props.backgroundColor,
    padding:
      typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
  }

  if (props.fullHeight && containerHeight.value > 0) {
    style.minHeight = `${containerHeight.value}px`
  } else if (props.minHeight !== 'auto') {
    style.minHeight =
      typeof props.minHeight === 'number'
        ? `${props.minHeight}px`
        : props.minHeight
  }

  return style
})

// 计算容器类名
const containerClass = computed(() => {
  const classes = ['container-wrapper']

  if (props.customClass) classes.push(props.customClass)
  if (props.fullHeight) classes.push('full-height')
  if (props.responsive) classes.push('responsive')

  return classes.join(' ')
})

// 解析 padding 值
const parsePadding = (padding: number | string): number => {
  return typeof padding === 'number' ? padding : parseInt(padding) || 24
}

// 计算容器高度
const calculateHeight = () => {
  if (!containerRef.value || !props.fullHeight || isCalculating.value) return

  isCalculating.value = true

  try {
    const parentElement = containerRef.value.parentElement
    const paddingValue = parsePadding(props.padding)

    let newHeight: number

    if (parentElement) {
      const parentHeight = parentElement.offsetHeight
      // 计算可用高度：父容器高度 - padding - 缓冲空间
      const availableHeight = parentHeight - paddingValue * 2 - 24
      newHeight = Math.max(availableHeight, 300)
    } else {
      // 使用视口高度作为备选
      newHeight = window.innerHeight - 300
    }

    // 只有高度变化超过阈值时才更新
    if (Math.abs(newHeight - containerHeight.value) > 10) {
      containerHeight.value = newHeight
    }
  } finally {
    // 确保计算状态被重置
    nextTick(() => {
      isCalculating.value = false
    })
  }
}

// 防抖的高度计算
const debouncedCalculateHeight = () => {
  clearTimeout(resizeTimeout.value)
  resizeTimeout.value = setTimeout(() => {
    nextTick(calculateHeight)
  }, 100)
}

// 初始化高度监听
const initHeightObserver = () => {
  if (!props.responsive && !props.fullHeight) return

  window.addEventListener('resize', debouncedCalculateHeight)

  // 清理函数
  const cleanup = () => {
    window.removeEventListener('resize', debouncedCalculateHeight)
    if (resizeTimeout.value) {
      clearTimeout(resizeTimeout.value)
    }
  }

  onUnmounted(cleanup)
}

// 组件挂载时初始化
onMounted(() => {
  nextTick(() => {
    calculateHeight()
    initHeightObserver()
  })
})
</script>

<style scoped>
.container-wrapper {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow-x: auto;
  overflow-y: visible;
}

.container-wrapper.responsive {
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container-wrapper {
    padding: 16px !important;
  }
}

@media (max-width: 480px) {
  .container-wrapper {
    padding: 12px !important;
  }
}
</style>
