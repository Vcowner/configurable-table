<template>
  <div class="table-generator">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">表格生成器</h1>
          <p class="page-description">快速创建和配置数据表格</p>
        </div>
        <div class="header-actions">
          <a-button type="primary" @click="createNewTable">
            <template #icon>
              <PlusOutlined />
            </template>
            新建表格
          </a-button>
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 表格配置列表 -->
      <div v-if="!currentConfig">
        <a-card title="我的表格配置" class="config-list-card">
          <div v-if="tableConfigs.length === 0" class="empty-state">
            <a-empty>
              <template #image>
                <TableOutlined style="font-size: 64px; color: #d9d9d9" />
              </template>
              <template #description>
                <span>还没有表格配置</span>
                <br />
                <span>点击"新建表格"开始创建你的第一个表格配置</span>
              </template>
              <a-button type="primary" @click="createNewTable">
                新建表格
              </a-button>
            </a-empty>
          </div>
          <div v-else class="config-grid">
            <a-card
              v-for="config in tableConfigs"
              :key="config.id"
              class="config-card"
              hoverable
              @click="selectConfig(config)"
            >
              <template #title>
                <div class="config-title">
                  <span>{{ config.name }}</span>
                  <a-dropdown @click.stop>
                    <a-button type="text" size="small">
                      <EllipsisOutlined />
                    </a-button>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item @click="editConfig(config)">
                          <EditOutlined />
                          编辑
                        </a-menu-item>
                        <a-menu-item @click="duplicateConfig(config.id)">
                          <CopyOutlined />
                          复制
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item @click="deleteConfig(config.id)" danger>
                          <DeleteOutlined />
                          删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </template>
              <p class="config-description">
                {{ config.description || '暂无描述' }}
              </p>
              <div class="config-meta">
                <a-tag color="blue"
                  >{{ config.config.columns.length }} 列</a-tag
                >
                <span class="config-date">{{
                  formatDate(config.updatedAt)
                }}</span>
              </div>
            </a-card>
          </div>
        </a-card>
      </div>

      <!-- 表格编辑器 -->
      <div v-else>
        <!-- 编辑器头部 -->
        <a-card class="editor-header">
          <div class="editor-header-content">
            <div class="editor-title">
              <h2>{{ currentConfig.name }}</h2>
              <p>{{ currentConfig.description || '编辑表格配置' }}</p>
            </div>
            <div class="editor-actions">
              <a-button @click="previewTable"> 预览 </a-button>
              <a-button type="primary" @click="saveConfig"> 保存 </a-button>
              <a-button @click="currentConfig = null"> 返回 </a-button>
            </div>
          </div>
        </a-card>

        <!-- 实时预览区域 -->
        <a-card title="实时预览" class="preview-panel">
          <template #extra>
            <div class="preview-actions">
              <a-input
                v-model:value="searchKeyword"
                placeholder="搜索用户..."
                style="width: 200px; margin-right: 8px"
                @press-enter="handleSearch"
              />
              <a-button @click="handleSearch" :loading="loading">
                搜索
              </a-button>
              <a-button @click="handleReset"> 重置 </a-button>
              <a-button @click="refresh" :loading="loading"> 刷新 </a-button>
            </div>
          </template>
          <div class="preview-container">
            <ConfigurableTable
              v-if="currentConfig && currentConfig.config"
              :columns="currentConfig.config.columns"
              v-bind="tableProps"
              :bordered="currentConfig.config.bordered"
              :size="currentConfig.config.size"
              :search-list="currentConfig.config.searchList"
              :operate-list="currentConfig.config.operateList"
              :row-selection="rowSelectionConfig"
              @selection-change="handleSelectionChange"
              @search="handleTableSearch"
              @reset="handleTableReset"
            />
            <a-empty v-else description="请选择一个表格配置进行预览" />
          </div>
        </a-card>

        <!-- 配置面板 -->
        <a-row :gutter="[16, 16]">
          <!-- 列配置 -->
          <a-col :xs="24" :lg="16">
            <a-card title="列配置" class="config-panel" size="small">
              <div class="column-list">
                <div
                  v-for="(column, index) in currentConfig.config.columns"
                  :key="column.key"
                  class="column-item"
                >
                  <div class="column-header">
                    <div class="column-title">
                      <a-input
                        v-model:value="column.title"
                        placeholder="列标题"
                        size="small"
                        class="title-input"
                      />
                    </div>
                    <div class="column-actions">
                      <a-tooltip title="可排序">
                        <a-switch
                          v-model:checked="column.sorter"
                          size="small"
                        />
                      </a-tooltip>
                      <a-tooltip title="可筛选">
                        <a-switch
                          v-model:checked="column.filters"
                          size="small"
                        />
                      </a-tooltip>
                      <a-button
                        type="text"
                        danger
                        size="small"
                        @click="removeColumn(index)"
                      >
                        <DeleteOutlined />
                      </a-button>
                    </div>
                  </div>

                  <div class="column-config">
                    <a-input
                      v-model:value="column.dataIndex"
                      placeholder="数据字段"
                      size="small"
                      class="data-index-input"
                    />
                    <a-input-number
                      v-model:value="column.width"
                      :min="50"
                      :max="500"
                      size="small"
                      class="width-input"
                      placeholder="宽度"
                    />
                    <a-select
                      v-model:value="column.type"
                      size="small"
                      class="render-select"
                    >
                      <a-select-option value="text">文本</a-select-option>
                      <a-select-option value="tag">标签</a-select-option>
                      <a-select-option value="date">日期</a-select-option>
                      <a-select-option value="number">数字</a-select-option>
                      <a-select-option value="action">操作</a-select-option>
                    </a-select>
                  </div>
                </div>

                <a-button
                  type="dashed"
                  block
                  size="small"
                  @click="addNewColumn"
                  class="add-column-btn"
                >
                  <template #icon>
                    <PlusOutlined />
                  </template>
                  添加列
                </a-button>
              </div>
            </a-card>
          </a-col>

          <!-- 表格设置 -->
          <a-col :xs="24" :lg="8">
            <a-card title="表格设置" class="config-panel" size="small">
              <div class="table-settings">
                <div class="setting-item">
                  <label>表格标题</label>
                  <a-input
                    v-model:value="currentConfig.config.title"
                    placeholder="表格标题"
                    size="small"
                  />
                </div>

                <div class="setting-item">
                  <label>表格大小</label>
                  <a-select
                    v-model:value="currentConfig.config.size"
                    size="small"
                  >
                    <a-select-option value="small">小</a-select-option>
                    <a-select-option value="middle">中</a-select-option>
                    <a-select-option value="large">大</a-select-option>
                  </a-select>
                </div>

                <div class="setting-options">
                  <a-checkbox
                    v-model:checked="currentConfig.config.bordered"
                    size="small"
                  >
                    显示边框
                  </a-checkbox>
                  <a-checkbox
                    v-model:checked="currentConfig.config.loading"
                    size="small"
                  >
                    加载状态
                  </a-checkbox>
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  PlusOutlined,
  TableOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue'
import { useTableGeneratorStore } from '@/stores/tableGenerator'
import ConfigurableTable from '@/components/CustomTable.vue'
import { useTable } from '@/hooks/useTable'
import { mockTableService } from '@/mock'
import type { TableGeneratorConfig, TableColumn } from '@/types/table'

const store = useTableGeneratorStore()
const { tableConfigs, currentConfig } = storeToRefs(store)

// 使用 mock 服务

// 使用 useTable hook
const {
  tableProps,
  loading,
  selectedRowKeys,
  selectedRows,
  search,
  refresh,
  reload,
} = useTable(mockTableService, {
  defaultPageSize: 10,
  manual: false, // 不立即请求，等配置完成后再请求
  searchFormatter: params => ({
    ...params,
    keyword: searchKeyword.value, // 将搜索关键词添加到搜索参数中
  }),
})

// 行选择配置
const rowSelectionConfig = computed(() => ({
  type: 'checkbox',
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[], rows: any[]) => {
    selectedRowKeys.value = keys
    selectedRows.value = rows
  },
}))

// 搜索关键词
const searchKeyword = ref('')

// 监听当前配置变化，重新加载数据
watch(
  currentConfig,
  newConfig => {
    if (newConfig) {
      // 当选择新配置时，重新加载数据
      reload()
    }
  },
  { immediate: true }
)

// 搜索处理
const handleSearch = () => {
  // 更新搜索参数并触发搜索
  search.submit()
}

// 重置搜索
const handleReset = () => {
  searchKeyword.value = ''
  search.reset()
}

// 处理表格搜索
const handleTableSearch = (params: Record<string, any>, reset?: boolean) => {
  console.log('表格搜索:', params, reset)
  // 调用 useTable 的搜索方法
  search.submit(params)
}

// 处理表格重置
const handleTableReset = (params: any) => {
  console.log('表格重置:', params)
  // 调用 useTable 的重置方法
  search.reset()
}

// 新增用户
const handleAddUser = () => {
  console.log('新增用户')
  // 这里可以打开新增用户的弹窗
  // 或者跳转到新增页面
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    console.log('请先选择要删除的行')
    return
  }
  console.log('批量删除选中的行:', selectedRowKeys.value)
  // 这里可以调用删除 API
}

// 导出数据
const handleExportData = () => {
  console.log('导出数据')
  // 这里可以调用导出 API
}

// 刷新数据
const handleRefreshData = async () => {
  console.log('刷新数据')
  await refresh()
}

// 打开设置
const handleOpenSettings = () => {
  console.log('打开设置')
  // 这里可以打开设置弹窗
}

// 创建新表格
const createNewTable = () => {
  const name = prompt('请输入表格名称:') || '新表格'
  const description = prompt('请输入表格描述:') || ''
  const config = store.createTableConfig(name, description)

  // 动态设置 actions 的 onClick 方法
  if (config && config.config && config.config.actions) {
    config.config.actions.forEach((action: any) => {
      switch (action.key) {
        case 'add':
          action.onClick = handleAddUser
          break
        case 'batch-delete':
          action.onClick = handleBatchDelete
          break
        case 'export':
          action.onClick = handleExportData
          break
        case 'refresh':
          action.onClick = handleRefreshData
          break
        case 'settings':
          action.onClick = handleOpenSettings
          break
      }
    })
  }
}

// 选择配置
const selectConfig = (config: TableGeneratorConfig) => {
  currentConfig.value = config
}

// 编辑配置
const editConfig = (config: TableGeneratorConfig) => {
  currentConfig.value = config
}

// 复制配置
const duplicateConfig = (id: string) => {
  const config = tableConfigs.value.find((c: any) => c.id === id)
  if (config) {
    store.createTableConfig(`${config.name} (副本)`, config.description)
  }
}

// 删除配置
const deleteConfig = (id: string) => {
  if (confirm('确定要删除这个表格配置吗？')) {
    store.deleteTableConfig(id)
  }
}

// 添加新列
const addNewColumn = () => {
  if (currentConfig.value) {
    const newColumn = {
      key: `column_${Date.now()}`,
      title: '新列',
      dataIndex: 'newColumn',
      width: 120,
      type: 'text',
    }
    currentConfig.value.config.columns.push(newColumn as any)
  }
}

// 删除列
const removeColumn = (index: number) => {
  if (currentConfig.value) {
    currentConfig.value.config.columns.splice(index, 1)
  }
}

// 保存配置
const saveConfig = () => {
  if (currentConfig.value) {
    // 这里可以保存到后端
    console.log('保存配置:', currentConfig.value)
    alert('配置已保存！')
  }
}

// 处理选中变化
const handleSelectionChange = (
  selectedRowKeysParam: string[],
  selectedRowsParam: any[]
) => {
  console.log('选中变化:', {
    selectedRowKeys: selectedRowKeysParam,
    selectedRows: selectedRowsParam,
  })
  // 更新 useTable 的选中状态
  selectedRowKeys.value = selectedRowKeysParam
  selectedRows.value = selectedRowsParam
}

// 预览表格
const previewTable = () => {
  // 可以打开新窗口预览
  console.log('预览表格:', currentConfig.value?.config)
}

// 格式化日期
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN')
}

onMounted(() => {
  // 初始化时创建一些示例数据
  if (tableConfigs.value.length === 0) {
    store.createTableConfig('用户管理表格', '一个完整的用户管理表格示例')
  }
})
</script>

<style scoped>
.table-generator {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-header {
  margin-bottom: 16px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1f2937;
}

.page-description {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-list-card {
  min-height: 400px;
}

.empty-state {
  padding: 48px 24px;
  text-align: center;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.config-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #f0f0f0;
}

.config-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #d9d9d9;
}

.config-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.config-description {
  color: #6b7280;
  margin: 8px 0;
  font-size: 13px;
}

.config-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.config-date {
  color: #9ca3af;
  font-size: 11px;
}

.editor-header {
  margin-bottom: 16px;
}

.editor-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editor-title h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 2px 0;
  color: #1f2937;
}

.editor-title p {
  color: #6b7280;
  margin: 0;
  font-size: 13px;
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.config-panel {
  height: auto;
}

/* 列配置样式 */
.column-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.column-item {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 12px;
  background: #fafafa;
  transition: all 0.2s ease;
}

.column-item:hover {
  border-color: #d9d9d9;
  background: #f5f5f5;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.column-title {
  flex: 1;
  margin-right: 12px;
}

.title-input {
  font-weight: 500;
}

.column-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.column-config {
  display: flex;
  gap: 8px;
  align-items: center;
}

.data-index-input {
  flex: 1;
  min-width: 120px;
}

.width-input {
  width: 80px;
}

.render-select {
  width: 100px;
}

.add-column-btn {
  margin-top: 8px;
  border-style: dashed;
  border-color: #d9d9d9;
  color: #8c8c8c;
}

.add-column-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

/* 表格设置样式 */
.table-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-item label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.setting-options {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

/* 预览区域样式 */
.preview-panel {
  margin-bottom: 16px;
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-container {
  max-height: 500px;
  overflow: auto;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background: white;
  padding: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .editor-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .config-grid {
    grid-template-columns: 1fr;
  }

  .column-config {
    flex-direction: column;
    align-items: stretch;
  }

  .data-index-input,
  .width-input,
  .render-select {
    width: 100%;
  }
}
</style>
