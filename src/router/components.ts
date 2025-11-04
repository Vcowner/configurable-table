/*
 * @Author: liaokt
 * @Description:
 * @Date: 2025-10-02 16:50:13
 * @LastEditors: liaokt
 * @LastEditTime: 2025-10-02 17:01:39
 */
import { TableOutlined } from '@ant-design/icons-vue'

const componentsRouter = [
  {
    path: '/component',
    name: 'components',
    redirect: '/component/table',
    meta: {
      title: '组件',
      icon: TableOutlined,
      showInMenu: false, // 父级菜单不显示，只显示子菜单
      order: 4,
    },
    children: [
      {
        path: 'table',
        name: 'components-table',
        component: () => import('@/views/components/table.vue'),
        meta: {
          title: '表格组件',
          icon: TableOutlined,
          showInMenu: true,
          parent: 'components',
          order: 1,
        },
      },
    ],
  },
]

export default componentsRouter
