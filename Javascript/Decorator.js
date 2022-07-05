// 类装饰器接受一个参数, target参数指的是类本身
function addFly(target) {
  target.prototype.isFly = true;
}

@addFly
class Man {
  name = "";
  hp = 0;
  constructor(name, hp = 3) {
    this.init(name, hp);
  }
  init(name, hp) {
    this.name = name;
    this.hp = hp;
  }
}

// 类装饰器 -传参
// 由上到下依次对装饰器表达式求值
// 求值的结果会被当做函数, 由上至下调用

// 属性装饰器
function propertyReadOnly(target, property, descriptor) {
  // 将属性改写为只读
  descriptor.writable = false;
}

// 类装饰器- 重载构造
function classDecorators(constructor) {
  return class extends constructor {
    hp = 100;
  };
}
@classDecorators
class Mans {
  name = "";
  hp = 0;
  @propertyReadOnly readonly = "haha";
  constructor(name, hp = 3) {
    this.init(name, hp);
  }
  init(name, hp) {
    this.name = name;
    this.hp = hp;
  }
}

// 案例: 有参数的方法装饰器
function methodDecorator(moreHp = 0) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    // 方法重写
    descriptor.value = function (...args) {
      console.log("当前参数");
      args[1] = args[1] + moreHp;
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// 访问器装饰器

// 装饰器模式案例

Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};

var base = () => {
  console.log("base");
};

var extend = () => {
  console.log("extend");
};

base = base.after(extend);
// base 的基础上添加了extend方法的调用
base();
