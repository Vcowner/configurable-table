import { ref, toRaw, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  TableGeneratorConfig,
  TableConfig,
  TableColumn,
} from '@/types/table'
import {
  TableColumnTypeEnum,
  TableSizeEnum,
  ButtonPositionEnum,
  TableSelectionTypeEnum,
} from '@/enums/table'
import {
  PlusOutlined,
  FileTextOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'

export const useTableGeneratorStore = defineStore('tableGenerator', () => {
  // 表格配置列表
  const tableConfigs = ref<TableGeneratorConfig[]>([])

  // 当前编辑的配置
  const currentConfig = ref<TableGeneratorConfig | null>(null)

  // 当前选中行
  const currentSelectedRowKeys = ref<string[]>([])
  const currentSelectedRows = ref<any[]>([])

  // 分页状态
  const currentPage = ref(1)
  const pageSize = ref(10)

  // 按钮状态管理
  const buttonStates = ref<
    Record<string, { loading: boolean; disabled: boolean }>
  >({})

  // 设置按钮状态
  const setButtonState = (
    key: string,
    state: { loading?: boolean; disabled?: boolean }
  ) => {
    if (!buttonStates.value[key]) {
      buttonStates.value[key] = { loading: false, disabled: false }
    }
    Object.assign(buttonStates.value[key], state)
  }

  // 获取按钮状态
  const getButtonState = (key: string) => {
    return buttonStates.value[key] || { loading: false, disabled: false }
  }

  // 示例数据
  const sampleData = ref([
    {
      id: '1',
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com',
      status: 0, // 成功
      salary: 8000,
      createTime: '2024-01-15T10:30:00Z',
      department: '技术部',
      level: '高级',
    },
    {
      id: '2',
      name: '李四',
      age: 30,
      email: 'lisi@example.com',
      status: 1, // 错误
      salary: 12000,
      createTime: '2024-01-20T14:20:00Z',
      department: '产品部',
      level: '中级',
    },
    {
      id: '3',
      name: '王五',
      age: 28,
      email: 'wangwu@example.com',
      status: 3, // 处理中
      salary: 9500,
      createTime: '2024-01-25T09:15:00Z',
      department: '设计部',
      level: '初级',
    },
  ])

  // 创建默认表格配置
  const createDefaultTableConfig = computed(
    (): TableConfig => ({
      columns: [
        {
          key: 'name',
          title: '姓名',
          dataIndex: 'name',
          width: 120,
          sorter: true,
          type: TableColumnTypeEnum.TEXT,
        },
        {
          key: 'age',
          title: '年龄',
          dataIndex: 'age',
          width: 80,
          align: 'center',
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
          align: 'center',
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
          align: 'right',
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
          align: 'center',
          type: TableColumnTypeEnum.TAG,
          color: 'blue',
        },
      ],
      dataSource: [...sampleData.value],
      pagination: {
        current: currentPage.value,
        pageSize: pageSize.value,
        total: sampleData.value.length,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      rowKey: 'id',
      loading: false,
      bordered: true,
      size: TableSizeEnum.MIDDLE,
      // 搜索配置
      searchList: [
        {
          type: 'input',
          key: 'name',
          name: '姓名',
          placeholder: '请输入姓名',
          width: 200,
        },
        {
          type: 'select',
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
          type: 'select',
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
          type: 'date',
          key: 'createTime',
          name: '创建时间',
          placeholder: '请选择创建时间',
          width: 200,
          isHidden: true, // 高级搜索
        },
      ],
      // 操作按钮配置
      operateList: [
        {
          label: '新增用户',
          type: 'primary',
          size: 'middle',
          icon: PlusOutlined,
          position: 'left',
          onClick: () => console.log('新增用户'),
        },
        {
          label: '批量删除',
          type: 'default',
          size: 'middle',
          danger: true,
          icon: DeleteOutlined,
          position: 'left',
          disabled: true,
          onClick: () => console.log('批量删除'),
        },
        {
          label: '导出数据',
          type: 'default',
          size: 'small',
          icon: FileTextOutlined,
          position: 'right',
          onClick: () => console.log('导出数据'),
        },
        {
          label: '设置',
          type: 'default',
          size: 'small',
          icon: SettingOutlined,
          position: 'right',
          onClick: () => console.log('打开设置'),
        },
      ],
      selection: {
        type: TableSelectionTypeEnum.CHECKBOX,
        // 不设置 selectedRowKeys，让表格使用非受控模式
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('选中的行:', selectedRowKeys, selectedRows, '22222')
          currentSelectedRowKeys.value = selectedRowKeys
          currentSelectedRows.value = selectedRows
        },
      },
    })
  )

  // 创建新的表格配置
  const createTableConfig = (name: string, description?: string) => {
    const config: any = {
      id: Date.now().toString(),
      name,
      description,
      config: createDefaultTableConfig.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tableConfigs.value.push(config)
    currentConfig.value = config

    // 返回普通对象，避免响应式包装
    return toRaw(config)
  }

  // 更新表格配置
  const updateTableConfig = (id: string, config: any) => {
    const index = tableConfigs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      tableConfigs.value[index].config = {
        ...tableConfigs.value[index].config,
        ...config,
      }
      tableConfigs.value[index].updatedAt = new Date().toISOString()
    }
  }

  // 添加列
  const addColumn = (id: string, column: any) => {
    const tableConfig = tableConfigs.value.find((item: any) => item.id === id)
    if (tableConfig) {
      tableConfig.config.columns.push(column)
      tableConfig.updatedAt = new Date().toISOString()
    }
  }

  // 删除列
  const removeColumn = (id: string, columnKey: string) => {
    const tableConfig = tableConfigs.value.find((item: any) => item.id === id)
    if (tableConfig) {
      tableConfig.config.columns = tableConfig.config.columns.filter(
        (col: any) => col.key !== columnKey
      )
      tableConfig.updatedAt = new Date().toISOString()
    }
  }

  // 更新列
  const updateColumn = (id: string, columnKey: string, updates: any) => {
    const tableConfig = tableConfigs.value.find((item: any) => item.id === id)
    if (tableConfig) {
      const columnIndex = tableConfig.config.columns.findIndex(
        (col: any) => col.key === columnKey
      )
      if (columnIndex !== -1) {
        tableConfig.config.columns[columnIndex] = {
          ...tableConfig.config.columns[columnIndex],
          ...updates,
        }
        tableConfig.updatedAt = new Date().toISOString()
      }
    }
  }

  // 删除表格配置
  const deleteTableConfig = (id: string) => {
    const index = tableConfigs.value.findIndex(item => item.id === id)
    if (index !== -1) {
      tableConfigs.value.splice(index, 1)
      if (currentConfig.value?.id === id) {
        currentConfig.value = null
      }
    }
  }

  // 获取表格配置
  const getTableConfig = (id: string) => {
    return tableConfigs.value.find((item: any) => item.id === id)
  }

  // 更新分页状态
  const updatePagination = (page: number, size: number) => {
    currentPage.value = page
    pageSize.value = size
  }

  return {
    tableConfigs,
    currentConfig,
    sampleData,
    buttonStates,
    currentPage,
    pageSize,
    setButtonState,
    getButtonState,
    createTableConfig,
    updateTableConfig,
    addColumn,
    removeColumn,
    updateColumn,
    deleteTableConfig,
    getTableConfig,
    updatePagination,
  }
})
