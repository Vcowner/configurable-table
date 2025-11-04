/*
 * @Author: liaokt
 * @Description: 容器组件类型定义
 * @Date: 2025-10-02 17:10:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 17:15:00
 */

/** 容器组件 Props 接口 */
export interface ContainerProps {
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

/** 容器尺寸信息 */
export interface ContainerSize {
  width: number
  height: number
  padding: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

/** 容器事件 */
export interface ContainerEvents {
  resize: [size: ContainerSize]
  mount: [element: HTMLElement]
}

/** 容器配置选项 */
export interface ContainerOptions {
  /** 默认 padding 值 */
  defaultPadding: number
  /** 最小高度阈值 */
  minHeightThreshold: number
  /** 高度变化阈值 */
  heightChangeThreshold: number
  /** 防抖延迟时间 */
  debounceDelay: number
  /** 缓冲空间 */
  bufferSpace: number
}
