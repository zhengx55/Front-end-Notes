const log = (...args) => console.log(...args);
// 数组空元素 empty
const a = [1, ,];

// 数组的空位, 指数组的某一位置没有实际值, 在运算时被看做为undefined
// join toString 中被看做空字符串 -> ''
const index = a.findIndex((v) => v === undefined);
log("空数组元素index:", index); // 1

//  数组高阶用法 --
//  随机数生成器
const createVaules = (creator, length = 10) => Array.from({ length }, creator);

const createRandom = (len) => createVaules(Math.random, len);
const value = createRandom();

log("values:", value);

// 序列生成器
const createRanges = (start, stop, step) =>
  createVaules((_, i) => start + i * step, (stop - start) / step + 1);

log("序列:", createRanges(1, 100, 5));

// 清空数组的两种方式
const arr = [1, 2, 3];
arr.splice(0);

const arr_2 = [1, 2, 3];
arr_2.length = 0;

// 数组求交集
// 引用类型
function intersect(arr1, arr2, key) {
  const map = new Map();
  arr1.forEach((val) => map.set(val[key]));

  return arr2.filter((val) => {
    return map.has(val[key]);
  });
}

// 原始数据类型
function intersectBase(arr1, arr2) {
  const map = new Map();
  arr1.forEach((val) => map.set(val));

  return arr2.filter((val) => {
    return map.has(val);
  });
}

var arr1 = [{ p: 0 }, { p: 1 }, { p: 2 }];
var arr2 = [{ p: 3 }, { p: 2 }, { p: 1 }];
const result = intersect(arr1, arr2, "p");
log("result:", result);

const arr3 = [0, 1, 2];
const arr4 = [3, 2, 0];
const result1 = intersectBase(arr3, arr4);
log("result1:", result1);

// 数组查找最大值和最小值
const numArray = [1, 3, 8, 666, 22, 9982, 11, 0];
const max = Math.max.apply(Math, numArray);
const min = Math.min.apply(Math, numArray);
log("max:", max + ",min:" + min);

// 数组的合并

// 模拟数据
const usersInfo = Array.from({ length: 200 }, (val, index) => {
  return {
    uid: `${index + 1}`,
    name: `user-name-${index}`,
    age: index + 10,
    avatar: `http://www.my-avatar.com/${index + 1}`,
  };
});

const scoresInfo = Array.from({ length: 10 }, (val, index) => {
  return {
    uid: `${index + 191}`,
    score: ~~(Math.random() * 10000),
    comments: ~~(Math.random() * 10000),
    stars: ~~(Math.random() * 1000),
  };
});

log("userInfo", usersInfo);
log("scoreInfo", scoresInfo);

// 使用方案 - 降低减少循环的次数以及循环的嵌套

// 方案一:创建键值对 一次循环完成合并

// 方案二:建立属性查找, 减少循环次数 
