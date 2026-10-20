import { ref, watch, computed } from "vue";
import { useCodeStore } from "/store/codeStore.js";

const Login = {
    setup() {
let code = ref('');
let ispass = ref(false);
//TODO：待补充代码 Start

const codeStore = useCodeStore() //引入codeStore
const providecode = computed(()=>codeStore.code || '000000') //从codeStore中获取验证码，如果没有则默认为'000000'

    //TODO：待补充代码 End
let verify = () => {
    //TODO：待补充代码
    ispass.value = (code.value === providecode.value) //比较输入的验证码和提供的验证码是否一致
}
        
        watch(providecode, (newVal, oldVal) => {
            code.value=newVal
            window.code = newVal;//检测需要，不要删除
        });
        return {
            code,
            verify,
            ispass
        }
    },
    template: `
    <div>
    <div class="title">
    <p>Two-factor authentication</p>
</div>
<div class="form">
    <div class="input_field">
    <label>Authentication code</label>
    <input id="codeinput" type="string" v-model="code" class="input">
    
</div>
<div class="btn">
        <input id="verify" type="button" @click="verify" value="Verify" class="verify_btn">
    </div>
    <p id="errorp" :class="ispass ? 'success' : 'error'">{{ispass? '验证成功' : '验证失败'}}</p>
    
</div>
<div class="desc">
    <p>Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.</p>
</div>
</div>
  `
}

export default Login;