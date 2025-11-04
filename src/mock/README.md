# Mock 服务

这个目录包含了各种表格的模拟数据服务，用于开发和测试。

## 文件结构

```
src/mock/
├── index.ts           # 统一导出文件
├── tableService.ts    # 表格数据模拟服务
└── README.md         # 说明文档
```

## 可用的 Mock 服务

### 1. mockTableService

基础的表格数据服务，提供通用的用户数据。

**数据字段：**

- `id`: 用户ID
- `name`: 用户姓名
- `age`: 年龄
- `email`: 邮箱
- `status`: 状态 (0-2)
- `createTime`: 创建时间
- `department`: 部门

**搜索支持：**

- 按姓名搜索
- 按邮箱搜索

### 2. mockUserTableService

用户管理表格数据服务，提供更丰富的用户信息。

**数据字段：**

- `id`: 用户ID
- `username`: 用户名
- `realName`: 真实姓名
- `email`: 邮箱
- `phone`: 手机号
- `status`: 状态 (0-3)
- `role`: 角色
- `department`: 部门
- `createTime`: 创建时间
- `lastLoginTime`: 最后登录时间

**搜索支持：**

- 按用户名搜索
- 按真实姓名搜索
- 按邮箱搜索
- 按状态筛选
- 按角色筛选
- 按部门筛选

### 3. mockOrderTableService

订单管理表格数据服务。

**数据字段：**

- `id`: 订单ID
- `orderNo`: 订单号
- `customerName`: 客户姓名
- `productName`: 产品名称
- `amount`: 金额
- `status`: 状态 (0-4)
- `paymentMethod`: 支付方式
- `createTime`: 创建时间
- `deliveryTime`: 发货时间

**搜索支持：**

- 按订单号搜索
- 按客户姓名搜索
- 按产品名称搜索
- 按状态筛选
- 按支付方式筛选

### 4. mockProductTableService

产品管理表格数据服务。

**数据字段：**

- `id`: 产品ID
- `name`: 产品名称
- `category`: 分类
- `price`: 价格
- `stock`: 库存
- `status`: 状态 (0-2)
- `description`: 描述
- `createTime`: 创建时间
- `updateTime`: 更新时间

**搜索支持：**

- 按产品名称搜索
- 按分类搜索
- 按描述搜索
- 按分类筛选
- 按状态筛选

## 使用方法

### 基础用法

```typescript
import { useTable } from '@/hooks/useTable'
import { mockTableService } from '@/mock'

const { dataSource, loading, pagination, search, refresh } = useTable(
  mockTableService,
  {
    defaultPageSize: 10,
    manual: false,
  }
)
```

### 带搜索的用法

```typescript
import { useTable } from '@/hooks/useTable'
import { mockUserTableService } from '@/mock'

const { dataSource, loading, pagination, search, refresh } = useTable(
  mockUserTableService,
  {
    defaultPageSize: 20,
    manual: false,
    searchFormatter: params => ({
      ...params,
      keyword: searchKeyword.value,
      status: statusFilter.value,
      role: roleFilter.value,
    }),
  }
)
```

### 在组件中使用

```vue
<template>
  <div>
    <a-table
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { useTable } from '@/hooks/useTable'
import { mockOrderTableService } from '@/mock'

const { dataSource, loading, pagination } = useTable(mockOrderTableService)
</script>
```

## 自定义 Mock 服务

如果需要创建自定义的 mock 服务，可以参考现有的服务结构：

```typescript
export const mockCustomService = async (
  pagination: any,
  searchParams: any
): Promise<Data> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  // 生成模拟数据
  const mockData = Array.from({ length: 100 }, (_, index) => ({
    id: `item_${index + 1}`,
    name: `项目${index + 1}`,
    // ... 其他字段
  }))

  // 搜索过滤逻辑
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(item =>
      item.name.toLowerCase().includes(searchParams.keyword.toLowerCase())
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

## 注意事项

1. 所有 mock 服务都返回 `Data` 类型的数据结构
2. 支持分页和搜索参数
3. 模拟了真实的网络延迟
4. 数据是随机生成的，每次刷新都会不同
5. 可以根据需要调整数据量和字段
