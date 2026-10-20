const { reactive, computed, ref } = Vue
const { ElMessage, } = ElementPlus

// 格式化日期，去掉时分秒
const normalizeDate = (date) => {
  const t = new Date(date).setHours(0, 0, 0, 0)
  return new Date(t)
}

// 生成示例活动事件
const generateActivityDate = (day) => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  return normalizeDate(`${year}-${month}-${day}`)
}

const App = {
  setup() {
    // 活动列表
    /** @type{array} */
    const activities = reactive([
      {
        // 唯一id
        id: 1,
        // 活动名称
        title: '示例活动1',
        // 开始时间
        startTime: generateActivityDate(9),
        // 结束时间
        endTime: generateActivityDate(12),
      },
      {
        // 唯一id
        id: 2,
        // 活动名称
        title: '示例活动2',
        // 开始时间
        startTime: generateActivityDate(15),
        // 结束时间
        endTime: generateActivityDate(17),
      },
      {
        // 唯一id
        id: 3,
        // 活动名称
        title: '示例活动3',
        // 开始时间
        startTime: generateActivityDate(20),
        // 结束时间
        endTime: generateActivityDate(22),
      },
    ])

    // 活动编辑弹窗是否可见
    const dialogVisible = ref(false)

    // TODO 待补充代码 目标2 打开编辑弹窗
    const form = reactive({ id: 0, time: [], title: '' })
    let i = null
    let id = activities.length
    const openEditModal = (a, index) => {
      [dialogVisible.value, i] = [true, a ? index : null];
      Object.assign(form, { id: 0, title: '', time: [] }, a ? { ...a, time: [a.startTime, a.endTime] } : {});
    };

    // 删除一场活动
    const handleRemove = () => {
      // TODO 待补充代码 目标2 删除本场活动
      if (i == null) return
      activities.splice(i, 1)
      // TODO END
      ElMessage.success('删除成功')
      dialogVisible.value = false
    }

    // 新增或修改一场活动
    const handleSubmit = async () => {
      // TODO 待补充代码 目标2 编辑或新增活动信息
      if (i === null) {
        id++
        activities.push({ ...form, startTime: form.time[0], endTime: form.time[1], id })
      } else{
        activities[i] = { ...form, startTime: form.time[0], endTime: form.time[1] }
      }
      // TODO END
      // 将日程进行排序，优先按照活动开始时间进行从早到晚排序，如果开始时间一致，那么活动结束时间结束越早，排序位置应该越靠前。
      activities.sort((a, b) => {
        const aStart = normalizeDate(a.startTime)
        const bStart = normalizeDate(b.startTime)
        if (aStart !== bStart) {
          return aStart - bStart
        }
        return normalizeDate(a.endTime) - normalizeDate(b.endTime)
      })
      dialogVisible.value = false
      ElMessage.success('修改成功')
    }

    const cIndex = ref(0)
    const currentTime = computed(() => {
      // TODO 待补充代码 目标3 获取当前高亮活动的开始时间
      return activities[cIndex.value].startTime
    })

    return {
      normalizeDate,
      activities,
      dialogVisible,
      openEditModal,
      handleRemove,
      handleSubmit,
      currentTime,
      cIndex,
      form,
    }
  }
};
const app = Vue.createApp(App);
app.use(ElementPlus, {
  locale: ElementPlusLocaleZhCn,
})
// 注册日程单元格组件
app.component('activity-cell', ActivityCell)
app.mount(" #app"); 
