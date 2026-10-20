/**
 * 辅助函数，用于深拷贝对象
 * @param {Object} obj 
 * @returns 
 */
function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map((it) => deepClone(it));
  } else if (typeof obj === "object") {
    const result = {};
    for (let key in obj) {
      result[key] = deepClone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
}


/**
 * TODO: 待补充代码 目标 4
 * @param {Ref} someRef Vue的某个ref对象，需要对传入的ref对象的历史状态做记录 
 * @returns 返回一个对象，其中包含函数 undo 和 redo； undo 表示撤销，比如给 someRef 设置一个新状态后，调用 undo 可以将 someRef 还原为上一个旧状态；同理，在旧状态调用 redo 可以将 someRef 恢复为新状态
 */
function useRefHistory(someRef) {
  const { ref, watch } = Vue;

  let history = [deepClone(someRef.value)]
  let cindex = 0
  let state = false

  console.log('someRef', someRef);

  watch(someRef, (newValue, oldValue) => {

    if ( state ) return state = false
    if ( cindex !== history.length - 1 )
      history = history.splice( 0, state + 1 )
    
    history.push(deepClone(newValue))
    cindex = history.length - 1

    console.log(cindex,history.length);
  },{deep: true})
  

  function undo() {
    /**
     * 调用 undo 时，将 someRef 撤销为上一个状态
     */
    if (!cindex) return
    cindex--
    state = true
    someRef.value = deepClone(history[cindex])

    console.log(cindex);
  }

  function redo() {
    /**
     * 调用 redo 时，将 someRef 恢复为下一个状态
     */
    if (cindex >= history.length - 1) return
    cindex++
    state = true
    someRef.value = deepClone(history[cindex])

    console.log(cindex);
  }

  return {
    undo,
    redo,
  };
}
