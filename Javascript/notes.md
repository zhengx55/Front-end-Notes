### Array 中的注意事项
- indexOf 与 includes
   | 方法     | 返回值  | 能否查找NaN | [, ,] | undefined |
   | -------- | ------- | ----------- | ----- | --------- |
   | indexOf  | number  | x           | x     | yes       |
   | includes | boolean | yes         | yes   | yes       |

- length: 代表数组中元素个数, 数组额外付加属性不计算
  - length 可通过修改length 改变数组长度
- 改变自身的方法: pop shift splice unshift push sort reverse copyWithin fill

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