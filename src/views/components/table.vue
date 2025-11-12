<!--
 * @Author: liaokt
 * @Description: 表格组件页面
 * @Date: 2025-10-02 16:51:15
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 21:29:39
-->
<template>
  <Container :padding="12" :full-height="true">
    <CustomTable
      v-bind="{
        ...tableProps,
        columns,
        rowSelection: rowSelectionConfig,
        searchList,
        operateList,
        bordered: true,
      }"
      @search="handleSearch"
      @reset="handleReset"
    />
  </Container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Container } from '@/components/Container'
import CustomTable from '@/components/CustomTable.vue'
import { TableColumnTypeEnum } from '@/enums/table'
import { useTable } from '@/hooks'
import { fetchUserList } from '@/mock'

// 使用 useTable hook
const { tableProps, search, selectedRowKeys, selectedRows } = useTable(
  fetchUserList,
  {
    defaultPageSize: 20,
    manual: false, // 自动加载
    searchFormatter: params => {
      // 过滤空值
      const filtered: Record<string, any> = {}
      Object.keys(params).forEach(key => {
        if (
          params[key] !== undefined &&
          params[key] !== '' &&
          params[key] !== null
        ) {
          filtered[key] = params[key]
        }
      })
      return filtered
    },
    onSuccess: data => {
      console.log('数据加载成功:', data)
    },
    onError: error => {
      console.error('数据加载失败:', error)
    },
  }
)

// 行选择配置
const rowSelectionConfig = computed(() => ({
  type: 'checkbox' as const,
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: any[], rows: any[]) => {
    selectedRowKeys.value = keys.map(key => String(key))
    selectedRows.value = rows
    console.log('选中行变化:', keys, rows)
  },
  onSelect: (
    record: any,
    selected: boolean,
    selectedRows: any[],
    nativeEvent: Event
  ) => {
    console.log('单行选择:', record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log('全选/取消全选:', selected, selectedRows, changeRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.status === 2, // 待处理状态的用户不可选择
    name: record.name,
  }),
  fixed: 'left' as const,
  columnWidth: 60,
  columnTitle: '选择',
}))

// 表格列配置
const columns = ref([
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    sorter: true,
    fixed: 'left' as const,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 80,
    align: 'center' as const,
    sorter: true,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center' as const,
    type: TableColumnTypeEnum.STATUS,
    options: [
      { label: '活跃', value: 0 },
      { label: '非活跃', value: 1 },
      { label: '待处理', value: 2 },
    ],
  },
  {
    key: 'salary',
    title: '薪资',
    dataIndex: 'salary',
    width: 120,
    align: 'right' as const,
    sorter: true,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    type: TableColumnTypeEnum.DATETIME,
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
    type: TableColumnTypeEnum.SELECT,
    options: [
      { label: '技术部', value: '技术部' },
      { label: '产品部', value: '产品部' },
      { label: '设计部', value: '设计部' },
      { label: '运营部', value: '运营部' },
    ],
  },
  {
    key: 'level',
    title: '等级',
    dataIndex: 'level',
    width: 100,
    align: 'center' as const,
    type: TableColumnTypeEnum.TAG,
    color: 'blue',
  },
  {
    key: 'phone',
    title: '电话',
    dataIndex: 'phone',
    width: 140,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'address',
    title: '地址',
    dataIndex: 'address',
    width: 200,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'education',
    title: '学历',
    dataIndex: 'education',
    width: 100,
    align: 'center' as const,
    type: TableColumnTypeEnum.SELECT,
    options: [
      { label: '本科', value: '本科' },
      { label: '硕士', value: '硕士' },
      { label: '博士', value: '博士' },
      { label: '专科', value: '专科' },
    ],
  },
  {
    key: 'experience',
    title: '工作经验',
    dataIndex: 'experience',
    width: 120,
    align: 'center' as const,
    sorter: true,
    type: TableColumnTypeEnum.TEXT,
  },
  {
    key: 'updateTime',
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 160,
    fixed: 'right' as const,
    type: TableColumnTypeEnum.DATETIME,
  },
])

// 搜索配置
const searchList = ref([
  {
    type: 'input' as const,
    key: 'name',
    name: '姓名',
    placeholder: '请输入姓名',
    width: 200,
  },
  {
    type: 'select' as const,
    key: 'status',
    name: '状态',
    placeholder: '请选择状态',
    width: 220,
    options: [
      { key: '0', value: '活跃' },
      { key: '1', value: '非活跃' },
      { key: '2', value: '待处理' },
    ],
  },
  {
    type: 'select' as const,
    key: 'department',
    name: '部门',
    placeholder: '请选择部门',
    isHidden: true, // 高级搜索
    options: [
      { key: '技术部', value: '技术部' },
      { key: '产品部', value: '产品部' },
      { key: '设计部', value: '设计部' },
      { key: '运营部', value: '运营部' },
    ],
  },
  {
    type: 'input' as const,
    key: 'phone',
    name: '电话',
    placeholder: '请输入电话',
    isHidden: true, // 高级搜索
  },
  {
    type: 'select' as const,
    key: 'education',
    name: '学历',
    placeholder: '请选择学历',
    isHidden: true, // 高级搜索
    options: [
      { key: '本科', value: '本科' },
      { key: '硕士', value: '硕士' },
      { key: '博士', value: '博士' },
      { key: '专科', value: '专科' },
    ],
  },
])

// 操作按钮配置
const operateList = ref([
  {
    label: '新增用户',
    type: 'primary' as const,
    size: 'middle' as const,
    position: 'left' as const,
    onClick: () => {
      console.log('新增用户')
      // 这里可以打开新增用户的弹窗或跳转到新增页面
    },
  },
  {
    label: '批量删除',
    type: 'default' as const,
    size: 'middle' as const,
    danger: true,
    position: 'left' as const,
    disabled: computed(() => selectedRowKeys.value.length === 0),
    onClick: () => {
      console.log('批量删除', selectedRowKeys.value)
      // 这里可以执行批量删除操作
    },
  },
])

// 事件处理
const handleSearch = (params: Record<string, any>, reset?: boolean) => {
  console.log('搜索参数:', params, '是否重置:', reset)
  if (reset) {
    search.reset()
  } else {
    search.submit(params)
  }
}

const handleReset = (params: any) => {
  console.log('重置参数:', params)
  search.reset()
}
</script>

<style scoped></style>
