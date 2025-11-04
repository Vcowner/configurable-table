/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-cropperjs'

declare module '@ant-design/icons-vue' {
  import type { DefineComponent } from 'vue'
  export const PlusOutlined: DefineComponent
  export const TableOutlined: DefineComponent
  export const EditOutlined: DefineComponent
  export const CopyOutlined: DefineComponent
  export const DeleteOutlined: DefineComponent
  export const EllipsisOutlined: DefineComponent
  export const CheckOutlined: DefineComponent
  export const DashboardOutlined: DefineComponent
  export const ToolOutlined: DefineComponent
  export const FormOutlined: DefineComponent
  export const BarChartOutlined: DefineComponent
  export const FileTextOutlined: DefineComponent
  export const FileOutlined: DefineComponent
  export const AppstoreOutlined: DefineComponent
  export const SettingOutlined: DefineComponent
  export const InfoCircleOutlined: DefineComponent
  export const UserOutlined: DefineComponent
  export const DownOutlined: DefineComponent
  export const LogoutOutlined: DefineComponent
  export const SoundOutlined: DefineComponent
  export const ManOutlined: DefineComponent
  export const MenuFoldOutlined: DefineComponent
  export const MenuUnfoldOutlined: DefineComponent
  export const SunOutlined: DefineComponent
  export const MoonOutlined: DefineComponent
}
