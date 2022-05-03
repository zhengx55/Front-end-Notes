### v-if 和 v-show的区别
    ·v-show 通过css display 控制显示和隐藏
    ·v-if 切换组件真正的销毁和渲染UI那次频繁切换的组件应优先考虑v-show

### v-for 中key的使用
diff 算法中通过tag和key来判断是否为sameNode

### readonly shallowReadonly
- readonly:
  - 深度只读数据
  - 只获取一个对象或ref返回原始代理的只读代理
  - 只读代理的代理是深层的: 访问的任何嵌套property也是只读的
- shallowReadonly:
  - 浅只读数据
  - 传建一个代理, 使其自身的property为只读, 但不执行嵌套对象的深度只读转化
- 在某些特定的情况下, 我们不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或者删除

### toRef toRefs
- toRef: 
  - 把响应式对象数据中的某个属性暴露为ref对象
  ```vue
    const state = reactive({age: '22', name: 'haha'});
    const age = toRef(state, 'age')
    const age_2 = ref(state.age)
    // age 和 age_2 都是响应式对象, 但age 属于从state中拷贝出来的数据, 所以更改age的时候 state中的age属性也会被更改, 但修改age_2 并不会对state本身造成影响
   ```

### Vue 组件常用的通讯方式
父子组件props和this.$emit
自定义事件
vuex
provide-inject vue3.0

### 双向数据绑定
input 元素的value = this.name
绑定input事件this.name = $event.target.value
data 更新触发 rerender

### MVVM 的理解 *


### computed的特点
使用了缓存变量, 不变值不会重新计算，提高性能

### data 为什么必须是一个函数
xxx.vue 文件编译后返回一个class,在实例化后data必须要以函数的形式定义, 以免引起变量污染.

### Vue3 对于 Vue2 的优势
性能优势 性能优化方面更加全面
体积更小 相对于vue2进行了进一步压缩
更好的Typescript支持
composition API 带来更好的代码组织以及逻辑抽离

### Vue3 如何使用proxy实现响应式
- 核心:
  - 通过Proxy代理: 拦截对data任意属性的操作, 包括增删改查
  - 通过Reflect反射: 动态对被代理对象的相应属性进行特定的操作
  <br/>
  ``` javascript
  const target = {
  name: "zx",
  age: "20",
  sex: "male",
  experience: {
    a: { year: "1" },
    b: { year: "2" },
  },
  };
    // 通过代理对象对目标对象进行读取，增加/删除/更新属性
    // convert obj target into proxy object
    // param - target object
    // param - handler options
    const proxyTarget = new Proxy(user, {
    get(target, prop) {
        return Reflect.get(target, prop);
    },
    set(target, prop, val) {
        return Reflect.set(target, prop, val);
    },
    deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    },
    }); 

### Vue如何更新后获取最新DOM
- $nextTick (异步渲染框架)
- data 改变之后 DOM不会立刻被渲染
- $nextTick 会在DOM渲染之后被触发, 以获取最新的DOM节点, 当需要第一时间获取页面更新后的DOM信息

### Vue 中缓存组件
- keep alive 缓存组件
- 频繁切换但并不需要重复渲染的组件

### watch 和 watchEffect的区别
- 两者都可以监听data属性变化
- watch 需要明确监听哪个属性
- watchEffect 会跟据区中的属性, 自动监听其变化
  
```vue
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
}
``` 

