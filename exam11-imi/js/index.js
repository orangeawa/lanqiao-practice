const app = new Vue({
  el: "#app",
  // 在此处补全代码，实现二级菜单搜索功能
  data: {
    text: "",
    da: [],
    tree: []
  },
  methods: {
    edit: function () {
      this.tree = this.da.filter((/** @type{{meta:{title:string},children?:{meta:{title:string}}[]}}*/i)=>i.meta.title.includes(this.text) || (i.children && i.children.some(i=>i.meta.title.includes(this.text))
      ));
    }
  },
   mounted() {
    axios.get('./data.json').then(i=>{
      this.da = i.data
      this.tree = this.da
    })

    
  }
});