/*
 * @Author: liaokt
 * @Description: 表格数据模拟服务
 * @Date: 2025-09-25 17:30:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-09-25 17:30:00
 */

import type { Data } from '@/hooks/useTable'

// 模拟 API 服务
export const mockTableService = async (
  pagination: any,
  searchParams: any
): Promise<Data> => {
  console.log('表格数据请求:', { pagination, searchParams })

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

  // 根据搜索参数过滤
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(
      item =>
        item.name.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(searchParams.keyword.toLowerCase())
    )
  }

  const { current, pageSize } = pagination
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    list: filteredData.slice(start, end),
    total: filteredData.length,
  }
}

// 用户管理表格模拟服务
export const mockUserTableService = async (
  pagination: any,
  searchParams: any
): Promise<Data> => {
  console.log('用户表格数据请求:', { pagination, searchParams })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  // 生成用户数据
  const mockData = Array.from({ length: 200 }, (_, index) => ({
    id: `user_${index + 1}`,
    username: `user${index + 1}`,
    realName: `用户${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `138${String(index).padStart(8, '0')}`,
    status: index % 4, // 0: 正常, 1: 禁用, 2: 待审核, 3: 已删除
    role: ['admin', 'user', 'editor', 'viewer'][index % 4],
    department: ['技术部', '产品部', '运营部', '市场部', '财务部'][index % 5],
    createTime: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
    lastLoginTime: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }))

  // 根据搜索参数过滤
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(
      item =>
        item.username
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase()) ||
        item.realName
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(searchParams.keyword.toLowerCase())
    )
  }

  if (searchParams.status !== undefined) {
    filteredData = filteredData.filter(
      item => item.status === searchParams.status
    )
  }

  if (searchParams.role) {
    filteredData = filteredData.filter(item => item.role === searchParams.role)
  }

  if (searchParams.department) {
    filteredData = filteredData.filter(
      item => item.department === searchParams.department
    )
  }

  const { current, pageSize } = pagination
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    list: filteredData.slice(start, end),
    total: filteredData.length,
  }
}

// 订单管理表格模拟服务
export const mockOrderTableService = async (
  pagination: any,
  searchParams: any
): Promise<Data> => {
  console.log('订单表格数据请求:', { pagination, searchParams })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 400))

  // 生成订单数据
  const mockData = Array.from({ length: 150 }, (_, index) => ({
    id: `order_${index + 1}`,
    orderNo: `ORD${String(index + 1).padStart(6, '0')}`,
    customerName: `客户${index + 1}`,
    productName: `产品${index + 1}`,
    amount: Math.floor(Math.random() * 10000) + 100,
    status: index % 5, // 0: 待支付, 1: 已支付, 2: 已发货, 3: 已完成, 4: 已取消
    paymentMethod: ['支付宝', '微信', '银行卡', '现金'][index % 4],
    createTime: new Date(
      Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
    ).toISOString(),
    deliveryTime: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }))

  // 根据搜索参数过滤
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(
      item =>
        item.orderNo
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase()) ||
        item.customerName
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase()) ||
        item.productName
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase())
    )
  }

  if (searchParams.status !== undefined) {
    filteredData = filteredData.filter(
      item => item.status === searchParams.status
    )
  }

  if (searchParams.paymentMethod) {
    filteredData = filteredData.filter(
      item => item.paymentMethod === searchParams.paymentMethod
    )
  }

  const { current, pageSize } = pagination
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    list: filteredData.slice(start, end),
    total: filteredData.length,
  }
}

// 产品管理表格模拟服务
export const mockProductTableService = async (
  pagination: any,
  searchParams: any
): Promise<Data> => {
  console.log('产品表格数据请求:', { pagination, searchParams })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 350))

  // 生成产品数据
  const mockData = Array.from({ length: 80 }, (_, index) => ({
    id: `product_${index + 1}`,
    name: `产品${index + 1}`,
    category: ['电子产品', '服装', '食品', '图书', '家居'][index % 5],
    price: Math.floor(Math.random() * 1000) + 10,
    stock: Math.floor(Math.random() * 1000),
    status: index % 3, // 0: 在售, 1: 下架, 2: 缺货
    description: `这是产品${index + 1}的详细描述`,
    createTime: new Date(
      Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000
    ).toISOString(),
    updateTime: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }))

  // 根据搜索参数过滤
  let filteredData = mockData
  if (searchParams.keyword) {
    filteredData = mockData.filter(
      item =>
        item.name.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchParams.keyword.toLowerCase())
    )
  }

  if (searchParams.category) {
    filteredData = filteredData.filter(
      item => item.category === searchParams.category
    )
  }

  if (searchParams.status !== undefined) {
    filteredData = filteredData.filter(
      item => item.status === searchParams.status
    )
  }

  const { current, pageSize } = pagination
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    list: filteredData.slice(start, end),
    total: filteredData.length,
  }
}
