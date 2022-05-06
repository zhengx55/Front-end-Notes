### 对象
- 对象的属性遍历
  [object_key_loop](object_key_loop.js)
  - 属性分为 普通属性, 原型属性, 不可枚举的属性, Symbol属性, 静态属性
  
- JSON对象
  - 一种文本协议
  - 是Object对象, 一种轻量级, 基于文本, 与语言无关的写法, 用于定义数据的交换格式
  - key只能是字符串
  - value 只能是obj array number string true false null
  - undefined Symbol 不能作为JSON对象的value
- 对象的克隆
  - 浅克隆: 只克隆对象的第一层级
    - 如果属性只是原始数据类型, 进行只拷贝
    - 如果属性是引用类型, 拷贝其内存地址
    - 常用的浅克隆方式: es6 拓展运算符, Object.assign()
  - 深克隆
    - 克隆对象的每个层级, 不影响源对象, 但性能方面较低
      - JSON.stringify + JSON.parese
        - 只能复制普通的属性, Symbol类型不能复制
        - 循环引用对象, 比如Window不能复制
        - 函数类型不能复制
      - 手动实现深度克隆
     ``` javascript
     // 缺陷: 循环引用没法处理, 递归消耗大, 特殊类型为处理
     function deepClone(obj){
       if(!isObject(obj))return obj
       // 判断属性是否为数组
       // 由于数组会将非数字属性忽略
       const data = isArray(obj) ? []: {}
       if(isObject(obj)){
         data = {};
         for(let key in obj){
           if(obj.hasOwnProperty(key)){
             data[key] = deepClone(obj[key]);
           }
         }
       }
     }
     ``` 
     [deepClone](deepClone.js)
     用循环来代替递归
     并处理特殊类型
     [perfect](deepClone_perfect.js)

### 链式调用
实现一个链式调用的计算器代码
```javascript
  class Calculator {
    constructor(val) {
        this.val = val;
    }

    double() {
        const val = this.val * 2;
        return new Calculator(val)
    }

    add(num) {
        const val = this.val + num;
        return new Calculator(val)
    }

    minus(num) {
        const val = this.val - num;
        return new Calculator(val)
    }

    multi(num) {
        const val = this.val * num;
        return new Calculator(val)
    }

    divide(num) {
        const val = this.val / num;
        return new Calculator(val)
    }

    pow(num) {
        const val = Math.pow(this.val, num);
        return new Calculator(val)
    }

    get value() {
        return this.val;
    }
}

const cal = new Calculator(10);

const val = cal.add(10) // 20
    .minus(5) // 15
    .double() // 30
    .multi(10) // 300
    .divide(2) // 150
    .pow(2)   // 22500
    .value;
console.log(val); // 22500
```


### Array 中的注意事项
- indexOf 与 includes
   | 方法     | 返回值  | 能否查找NaN | [, ,] | undefined |
   | -------- | ------- | ----------- | ----- | --------- |
   | indexOf  | number  | x           | x     | yes       |
   | includes | boolean | yes         | yes   | yes       |

- length: 代表数组中元素个数, 数组额外付加属性不计算
  - length 可通过修改length 改变数组长度
- 改变自身的方法: pop shift splice unshift push sort reverse copyWithin fill

### 作用域
  - 作用域链: 作用域也可以根据代码层次分层, 以便子作用域可以访问父作用域, 而不能从父作用域引用子作用域中的变量和引用 
  - 全局作用域
  - 函数作用域
  - 块级作用域
  - 执行上下文vs作用域:
    - 创建时间:
      - 作用域: 函数创建时已确定, 静态运行
      - 上下文: 运行时创建, 动态运行
  - 执行上下文: js 代码被解析和执行时的环境
    - this
    - 变量环境
    - 词法环境: let, const(ES6 新增)
    - 外部环境
    - 代码在编译时的查找顺序, 从词法环境开始逐步查找到变量环境再到外部全局环境
    - 上下文：
      - 全局执行上下文
      - 函数执行上下文: 函数每次在调用时动态创建的上下文. 执行栈。栈的数量是有限制的, 尽可能不要超出调用堆栈的创建数量(递归爆栈)

### 原型链
[原型与原型链](proto.js)
  - 借鉴Self语言, 基于原型实现的继承机制
  - 共享数据, 减少空间占用, 节省内存
  - 实现继承
  - prototype, constructor, __proto__
    - prototype 本质是一个普通对象, 普通对象都有__proto__属性
      - 节省内存,实现继承和代码复用
    - 普通函数或者class既有prototype属性, 又有__proto__属性
    - __proto__: 一个访问器属性(一个getter函数和一个setter函数, 暴露了通过它访问的对象的内部[[Prototype]])
      - 已经出现新的调用方式: Object.getPropertyof()
      - 构造函数的原型
      - 根据此属性形成原型链, 原型链的终点为null 
   
### 闭包

### 暂时性死区
- let和const 生命的变量在复制之前不能对齐进行操作或者赋值

### IIFE- 立即执行函数
- 常用于插件的编写
- 可以通过一元运算符触发IIFE
  ``` javascript
  (function(num1,num2){
    console.log(num1+num2);
  })(7,9);

  (function(num1,num2){
      console.log(num1+num2);
  }(7,9));

  function (num1,num2){
      console.log(num1+num2);
  }(7,9)
   ```

### 不同页面之间的交流通信方式
- websocket / Socketio: 通过服务端进行中转发送到不同的客户端
- 定时器 以及 客户端存储 : 本地存储 与 本地轮询, cookie产生网络负担, 并受到同源策略限制
- postMessage: 建立窗口间的联系, 通过postMessage进行跨窗体通讯, iframe
  ```html
    <!-- 引用另外的窗体 -->
    <div>
        <iframe src="./ifr.html" id="ifr" style="width:600px; height:300px"></iframe>
    </div>

    index.html

    <div>
        <div>Message:</div>
        <div id="messages"></div>
    </div>
    <script>

        window.addEventListener("message", function (event) {
            messages.innerHTML += `
                <div>${event.data}</div>  
            `
        })
        <!-- 定时向对应窗体对象发送信息 -->
        setInterval(() => {
            ifr.contentWindow.postMessage(`message from index.html, ${Date.now()}`)
        }, 3000)

    </script>

  ```
- StorageEvent: 当前页面使用的storage被其他页面修改时会触发StorageEvent事件
  - 缺点: 传递数据大小限制, 同源策略, 相同窗口无法监听, 需要数据清理等
  ```html
   <!--first page-->
      <body>
      <form>

          <div>
              <button id="btnSend" type="button">发送消息</button>
          </div>
          <div>消息:</div>
          <div id="message"></div>
          <script>
              // 拦截，监听事件
              const oriSetItem = localStorage.setItem;
              Object.defineProperty(localStorage.__proto__, 'setItem', {
                  value: function (key, value) {
                      var oldValue = localStorage.getItem(key);
                      var event = new StorageEvent('storage', {
                          key,
                          newValue: value,
                          oldValue,
                          url: document.URL,
                          storageArea: localStorage
                      });
                      window.dispatchEvent(event);
                      oriSetItem.apply(this, arguments);
                  }
              })

          </script>
          <script>
              btnSend.addEventListener('click', function () {
                  localStorage.setItem('key', JSON.stringify({
                      key: "key",
                      data: Math.random()
                  }))
              })
              // 此处的事件监听不生效, 说明相同窗体无法监听到storage事件
              window.addEventListener("storage", function (ev) {
                  console.log("ev:", ev);
                  message.textContent = JSON.stringify({
                      oldValue: ev.oldValue,
                      newValue: ev.newValue
                  })
              })
          </script>

      </form>
  </body>
  ```

  ``` html
  <!-- second page -->
    <body>

      <div>消息:</div>
      <div id="message"></div>
      
      <script>
          window.addEventListener("storage", function (ev) {
                  console.log("ev:", ev);
                  message.textContent = JSON.stringify({
                      oldValue: ev.oldValue,
                      newValue: ev.newValue
                  })
              })
      </script>
  </body>
  ```
  
- BroadcastEvent: 允许同源的不同浏览器窗口或者iframe下的不同文档之间的相互通讯
  ``` javascript
    var channel = new BroadcastChannel('my-channel');
    channel.postMessage('hello')

    // other page -->
    var listener = new BroadcastChannel('my-channel');
    channel.addEventListener("message", (e) => console.log(e.data))
  
  ```
- MessageChannel: Chanel Messageing api 的 MessageChannel接口允许我们创建一个新的消息通道, 并通过它的messagePort属性发送数据
- SharedWorker

### 事件循环


### ES6 promise API
- promise.all - 全部Promise执行成功或者任意一个执行失败
- allSettled - 执行多个Promise 无论成功失败结果全部返回
- any - 接受一个Promise集合 返回第一个成功者
- race - Promise集合中 返回最快的Promise触发结果
- resolve
- reject

#### Promise 延迟函数
```javascript
function delay(fn, delay, context) {
  let defaultDelay = delay || 5000;
  if (!isFunction(fn)) {
    return {
      run: () => Promise.resolve(),
      cancel: noop,
    };
  }
  let ticket;
  let executed = false;
  return {
    run(...args) {
      return new Promise((resolve, reject) => {
        if (executed === true) {
          return;
        }
        executed = true;
        ticket = setTimeout(async () => {
          try {
            const res = await fn.apply(context, args);
            resolve(res);
          } catch (error) {
            reject(error);
          } finally {
            clearTimeout(ticket);
          }
        });
      });
    },
    cancel: () => {
      clearTimeout(ticket);
    },
  };
}
```
---

### 异常捕获
监听unhandleedrejection. 两种方式如下
```
window.addEventListener("unhandledrejection", () => {})
window.onunhandledrejection = event => {}
```
---------------------

### 同步和异步
- 同步: 执行某个任务时, 没有得到结果之前, 不会继续后续的操作
- 异步: 一个异步任务执行后, 在没有得到结果之前, 就可以继续执行后续操作。异步任务完成后,一般通过回调通知调用者
    - 回调的缺点:回调地狱, 高度耦合, 不利维护等缺点

### Async
[promise.js](promise.js)
- Generator 函数(生成器函数)(符合可迭代协议和迭代器协议)
  - yield表达式, 遇到yield会暂停执行代码, 等待外面调用next并返回对应状态值知道遇到return
  - Generator对象(返回)
  - next: 获取下一个状态
  - return: 结束生成器
  - throw: 抛出异常
- 迭代器协议
  - 定义了产生一系列值得标准方式,当值为有限个时,所有的值都被迭代完毕之后,则返回一个默认值
- 可迭代协议
  - 允许JS对象定义它们的迭代行为
- Async 函数的本质由generator 函数实现, 一种新的语法糖
  ```
  async function test() {
      const r1 = await 1;
      const r2 = await 2;
  }
  

  ES6:
  __awaiter(this, void 0, void 0, function *(){
      const r1 = yield 1;
      const r2 = yield 2;
  })
  ```

  - async 函数中, 不是所有异步代码都需要await, 应根据业务逻辑判断.


#### 动画
- css: animation:
  - animation-name
  - animation-duration
  - animation-timing-function
  - animation-delay
  - animation-iteration-count: 动画结束前运行的次数
  - animation-direction: 动画播放方向, 默认为normal:
    - normal
    - alternate: 动画交替反向播放
    - reverse: 动画反向播放
    - alternate-reverse: 反向开始交替播放
  - animation-fill-mode: 动画执行之前和之后如何将样式应用与目标
    - default: none
    - forwards: 保留最后一帧
    - backwards(开始动画之前应用第一帧)
    - both
  - animation-play-state: k控制动画运行或者暂停:
    - running
    - pause

- 动画事件监听: webkit-animationEnd, webkitAnimationStart, webkitAnimationIteration
- css Transition 事件:
  - transitioncancel
  - transitionend: 过渡结束事件
  - transitionrun: 过度进行事件
  - transitionstart: 
- 动画注意事项
  - css动画可以开启GPU 加速, js冬花同样也可以设置translate3d或者matrix3d来开启GPU加速
  - GPU 有图像存储限制,
  - 不是所有css属性都能获得GPU加速
  - GPU加速同样也有开销
  - 大多数css属性都会引起重绘
  - 两个状态之间的简单切换可使用css动画
  - 复杂动画可使用JS动画进行控制
- Web Animation API




#### Proxy 对象
- 创建一个对象的代理, 从而实现基本操作的拦截和自定义 - 查找,赋值 枚举 调用等
- 通过 Proxy 构造器初始化
- target: 要使用Proxy 包装的目标对象
- handler: 一个对象, 个属性中的函数分别定义了在执行各种操作代理的行为。 每个属性, 代表一种可以代办的事项 has, get， set， deletProperty 等
  - get, set- 读取和设置捕获器


#### 异常处理
[customError.js](customError.js)
- 错误类型:
  - 语法错误
  - 逻辑错误
  - 错误对象:
    - SyntaxError
    - TypeError
    - URIError
    - AttregateError: 包含多个错误的错误类型对象
    - Error: 基础错误类型
    - RangeError
    - ReferenceError: 引用错误
  - 自定义错误类型:
    - catch 中的内容: 在js中 throw关键字可以将错误抛出, 但是throw不仅能抛出错误对象还可以抛出基本数据类型
   ```javascript
   throw '22';
   throw 22;
   throw {a: 1}
   ```
   ES6 中实现自定义Error类型
   ``` javascript
    class CustomError extends Error {
      // 检查foo 是否 等于 bar
    constructor(foo = "bar", ...params) {
      super(...params);
      // 检查错误中的堆栈信息
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }

      this.name = "MyError";
      this.foo = foo;
      this.date = new Date();
      }
  } 
   ```
   - 异常类型的判断
     - instanceof
     - constructor
     - Error.Prototype.name
  ``` javascript
    const error = new TypeError();
    error instanceof TypeError;
    error.constructor === TypeError;
    error.name === 'TypeError'
    // 注意 后两种方法可能会发生改写
   ```
   #### 异步异常事件
   - unhandledrejection: 当Promise被reject且没有reject处理器的时候, 会触发unhandledrejection事件
   - rejectionHandled: 当Promise被rejected且有rejection处理器时会在全局触发rejectionhandled事件

  ``` javascript
      window.addEventListener("unhandledrejection", function (e) {
            //阻断异常继续抛出
            e.preventDefault();
            console.log("unhandledrejection捕获到promise错误的原因是：", e.reason);
            console.log("unhandledrejection Promise 对象是：", e.promise);
            return true;
        });
        //promise异常被处理了, 该事件被捕捉到了
        window.addEventListener('rejectionhandled', e => {
             // rejected的原因
            console.log('rejectionhandled:', e.reason);
        })

        const p1 = new Promise((resolve, reject) => {
            reject("promise error1");
        });

        setTimeout(() => {
            p1.catch((e) => {
                console.log("catch捕获到promise1 错误:", e);
            })
        }, 1000)
  ```

  ### 装饰器 Decorator
  [Decorator.js](Decorator.js)
  - 他是一个包装, 类对象, 方法, 以及属性
  - 在js 以函数的形式存在
  - 装饰器对类的行为的改变是在代码编译时发生

### SessionStorage vs LocalStorage
- SessionStorage: 为每一个给定的源维持一个独立的存储区域, 该存储区域在页面会话期间可
- localStorage: 同样的功能, 但是在浏览器关闭后数据仍然存在
- sessionStorage 和 localStorage统称为Web Storage(API)
- 都遵循同源策略, 并拥有相同的储存容量
- 都是存储字符, 保存对象的时候寻要转义为字符串, 通常使用JSON.stringify()


```typescript
 
 ```


 ### DOM 节点
- Node: 一个借口
- Element: 通用性的基类, nodeType为1, 是Node的一类实现。 其子类统统称为元素
- HTMLCollenction: Element子类集合
- NodeList: 所有Node子类结合
  -方法:
    - getElementById:
      - 只返回元素, nodeType为1的Element
      - id大小写敏感
      - 如果有多个元素有相同Id, 只返回第一个元素
      - 此方法仅仅存在于Document实例上
    - getElementsByClassName:
      - 返回结果是实时元素集合, 但并不是数组形式
      - 可以同时匹配多个class
      - 元素均拥有此方法, 不限于document
    - getElementsByName:
      - 返回实时的节点集合NodeList
      - 包括不能被解析的节点(指吴小姐点)
      - 此方法仅存在于Document的实例上
    - getElementByTagName:
    - querySelector
      - 根据css选择器进行节点查询
      - 仅仅返回第一个元素
      - 元素都有此方法
      - 注意css的转义字符(Js 字符串转义一次, quertySelector 再字符串转移一次)
    - querySelectorAll
      - 返回节点列表NodeList
      - 注意: 返回的节点列表是静态列表, 对列表进行操作不会对原返回值进行改变
      - scope 前缀, 精准查找, 防止返回非预期列表
  - NodeList 和 元素集合的遍历
    - for/while
    - NodeList.prototype.forEach
    - 转换成数组
  - 遍历某个节点或者子节点或者整个元素的遍历
    - children/childNodes
    - NodeIterator Vs TreeWalker
      - TreeWalker 额外支持 parentNode, nextSibiling, firstChild, lastChild

```html 
<body>
    <div class="outer" id="outer">
        <!-- 测试-->
        <ul class="list list-1">
            <li name="li-item" class="item item2 item3">list-one</li>
            <li class="item">list-two</li>
            <li class="item">list-three</li>
        </ul>
    </div>
    <div class="outer2" id="outer"></div>
    <div id="foo\bar">ccc</div>

    <script>
        const iterator = document.createNodeIterator(
            document.getElementById("outer"),
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return node.tagName === 'LI' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );
        var currentNode;
        while (currentNode = iterator.nextNode()) {
            console.log(currentNode.innerText)
        }

    </script>
</body>
```