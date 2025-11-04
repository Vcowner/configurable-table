# useTable Hook 集成到 TableGenerator.vue

## 集成效果

成功将 `useTable` hook 集成到 `TableGenerator.vue` 中，实现了以下功能：

### ✅ 已实现的功能

1. **数据管理**
   - 使用 `useTable` hook 管理表格数据状态
   - 支持分页、加载状态、行选择等核心功能
   - 模拟 API 服务提供真实的数据交互体验

2. **搜索功能**
   - 添加了搜索输入框和操作按钮
   - 支持关键词搜索（姓名、邮箱）
   - 搜索参数通过 `searchFormatter` 格式化

3. **实时预览**
   - 表格配置变化时自动重新加载数据
   - 支持实时预览表格效果
   - 保持配置和预览的同步

4. **操作功能**
   - 刷新按钮：手动刷新数据
   - 重置按钮：清空搜索条件
   - 搜索按钮：执行搜索操作

### 🔧 技术实现

#### 1. Hook 集成

```typescript
const {
  dataSource: tableData,
  loading,
  pagination,
  selectedRowKeys,
  selectedRows,
  search,
  refresh,
  reload,
  reset,
} = useTable(mockService, {
  defaultPageSize: 10,
  manual: false,
  searchFormatter: params => ({
    ...params,
    keyword: searchKeyword.value,
  }),
})
```

#### 2. Mock 服务

现在使用独立的 mock 服务文件：

```typescript
// src/mock/tableService.ts
export const mockTableService = async (pagination: any, searchParams: any) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 生成模拟数据
  const mockData = Array.from({ length: 100 }, (_, index) => ({
    id: `${index + 1}`,
    name: `用户${index + 1}`,
    age: 20 + (index % 30),
    email: `user${index + 1}@example.com`,
    status: index % 3,
    createTime: new Date(
      Date.now() - Math.random() * 10000000000
    ).toISOString(),
    department: ['技术部', '产品部', '运营部', '市场部'][index % 4],
  }))

  // 搜索过滤
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(
      item =>
        item.name.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(searchParams.keyword.toLowerCase())
    )
  }

  // 分页处理
  const { current, pageSize } = pagination
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    list: filteredData.slice(start, end),
    total: filteredData.length,
  }
}
```

在组件中使用：

```typescript
import { mockTableService } from '@/mock'

const { dataSource, loading, pagination } = useTable(mockTableService, {
  defaultPageSize: 10,
  manual: false,
})
```

#### 3. 配置计算属性

```typescript
// 分页配置
const paginationConfig = computed(() => ({
  current: pagination.value.current,
  pageSize: pagination.value.pageSize,
  total: pagination.value.total,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) => `共 ${total} 条`,
}))

// 行选择配置
const rowSelectionConfig = computed(() => ({
  type: 'checkbox',
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[], rows: any[]) => {
    selectedRowKeys.value = keys
    selectedRows.value = rows
  },
}))
```

#### 4. 事件处理

```typescript
// 分页变化处理
const handlePaginationChange = (paginationParams: {
  current: number
  pageSize: number
}) => {
  pagination.value.current = paginationParams.current
  pagination.value.pageSize = paginationParams.pageSize
  refresh()
}

// 选中变化处理
const handleSelectionChange = (
  selectedRowKeysParam: string[],
  selectedRowsParam: any[]
) => {
  selectedRowKeys.value = selectedRowKeysParam
  selectedRows.value = selectedRowsParam
}
```

### 🎯 使用效果

1. **表格生成器**现在具有完整的数据交互功能
2. **实时预览**可以展示真实的表格行为
3. **搜索功能**让用户可以测试表格的搜索能力
4. **分页功能**提供完整的分页体验
5. **行选择**支持多选和单选操作

### 🚀 优势

1. **代码复用**：`useTable` hook 可以在其他组件中重复使用
2. **状态管理**：统一管理表格的所有状态
3. **类型安全**：完整的 TypeScript 支持
4. **易于维护**：逻辑清晰，职责分离
5. **功能完整**：支持表格的所有核心功能

这个集成展示了 `useTable` hook 在实际项目中的强大能力，为表格生成器提供了专业级的数据管理功能！
