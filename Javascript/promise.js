const myPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("Promise fulfilled!! You win🇩🇪");
  } else {
    reject("Promise rejected !! You Lose");
  }
});

myPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("1");

const p1 = new Promise((resolve) => {
  console.log("2");
  // 请注意
  resolve("resolve");
  //不会终止，会继续执行后面的代码
  console.log("继续执行");
});

// 微任务
p1.then((result) => {
  console.log("p1 result");
});

// 宏任务
setTimeout(() => {
  console.log("3");
});

console.log("4");

const p2 = new Promise((resolve, reject) => {
  resolve(5);
  throw new Error("自定义错误");
});

p2.then((res) => {
  //不会执行
  console.log("res1", res);
  return res + 1;
})
  .then((res) => {
    //不会执行
    console.log("res2", res);
  })
  .catch((e) => {
    console.log("reject 错误：", e);
  });

const p3 = new Promise((resolve, reject) => {
  resolve(5);
});

p3.then(1)
  .then((res) => {
    console.log("res2", res);
    return 2;
  })
  .catch((e) => {
    console.log("reject 错误：", e);
  });

// promise.race 用法
let r1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("执行p1");
    resolve("https://aaa.flv 开始播放");
  }, 5000);
});
let r2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("执行p2");
    resolve("https://bbb.flv 开始播放");
  }, 2000);
});
// r3 执行, r1 , r2 并不执行
let r3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("执行p3");
    reject("https://ccc.flv 播放失败");
  }, 1000);
});

Promise.race([r1, r2, r3]).then((res) => {
  console.log("已经获取到合适的结果了===", res);
});
