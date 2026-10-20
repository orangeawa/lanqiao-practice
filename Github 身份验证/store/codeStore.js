import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCodeStore = defineStore('code', () => {
    const code = ref('')
    return {
        code
    }
})