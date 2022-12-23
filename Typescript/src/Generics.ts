// 普通函数

function fn(a: number): number {
  return a;
}

// 当返回值未知的情况
function fn_unknown<T>(a: T): T {
  return a;
}

let result = fn_unknown(10); // 不指定
let result2 = fn_unknown<string>("1"); // 指定

function fn2<T, K>(a: T, b: K): T {
  return a;
}

interface Inter {
  length: number;
}

// 指定泛型类
// T 必须是Inter的实现类
function fn3<T extends Inter>(a: T): number {
  return a.length;
}
