const getUrlParams = (url = "") => {
  // TODO：待补充代码 目标 2 
  const jso = {}
  // url.replace(/(\S+)\?(\S+)/,(a,v1,v2)=>{
  //   v2.split("&").forEach(i=>{
  //     const val = i.split("=")
  //     console.log(val);
  //     jso[val[0]] = val[1]
  //   })
  //   return a
  // })

  const searchParams =new URL(url).searchParams

  return Object.fromEntries(searchParams)
  // TODO：END
}

window.getUrlParams = getUrlParams;


// 目标 2 测试用例 
console.log(getUrlParams(`http://127.0.0.1:5501/index.html?page=1`)) 
// 输出结果为：{page: '1'}
console.log(getUrlParams(`http://example.com?id=2&name=tom`))
// 输入结果为：{id: '2', name: 'tom'}
