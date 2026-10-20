const Menu = {
  template: `
  <div class="menu-wrapper">
    <div class="menu">
      <div class="menu-unit" v-for="(item, index) in menuList">
        <div class="menu-icon">
          <img :src="item.icon" />
        </div>
        <div class="menu-detail">
          <div class="menu-title">
            {{ item.showTitle }}
          </div>
          <div class="menu-description">
            {{ item.showDescription }}
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: {
    menuList: Array,
  },
  setup(props) {
    const menuList = ref(props.menuList);
    return {
      menuList
    }
  },
};