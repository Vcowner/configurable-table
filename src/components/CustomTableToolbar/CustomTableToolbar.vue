<script setup lang="tsx">
/**
 * CustomTableToolbar 组件
 *
 * 功能说明：
 * 1. 提供可配置的搜索表单（支持基础搜索和高级搜索）
 * 2. 提供可配置的操作按钮（支持左右两侧布局）
 * 3. 支持多种表单控件类型（input、select、date、custom等）
 * 4. 自动处理表单验证和数据收集
 * 5. 支持表单重置和搜索事件
 *
 * 使用场景：
 * - 表格页面的搜索和操作工具栏
 * - 需要动态配置搜索条件的场景
 * - 需要灵活布局操作按钮的场景
 */

import { computed, h, reactive, ref, watch } from 'vue'
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons-vue'
import type { PropType } from 'vue'
import type { OperateButtonConfig, SearchConfigItem } from './type'
import styles from './CustomTableToolbar.module.scss'

// ==================== Props 定义 ====================
const props = defineProps({
  /** 搜索配置列表 */
  searchList: {
    type: Array as PropType<SearchConfigItem[]>,
    default: () => [],
  },
  /** 操作按钮配置列表 */
  operateList: {
    type: Array as PropType<OperateButtonConfig[]>,
    default: () => [],
  },
})

// ==================== Events 定义 ====================
const emit = defineEmits<{
  /** 搜索事件 - 触发搜索时发出 */
  (e: 'search', payload: Record<string, any>, reset?: boolean): void
  /** 重置事件 - 触发重置时发出 */
  (e: 'reset', payload: any): void
}>()

// ==================== 响应式数据 ====================
/** 搜索表单数据 */
const searchValues = reactive<Record<string, any>>({})
/** 是否显示高级搜索区域 */
const showAdvanced = ref(false)
/** 表单引用 */
const formRef = ref<any>(null)

// ==================== 计算属性 ====================
/** 基础搜索列表 - 显示在主要搜索区域的表单项 */
const commonSearchList = computed(() =>
  props.searchList.filter(i => !i.isHidden)
)

/** 高级搜索列表 - 显示在折叠区域的表单项 */
const advancedSearchList = computed(() =>
  props.searchList.filter(i => i.isHidden)
)

/** 是否有高级搜索项 */
const hasAdvanced = computed(() => advancedSearchList.value.length > 0)

/** 左侧操作按钮列表 */
const leftOperateList = computed(() =>
  props.operateList.filter(
    action => !action.position || action.position === 'left'
  )
)

/** 右侧操作按钮列表 */
const rightOperateList = computed(() =>
  props.operateList.filter(action => action.position === 'right')
)

// ==================== 工具函数 ====================
/**
 * 获取按钮属性 - 过滤掉 icon 和 label 属性，返回其他按钮属性
 * @param action 按钮配置对象
 * @returns 过滤后的按钮属性
 */
const getButtonProps = (action: OperateButtonConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, label, ...buttonProps } = action
  return buttonProps
}

// ==================== 监听器 ====================
/**
 * 监听搜索配置变化，初始化搜索表单数据
 * 当 searchList 变化时，自动为每个搜索项设置默认值
 */
watch(
  () => props.searchList,
  val => {
    val.forEach(item => {
      if (item.key && !(item.key in searchValues))
        searchValues[item.key] = item.defaultValue ?? undefined
    })
  },
  { immediate: true, deep: true }
)

// ==================== 事件处理函数 ====================
/**
 * 处理重置操作
 * 1. 重置表单字段
 * 2. 清空搜索数据
 * 3. 触发重置事件
 */
function handleReset() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.keys(searchValues).forEach(key => delete searchValues[key])
  emit('reset', {})
}

/**
 * 处理搜索操作
 * 1. 获取表单数据
 * 2. 过滤掉空值属性
 * 3. 触发搜索事件
 */
function handleSearch() {
  const values = formRef.value?.getFieldsValue() || {}
  // 过滤掉空值属性
  const filteredValues = Object.fromEntries(
    Object.entries(values).filter(([, value]) => {
      return value !== undefined && value !== null && value !== ''
    })
  )
  emit('search', filteredValues)
}

// ==================== 渲染函数 ====================
/**
 * 获取表单项样式
 * @param item 搜索配置项
 * @returns 样式对象
 */
function getItemStyle(item: SearchConfigItem) {
  return {
    ...item.style,
    width: item.width ? `${item.width}px` : '100%',
  }
}

/**
 * 渲染表单控件
 * 根据不同的类型渲染对应的表单控件
 * @param item 搜索配置项
 * @returns JSX 元素
 */
function renderFormItem(item: SearchConfigItem) {
  switch (item.type) {
    case 'input':
      return (
        <a-input
          v-model={[searchValues[item.key], 'value']}
          placeholder={item.placeholder}
          allowClear={true}
          style={getItemStyle(item)}
          {...item.props}
        >
          {item.props?.slots?.prefix && {
            prefix: () => <component is={item.props?.slots.prefix} />,
          }}
        </a-input>
      )
    case 'search':
      return (
        <a-input
          v-model={[searchValues[item.key], 'value']}
          placeholder={item.placeholder}
          allowClear={true}
          style={getItemStyle(item)}
          {...item.props}
        >
          {{
            prefix: () => <SearchOutlined class="text-[#bfbfbf]" />,
          }}
        </a-input>
      )
    case 'select':
      return (
        <a-select
          v-model={[searchValues[item.key], 'value']}
          placeholder={item.placeholder}
          allowClear={true}
          style={getItemStyle(item)}
          {...item.props}
        >
          {item.options?.map(opt => (
            <a-select-option
              value={typeof opt === 'string' ? opt : opt.key}
              key={typeof opt === 'string' ? opt : opt.key}
            >
              {typeof opt === 'string' ? opt : opt.value}
            </a-select-option>
          ))}
        </a-select>
      )
    case 'date':
      return (
        <a-date-picker
          v-model={[searchValues[item.key], 'value']}
          placeholder={item.placeholder}
          style={{ width: '100%' }}
          {...item.props}
        />
      )
    case 'custom':
      if (typeof item.render === 'function') {
        return (
          <component
            is={item.render({
              value: searchValues[item.key],
              onChange: v => (searchValues[item.key] = v),
              ...item,
            })}
          />
        )
      }
      return null
    default:
      return null
  }
}
</script>

<template>
  <div :class="styles['table-toolbar']">
    <!-- 基础搜索区域：显示常用搜索项 -->
    <div v-if="searchList.length" :class="styles['toolbar-search-row']">
      <a-form
        ref="formRef"
        :model="searchValues"
        layout="inline"
        :class="styles['search-form']"
      >
        <template v-for="item in commonSearchList" :key="item.key">
          <a-form-item :name="item.key" :class="styles['search-form-item']">
            <component :is="renderFormItem(item)" />
          </a-form-item>
        </template>

        <a-form-item v-if="hasAdvanced" :class="styles['search-form-item']">
          <a-button type="link" @click="showAdvanced = !showAdvanced">
            {{ showAdvanced ? '收起' : '展开' }}
            <DownOutlined v-if="!showAdvanced" />
            <UpOutlined v-else />
          </a-button>
        </a-form-item>

        <a-form-item :class="styles['search-form-item']">
          <a-button
            type="primary"
            :icon="h(SearchOutlined)"
            @click="handleSearch"
          >
            查询
          </a-button>
        </a-form-item>
        <a-form-item :class="styles['search-form-item']">
          <a-button @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 高级搜索区域：折叠显示的高级搜索项 -->
    <div
      v-if="showAdvanced && hasAdvanced"
      :class="styles['toolbar-advanced-row']"
    >
      <a-form
        ref="formRef"
        :model="searchValues"
        :class="styles['advanced-form']"
      >
        <a-row :gutter="24" :class="styles['advanced-row']">
          <a-col v-for="item in advancedSearchList" :key="item.key" :span="12">
            <a-form-item
              :label="item.name"
              :name="item.key"
              :class="styles['advanced-form-item']"
            >
              <component :is="renderFormItem(item)" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域：左右两侧布局 -->
    <div :class="styles['toolbar-action-row']">
      <!-- 左侧操作按钮组 -->
      <div>
        <template v-for="action in leftOperateList" :key="action.label">
          <a-button
            v-if="action.show !== false"
            v-bind="getButtonProps(action)"
            @click="action.onClick"
          >
            <component :is="action.icon" v-if="action.icon" />
            {{ action.label }}
          </a-button>
        </template>
      </div>

      <!-- 右侧操作按钮组 -->
      <div>
        <template v-for="action in rightOperateList" :key="action.label">
          <a-button
            v-if="action.show !== false"
            v-bind="getButtonProps(action)"
            @click="action.onClick"
          >
            <component :is="action.icon" v-if="action.icon" />
            {{ action.label }}
          </a-button>
        </template>
      </div>
    </div>
  </div>
</template>
