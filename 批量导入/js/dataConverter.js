
// 针对每个数据类型，将日志矩阵中接收到的数据转换为表格中需要的数据

const appendZero = (num) => String(num).length === 1 ? `0${num}` : num

const resolveDate = (fullDate) => {
  const year = appendZero(fullDate.getFullYear());
  const month = appendZero(fullDate.getMonth() + 1);
  const date = appendZero(fullDate.getDate());
  const hours = appendZero(fullDate.getHours());
  const minutes = appendZero(fullDate.getMinutes());
  const seconds = appendZero(fullDate.getSeconds());
  return {
    year, month, date, hours, minutes, seconds
  }
}

const dataConverter = {
  // 日志时间戳
  'LOG_TIME_STAMP': (data) => {
    const fullDate = new Date(data.tempData[0])
    const {
      year, month, date, hours, minutes, seconds
    } = resolveDate(fullDate)
    return {
      type: 'LOG_TIME_STAMP',
      value: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    };
  },
  // 日志等级
  'LOG_LEVEL': (data) => {
    const num = data.tempData[0]
    const text = data.currentTypeDefine.resolveType[num]
    const value = {
      text,
      color: data.currentTypeDefine.colorPreset[text]
    }
    return {
      type: 'LOG_LEVEL',
      value
    }
  },
  // 日志文本
  'LOG_TEXT': (data) => {
    return {
      type: 'LOG_TEXT',
      value: data.tempData[0]
    }
  },
  // 数字范围
  'NUMBER_RANGE': (data) => {
    const numberFixed = data.currentTypeDefine.numberFixed
    const start = data.tempData[0].toFixed(numberFixed)
    const end = data.tempData[1].toFixed(numberFixed)
    return {
      type: 'NUMBER_RANGE',
      value: `${start} ~ ${end}`
    }
  },
  // 日期范围
  'DATE_RANGE': (data) => {
    // 注意：在解析日期范围时，需要额外计算出日期范围的间隔时长，以小时为单位，四舍五入取整
    const startTime = resolveDate(new Date(data.tempData[0]))
    const endTime = resolveDate(new Date(data.tempData[1]))
    const format = data.currentTypeDefine.format
    const range = ((data.tempData[1] - data.tempData[0]) / 3600000).toFixed(0) // 3600000: 1000 * 60 * 60，从毫秒转换到小时
    if (format === 'YYYY-MM-DD HH:mm') {
      return {
        type: 'DATE_RANGE',
        value: {
          startTime: `${startTime.year}-${startTime.month}-${startTime.date} ${startTime.hours}:${startTime.minutes}`,
          endTime: `${endTime.year}-${endTime.month}-${endTime.date} ${endTime.hours}:${endTime.minutes}`,
          range,
        }
      }
    } else if (format === 'YYYY-MM-DD') {
      return {
        type: 'DATE_RANGE',
        value: {
          startTime: `${startTime.year}-${startTime.month}-${startTime.date}`,
          endTime: `${endTime.year}-${endTime.month}-${endTime.date}`,
          range,
        }
      }
    }
  },
}