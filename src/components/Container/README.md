# Container 容器组件

一个通用的容器布局组件，主要用于放在 Layout 的 main 元素里面，能够自动获取布局大小、添加 padding 和设置背景色。

## 功能特性

- 🎯 **自动布局**：自动获取父容器大小，适应不同屏幕尺寸
- 📱 **响应式设计**：支持移动端和桌面端自适应
- 🎨 **灵活配置**：支持自定义 padding、背景色、高度等
- ⚡ **性能优化**：使用 ResizeObserver 监听尺寸变化
- 🔧 **TypeScript 支持**：完整的类型定义

## 基本用法

```vue
<template>
  <Container>
    <h1>页面内容</h1>
    <p>这里是页面内容...</p>
  </Container>
</template>

<script setup>
import { Container } from '@/components/Container'
</script>
```

## Props 配置

| 参数              | 类型               | 默认值      | 说明                         |
| ----------------- | ------------------ | ----------- | ---------------------------- |
| `padding`         | `number \| string` | `24`        | 内边距，支持数字(px)或字符串 |
| `minHeight`       | `number \| string` | `'auto'`    | 最小高度                     |
| `fullHeight`      | `boolean`          | `false`     | 是否全屏高度                 |
| `backgroundColor` | `string`           | `'#ffffff'` | 背景色                       |
| `responsive`      | `boolean`          | `true`      | 是否响应式调整               |
| `customClass`     | `string`           | `''`        | 自定义类名                   |

## 使用示例

### 基础用法

```vue
<Container>
  <div>基础容器</div>
</Container>
```

### 自定义配置

```vue
<Container
  :padding="32"
  :full-height="true"
  background-color="#f5f5f5"
  custom-class="my-page"
>
  <div>自定义配置的容器</div>
</Container>
```

### 响应式设计

```vue
<Container :responsive="true" :padding="24">
  <div>响应式容器</div>
</Container>
```

## 样式类名

组件会自动添加以下类名：

- `.container-wrapper` - 基础容器类
- `.full-height` - 全屏高度模式
- `.responsive` - 响应式模式

## 响应式断点

- `768px` 以下：padding 自动调整为 16px
- `480px` 以下：padding 自动调整为 12px

## 注意事项

1. 组件会自动监听窗口大小变化，无需手动处理
2. 在移动端会自动调整 padding 大小
3. 支持全屏高度模式，会自动计算可用高度（基于父容器，不会超出页面）
4. 组件卸载时会自动清理事件监听器
5. 使用 ResizeObserver 精确监听父容器尺寸变化

## 在 Layout 中使用

```vue
<!-- MainLayout.vue -->
<template>
  <a-layout>
    <!-- 侧边栏 -->
    <a-layout-sider>...</a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout>
      <a-layout-header>...</a-layout-header>

      <!-- 使用容器组件 -->
      <a-layout-content>
        <Container :padding="24" :full-height="true">
          <router-view />
        </Container>
      </a-layout-content>

      <a-layout-footer>...</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
```
