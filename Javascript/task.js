// 宏任务重产生微任务

console.log("main starting...");

setTimeout(() => {
  console.log("T1: 宏任务");
  Promise.resolve().then(() => {
    console.log("T2: 微任务");
  });
});

new Promise((resolve, reject) => {
  console.log("T3: Promise");
  setTimeout(() => {
    console.log("T4: 宏任务");
    resolve("T6");
    Promise.resolve().then(() => {
      console.log("T5: 微任务");
    });
  }, 300);
}).then((res) => {
  console.log("T6: 微任务");
});

/*
main starting...
T3: Promise
T1: 宏任务
T2: 微任务
T4: 宏任务
T6: 微任务
T5: 微任务
 */

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
