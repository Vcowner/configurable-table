/*
 * @Author: liaokt
 * @Description: 用户表格数据模拟服务
 * @Date: 2025-10-02 17:40:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 20:58:50
 */

import type { Data } from '@/hooks/useTable'

// 生成模拟数据源
const generateMockData = () => {
  return Array.from({ length: 500 }, (_, index) => {
    const id = String(index + 1)
    const names = [
      '张三xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      '李四',
      '王五',
      '赵六',
      '钱七',
      '孙八',
      '周九',
      '吴十',
      '郑十一',
      '王十二',
      '陈十三',
      '刘十四',
      '杨十五',
      '黄十六',
      '林十七',
      '何十八',
      '高十九',
      '梁二十',
    ]
    const departments = [
      '技术部',
      '产品部',
      '设计部',
      '运营部',
      '市场部',
      '销售部',
      '人事部',
      '财务部',
    ]
    const levels = ['P5', 'P6', 'P7', 'P8', 'P9', 'P10']
    const statuses = [0, 1, 2] // 0: 活跃, 1: 非活跃, 2: 待处理
    const educations = ['本科', '硕士', '博士', '专科']
    const cities = [
      '北京',
      '上海',
      '广州',
      '深圳',
      '杭州',
      '南京',
      '成都',
      '武汉',
    ]

    const name =
      names[index % names.length] +
      (Math.floor(index / names.length) > 0
        ? `(${Math.floor(index / names.length) + 1})`
        : '')
    const age = 22 + Math.floor(Math.random() * 20) // 22-42岁
    const salary = 5000 + Math.floor(Math.random() * 20000) // 5000-25000
    const department = departments[index % departments.length]
    const level = levels[Math.floor(Math.random() * levels.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // 生成随机日期
    const startDate = new Date(2023, 0, 1)
    const endDate = new Date(2024, 11, 31)
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    )
    const createTime = randomDate
      .toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\//g, '-')

    const phone = `1${Math.floor(Math.random() * 9) + 3}${Math.floor(Math.random() * 90000000) + 10000000}`
    const address = `${cities[Math.floor(Math.random() * cities.length)]}市${Math.floor(Math.random() * 10) + 1}区`
    const education = educations[Math.floor(Math.random() * educations.length)]
    const experience = Math.floor(Math.random() * 15) + 1 // 1-15年
    const updateTime = new Date(
      randomDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    )
      .toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\//g, '-')

    return {
      id,
      name,
      age,
      email: `${name.toLowerCase().replace(/[()（）]/g, '')}${index}@example.com`,
      status,
      salary,
      createTime,
      department,
      level,
      phone,
      address,
      education,
      experience,
      updateTime,
    }
  })
}

// 缓存数据，避免重复生成
let cachedMockData: any[] | null = null

// 用户表格数据模拟服务
export const fetchUserList = async (
  pagination: { current: number; pageSize: number },
  searchParams: Record<string, any>
): Promise<Data> => {
  console.log('用户表格数据请求:', { pagination, searchParams })

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 使用缓存数据或生成新数据
  if (!cachedMockData) {
    cachedMockData = generateMockData()
  }

  let filteredData = [...cachedMockData]

  // 根据搜索参数过滤数据
  if (searchParams.name) {
    filteredData = filteredData.filter(item =>
      item.name.includes(searchParams.name)
    )
  }

  if (searchParams.status !== undefined && searchParams.status !== '') {
    filteredData = filteredData.filter(
      item => item.status === Number(searchParams.status)
    )
  }

  if (searchParams.department) {
    filteredData = filteredData.filter(
      item => item.department === searchParams.department
    )
  }

  if (searchParams.phone) {
    filteredData = filteredData.filter(item =>
      item.phone.includes(searchParams.phone)
    )
  }

  if (searchParams.education) {
    filteredData = filteredData.filter(
      item => item.education === searchParams.education
    )
  }

  // 分页处理
  const start = (pagination.current - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  const list = filteredData.slice(start, end)

  return {
    list,
    total: filteredData.length,
  }
}

// 导出数据生成函数，供其他模块使用
export { generateMockData }
