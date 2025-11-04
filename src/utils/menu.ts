/*
 * @Author: liaokt
 * @Description: 动态菜单生成工具
 * @Date: 2025-10-02 16:55:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 16:55:00
 */
import type { RouteRecordNormalized } from 'vue-router'
import { TableOutlined } from '@ant-design/icons-vue'

// 菜单项接口
export interface MenuItem {
  key: string
  title: string
  icon?: any
  children?: MenuItem[]
  path?: string
}

// 父级菜单配置
const parentMenuConfig: Record<string, { title: string; icon: any }> = {
  components: {
    title: '组件',
    icon: TableOutlined,
  },
}

/**
 * 从路由配置生成菜单
 * @param routes 路由配置数组
 * @returns 菜单配置数组
 */
export function generateMenuFromRoutes(
  routes: RouteRecordNormalized[]
): MenuItem[] {
  // 过滤出需要在菜单中显示的路由
  const menuRoutes = routes.filter(
    route => route.meta?.showInMenu && route.meta?.title
  )

  // 按 order 排序
  menuRoutes.sort((a, b) => {
    const orderA = (a.meta?.order as number) || 999
    const orderB = (b.meta?.order as number) || 999
    return orderA - orderB
  })

  // 分离有父级和无父级的菜单项
  const topLevelItems: MenuItem[] = []
  const childItems: Record<string, MenuItem[]> = {}

  menuRoutes.forEach(route => {
    const menuItem: MenuItem = {
      key: route.name as string,
      title: route.meta?.title as string,
      icon: route.meta?.icon,
      path: route.path,
    }

    const parent = route.meta?.parent as string
    if (parent) {
      if (!childItems[parent]) {
        childItems[parent] = []
      }
      childItems[parent].push(menuItem)
    } else {
      topLevelItems.push(menuItem)
    }
  })

  // 为有子菜单的父级创建菜单项
  Object.entries(childItems).forEach(([parentKey, children]) => {
    const parentConfig = parentMenuConfig[parentKey]
    if (parentConfig) {
      // 按 order 排序子菜单
      children.sort((a, b) => {
        const routeA = menuRoutes.find(r => r.name === a.key)
        const routeB = menuRoutes.find(r => r.name === b.key)
        const orderA = (routeA?.meta?.order as number) || 999
        const orderB = (routeB?.meta?.order as number) || 999
        return orderA - orderB
      })

      topLevelItems.push({
        key: parentKey,
        title: parentConfig.title,
        icon: parentConfig.icon,
        children,
      })
    }
  })

  // 最终排序
  topLevelItems.sort((a, b) => {
    // 找到对应的路由来获取 order
    const routeA = menuRoutes.find(r => r.name === a.key)
    const routeB = menuRoutes.find(r => r.name === b.key)
    const orderA = (routeA?.meta?.order as number) || 999
    const orderB = (routeB?.meta?.order as number) || 999
    return orderA - orderB
  })

  return topLevelItems
}

/**
 * 获取菜单项的默认选中和展开状态
 * @param currentPath 当前路径
 * @param menuItems 菜单项数组
 * @returns 选中和展开的键
 */
export function getMenuSelectedKeys(
  currentPath: string,
  menuItems: MenuItem[]
): {
  selectedKeys: string[]
  openKeys: string[]
} {
  const selectedKeys: string[] = []
  const openKeys: string[] = []

  function findSelectedKey(items: MenuItem[], parentKey?: string): boolean {
    for (const item of items) {
      if (item.path === currentPath) {
        selectedKeys.push(item.key)
        if (parentKey) {
          openKeys.push(parentKey)
        }
        return true
      }
      if (item.children) {
        // 递归查找子菜单，如果找到匹配项，当前父菜单应该展开
        if (findSelectedKey(item.children, item.key)) {
          if (parentKey) {
            openKeys.push(parentKey)
          }
          return true
        }
      }
    }
    return false
  }

  findSelectedKey(menuItems)
  return { selectedKeys, openKeys }
}
