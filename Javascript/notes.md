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
 