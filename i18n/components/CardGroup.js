const CardGroup = {
  template: `
    <div class="card-wrapper">
      <div class="card" v-for="item in cardList">
        <div class="card-title">{{ item.showTitle }}</div>
        <div class="card-detail">{{ item.showDescription }}</div>
      </div>
    </div>
  `,
  props: {
    cardList: Array,
  },
  setup(props) {
    const cardList = ref(props.cardList);
    return {
      cardList
    }
  },
};