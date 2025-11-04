/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-07-18 11:05:56
 * @LastEditors: liaokt
 * @LastEditTime: 2025-08-28 14:01:43
 */
import type { VNode } from 'vue'

export interface SearchConfigItem {
  type: 'input' | 'select' | 'date' | 'custom' | 'search'
  key: string
  name: string
  placeholder?: string
  width?: string | number
  style?: Record<string, any>
  isHidden?: boolean
  defaultValue?: any
  options?: Array<string | { key: string | number; value: string | number }>
  props?: Record<string, any>
  render?: (ctx: { value: any; onChange: (v: any) => void }) => any
}

// src/components/CustomTable/components/CustomTableToolbar/type.ts

export interface OperateButtonConfig {
  label: string // 按钮文本
  icon?: VNode | (() => VNode) | any // 按钮图标
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' // 按钮类型
  size?: 'small' | 'middle' | 'large' // 按钮大小
  onClick?: () => void // 点击事件
  loading?: boolean // loading 状态
  disabled?: boolean // 是否禁用
  show?: boolean // 是否显示（默认 true）
  permission?: string // 权限标识（可选，业务自用）
  danger?: boolean // 是否危险按钮（红色）
  position?: 'left' | 'right' // 按钮位置
  [key: string]: any // 其他扩展属性
}
