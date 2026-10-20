
// 数据结构定义列表
let resolveDefinitionList = ['LOG_TIME_STAMP', 'LOG_LEVEL', 'LOG_TEXT', 'NUMBER_RANGE', 'DATE_RANGE']

// 每个定义对应的详情
let resolveType = {
  // 日志时间戳
  'LOG_TIME_STAMP': {
    // 从数据矩阵中步进的单元数
    step: 1, 
    // 注意：日志时间戳显示日期格式固定为 YYYY-MM-DD HH:mm:ss
  },
  // 日志等级
  'LOG_LEVEL': {
    // 从数据矩阵中步进的单元数
    step: 1,
    // 数据矩阵中上报的日志等级数据对应的等级含义
    // 0 代表 INFO，1 代表 WARNING，2 代表 ERROR，3 代表 FATAL
    resolveType: ['INFO', 'WARNING', 'ERROR', 'FATAL'], 
    // 每种日志等级下显示的文字颜色号
    colorPreset: {
      INFO: '#3176ff',
      WARNING: '#ff8a31',
      ERROR: '#ff3131',
      FATAL: '#bb0000'
    }
  },
  // 日志文本
  'LOG_TEXT': {
    // 从数据矩阵中步进的单元数
    step: 1,
  },
  // 数字范围
  'NUMBER_RANGE': {
    // 从数据矩阵中步进的单元数
    step: 2,
    // 需要保留的小数位数，可以为 0，保留小数规则遵循四舍五入
    numberFixed: 2
  },
  // 日期范围
  'DATE_RANGE': {
    // 从数据矩阵中步进的单元数
    step: 2,
    // 显示日期格式，实际判题中可能会出现 YYYY-MM-DD HH:mm 或 YYYY-MM-DD 两种情况
    format: 'YYYY-MM-DD HH:mm',
    // 注意：在解析日期范围时，需要额外计算出日期范围的间隔时长，以小时为单位，四舍五入取整
  },
}