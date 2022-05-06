// prototype

var obj = {};

console.log(obj.toString === Object.prototype.toString); // true

// Object 是 obj 的原型同时 也是 obj的构造函数

console.log(obj.constructor === Object); //true

// __proto__ 构造函数的原型
console.log(obj.__proto__ === obj.constructor.prototype);
// 等同于上面的Object

// 可以使用Object.getPrototypeOf 代替
console.log(Object.getPrototypeOf(obj) === obj.__proto__); //true

// 原型链(顶层)

var Person = function (name) {
  this.name = name;
};

console.log("Person.prototype:", Person.prototype); //对象

console.log("Person.prototype.__proto__:", Person.prototype.__proto__);

console.log(
  "Person.prototype.__proto__:",
  Object.getPrototypeOf(Person.prototype)
);

console.log(
  "原型链次顶层是否是Object.prototype:",
  Person.prototype.__proto__ === Object.prototype
);

console.log("原型链顶层:", Person.prototype.__proto__.__proto__);

// Function的原型
console.log("Function的原型:", Object.getPrototypeOf(Function)); // {}
// 函数的本质也是一个对象

//ES6 class 继承
class Father {
  shareAttr = 1000;
  constructor() {
    this.attr = "父亲";
    this.bankCard = [1000];
  }
  eat(params) {
    return `${this.name}吃${params}`;
  }

  say = () => {
    console.log("say==", say);
  };
}

class Child extends Father {
  constructor(name) {
    super();
    this.name = name;
    this.attr = "儿子";
  }
  run() {
    return `${this.name}正在跑步`;
  }
}

var p1 = new Child("张三");
p1.bankCard.push(20);

var p2 = new Child("李四");
p2.bankCard.push(30000);

console.log(
  "p1.name:",
  p1.name,
  "=p1.backCard:",
  p1.bankCard,
  "=",
  p1.eat("鲍鱼")
);
console.log(
  "p2.name:",
  p2.name,
  "=p2.backCard:",
  p2.bankCard,
  "=",
  p2.eat("肉")
);

console.log(p1.__proto__); // 原型链的上一层指向Father
