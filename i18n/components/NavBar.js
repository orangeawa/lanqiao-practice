const NavBar = {
  template: `
  <div class="nav-container-wrapper">
    <div class="nav-container-inner">
      <div class="nav-left">
        <img src="./images/logo.png" />
      </div>
      <div class="nav-mid">
        <ul>
          <li v-for="(item, index) in navList" :class="item.active ? 'active' : ''">{{item.showTitle}}</li>
        </ul>
      </div>
      <div class="nav-right">
        <select v-model="selectLang" id="lang-select"> 
          <option value="zh_CN__light">简体中文（light）</option>
          <option value="en_US__light">English（light）</option>
          <option value="ja_JP__light">日本語（light）</option>
          <option value="zh_CN__dark">简体中文（dark）</option>
          <option value="en_US__dark">English（dark）</option>
          <option value="ja_JP__dark">日本語（dark）</option>
        </select>
      </div>
    </div>
  </div>
  `,
  props: {
    navList: Array
  },
  setup(props, ctx) {
    const navList = ref(props.navList)
    // 获取默认的 url 值
    const langFromStorage = sessionStorage.getItem('lang')
    const selectLang = ref(langFromStorage ? langFromStorage : 'zh_CN__light')
    // TODO: 待补充代码 目标 3 
    watch(selectLang,(newQ,oldQ)=>{
      let q = newQ.split("__")
      history.replaceState({},null, `?lang=${q[0]}&theme=${q[1]}`);
      ctx.emit('url-change')
    })
    // TODO: END
    return {
      navList,
      selectLang
    }
  },
};