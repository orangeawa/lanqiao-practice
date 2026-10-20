const ActivityCell = {
  template: /*html*/ `
    <div class="activity-cell" :class="{ 'has-left': hasLeft, 'has-right': hasRight, highlight: highlight }" :text="title">
      <span v-if="!hasLeft">{{ title }}</span>
    </div>
  `,
  props: {
    // 活动名称
    title: {
      type: String,
      default: "",
    },
    // 左侧是否存在同一场活动的单元格，如果当前日期等于活动的开始日期，该属性为false。
    hasLeft: {
      type: Boolean,
      default: false,
    },
    // 左侧是否存在同一场活动的单元格，如果当前日期等于活动的结束日期，该属性为false。
    hasRight: {
      type: Boolean,
      default: false,
    },
    // 是否高亮显示
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    return {
      props: Vue.toRefs(props),
    };
  },
};
