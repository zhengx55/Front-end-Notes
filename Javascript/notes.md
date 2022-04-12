### ES6 promise API
- promise.all - 全部Promise执行成功或者任意一个执行失败
- allSettled - 执行多个Promise 无论成功失败结果全部返回
- any - 接受一个Promise集合 返回第一个成功者
- race - Promise集合中 返回最快的Promise触发结果
- resolve
- reject

#### Promise 延迟函数
```
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

### 异常捕获
监听unhandleedrejection. 两种方式如下
```
window.addEventListener("unhandledrejection", () => {})
window.onunhandledrejection = event => {}
```

### 同步和异步
- 同步: 执行某个任务时, 没有得到结果之前, 不会继续后续的操作
- 异步: 一个异步任务执行后, 在没有得到结果之前, 就可以继续执行后续操作。异步任务完成后,一般通过回调通知调用者

### Async
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