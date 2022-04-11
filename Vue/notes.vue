<template></template>

<script>
import { reactive, ref, toRefs, watch, watchEff } from "vue";
export default {
    name: "demo",
    setup() {
        const numberRef = ref(100);

        const state = reactive({ name: 'a', age: 1 })

        // 第一个参数用于确定监听的属性
        // 第二个参数用于监听后的回调
        // 第三个参数用于配置项
        watch(numberRef, (new, old) => {
            console.log('ref watch', new, old)
        }, {
            immediate: true //初始化之前就进行监听
        });

        // watchEffect
        watchEffect(() => {
            //初始化后自动执行 用于收集监听属性
            console.log(state.name) // 自动监听state的name属性
        })


        return { numberRef, toRefs(state) }
    },
};
</script>
