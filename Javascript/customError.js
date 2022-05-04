class CustomError extends Error {
  constructor(foo = "bar", ...params) {
    super(...params);
    // 检查错误中的堆栈信息
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    this.foo = foo;
    this.date = new Date();
  }
}

function trace() {
  try {
    throw new CustomError("baz", "bazMessage");
  } catch (e) {
    console.log("是否是MyError类型错误:", e instanceof CustomError);
    console.log("e.message:", e.message);
    console.log("e.name", e.name);
    console.log("e.foo", e.foo);
    console.log("e.date", e.date);
    console.log("e.stack:", e.stack);
  }
}

function b() {
  trace();
}

function a() {
  b();
}

a();

// try catch 方式捕获异常
const str = "aaaa";

try {
  JSON.parse(str);
} catch (e) {
  console.log("解析字符串错误");
} finally {
  console.log("finally处理");
}

// try catch 无法捕获异常的情况
//编译时错误，还没有执行到try catch
try {
  // 编译错误代码, 代码编译时直接异常 并未执行到try catch 作用域
} catch (e) {
  console.log("捕捉到错误", e.message);
}

//try catch 执行时
try {
  var a = {};
  a.b();
} catch (e) {
  console.log("捕捉到错误", e.message);
}

//try catch已经执行完毕,无法捕获
try {
  setTimeout(() => {
    var a = {};
    a.b();
  });
} catch (e) {
  console.log("捕捉到错误", e.message);
}

// window.onerror (全局JS异常捕获)
window.onerror = function (message, url, line, column, error) {
  console.log(
    "捕获到错误:",
    message,
    "==line:",
    line,
    "==column:",
    column,
    "==error:",
    error
  );
};
