# useTable Hook

仿 ahooks `useAntdTable` 的 Vue 3 表格状态管理 Hook。

## 特性

- 🚀 仿 ahooks `useAntdTable` API 设计
- 📊 自动分页管理
- 🔍 搜索功能支持
- 🔄 自动刷新和重新加载
- 📱 响应式状态管理
- 🎯 TypeScript 支持

## 基本用法

```typescript
import { useTable, type Data, type Params } from '@/hooks/useTable'

// 定义数据类型
type UserData = Data & {
  list: Array<{
    id: string
    name: string
    age: number
    email: string
  }>
}

// 定义参数类型
type UserParams = Params

// 创建 API 服务
const userService = async (
  pagination: {
    current: number
    pageSize: number
    filters?: any
    sorter?: any
    extra?: any
  },
  searchParams: { [key: string]: any }
): Promise<UserData> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pagination, searchParams }),
  })
  return response.json()
}

// 使用 Hook
const {
  tableProps,
  search,
  dataSource,
  loading,
  pagination,
  selectedRowKeys,
  selectedRows,
  refresh,
  reload,
  reset,
} = useTable<UserData, UserParams>(userService, {
  defaultPageSize: 10,
  immediate: true,
})
```

## API

### useTable(service, options?)

#### 参数

- `service`: API 服务函数
  - 类型: `(pagination, searchParams) => Promise<Data>`
  - 第一个参数: 分页信息 `{ current, pageSize, filters?, sorter?, extra? }`
  - 第二个参数: 搜索参数 `{ [key: string]: any }`
  - 返回: `{ total: number, list: any[] }`

- `options`: 配置选项
  - `form?`: 表单实例
  - `defaultType?`: 默认搜索类型 `'simple' | 'advance'`
  - `defaultParams?`: 默认搜索参数
  - `defaultPageSize?`: 默认页面大小，默认 10
  - `refreshDeps?`: 刷新依赖数组
  - `immediate?`: 是否立即请求，默认 true

#### 返回值

- `tableProps`: 表格属性
  - `dataSource`: 数据源
  - `loading`: 加载状态
  - `onChange`: 表格变化回调
  - `pagination`: 分页配置

- `search`: 搜索功能
  - `type`: 搜索类型
  - `changeType()`: 切换搜索类型
  - `submit()`: 提交搜索
  - `reset()`: 重置搜索

- `dataSource`: 数据源
- `loading`: 加载状态
- `pagination`: 分页状态
- `selectedRowKeys`: 选中的行键
- `selectedRows`: 选中的行数据
- `refresh()`: 刷新数据
- `reload()`: 重新加载数据
- `reset()`: 重置所有状态

## 在组件中使用

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <div class="search-form">
      <a-input v-model:value="searchParams.name" placeholder="姓名" />
      <a-button @click="search.submit">搜索</a-button>
      <a-button @click="search.reset">重置</a-button>
    </div>

    <!-- 表格 -->
    <a-table v-bind="tableProps">
      <template #columns>
        <a-table-column title="姓名" dataIndex="name" />
        <a-table-column title="年龄" dataIndex="age" />
        <a-table-column title="邮箱" dataIndex="email" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { useTable, type Data, type Params } from '@/hooks/useTable'

const { tableProps, search, searchParams } = useTable(apiService, {
  defaultPageSize: 20,
  immediate: true,
})
</script>
```

## 类型定义

```typescript
// 数据类型
export type Data = {
  total: number
  list: any[]
}

// 参数类型
export type Params = [
  {
    current: number
    pageSize: number
    filters?: any
    sorter?: any
    extra?: any
  },
  { [key: string]: any },
]
```

## 注意事项

1. 确保 API 服务返回的数据格式符合 `Data` 类型
2. 分页参数会自动管理，无需手动处理
3. 搜索参数变化时会自动触发请求
4. 支持依赖数组自动刷新
5. 所有状态都是响应式的
