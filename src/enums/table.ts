/**
 * 表格列类型枚举
 */
export enum TableColumnTypeEnum {
  /** 文本 */
  TEXT = 'text',
  /** 标签 */
  TAG = 'tag',
  /** 日期 */
  DATE = 'date',
  /** 日期时间 */
  DATETIME = 'dateTime',
  /** 下拉选择 */
  SELECT = 'select',
  /** 状态 */
  STATUS = 'status',
  /** 自定义 */
  CUSTOM = 'custom'
}

/**
 * 表格列对齐方式枚举
 */
export enum TableColumnAlignEnum {
  /** 左对齐 */
  LEFT = 'left',
  /** 居中对齐 */
  CENTER = 'center',
  /** 右对齐 */
  RIGHT = 'right'
}

/**
 * 表格尺寸枚举
 */
export enum TableSizeEnum {
  /** 小尺寸 */
  SMALL = 'small',
  /** 中等尺寸 */
  MIDDLE = 'middle',
  /** 大尺寸 */
  LARGE = 'large'
}

/**
 * 表格选择类型枚举
 */
export enum TableSelectionTypeEnum {
  /** 复选框 */
  CHECKBOX = 'checkbox',
  /** 单选框 */
  RADIO = 'radio'
}

/**
 * 按钮位置枚举
 */
export enum ButtonPositionEnum {
  /** 左侧 */
  LEFT = 'left',
  /** 右侧 */
  RIGHT = 'right'
}
