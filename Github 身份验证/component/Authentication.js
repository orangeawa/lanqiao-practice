import { ref, watch } from "vue";
import { useCodeStore } from "/store/codeStore.js";

const Authentication = {
    setup() {
        let code = ref('000000');
const GetCode = () => {
    //TODO：待补充代码
    code.value = Math.random().toString().slice(2, 8) //生成随机6位数验证码
    const codeStore = useCodeStore() //引入codeStore
    codeStore.code = code.value //将验证码存储到codeStore中
}
        watch(code, (newVal, oldVal) => {
            window.providecode = newVal //检测需要，不要删除
        });
        return {
            code, GetCode
        }
    },
    template: `
  
    <div class="auth-container">
    <span class="close">✕</span>
    <div class="auth-title">
    <p>Google 身份验证器</p>
    </div>
      <h3>Authentication Generate Plug-in</h3>
       <div class="code-container"> <span class="code" id="code">{{ code }} </span> <span id="getcode" class="button" @click="GetCode">获取验证码</span></div>
      </div>
  `
}

export default Authentication;