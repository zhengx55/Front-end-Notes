var _class, _class2, _class3, _descriptor;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// 类装饰器接受一个参数, target参数指的是类本身
function addFly(target) {
  target.prototype.isFly = true;
}

let Man = addFly(_class = class Man {
  name = "";
  hp = 0;

  constructor(name, hp = 3) {
    this.init(name, hp);
  }

  init(name, hp) {
    this.name = name;
    this.hp = hp;
  }

}) || _class; // 类装饰器 -传参
// 由上到下依次对装饰器表达式求值
// 求值的结果会被当做函数, 由上至下调用
// 属性装饰器


function propertyReadOnly(target, property, descriptor) {
  // 将属性改写为只读
  descriptor.writable = false;
} // 类装饰器- 重载构造


function classDecorators(constructor) {
  return class extends constructor {
    hp = 100;
  };
}

let Mans = classDecorators(_class2 = (_class3 = class Mans {
  name = "";
  hp = 0;
  readonly = _initializerWarningHelper(_descriptor, this);

  constructor(name, hp = 3) {
    this.init(name, hp);
  }

  init(name, hp) {
    this.name = name;
    this.hp = hp;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "readonly", [propertyReadOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return "haha";
  }
})), _class3)) || _class2; // 案例: 有参数的方法装饰器


function methodDecorator(moreHp = 0) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value; // 方法重写

    descriptor.value = function (...args) {
      console.log("当前参数");
      args[1] = args[1] + moreHp;
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
} // 访问器装饰器
// 装饰器模式案例


Function.prototype.after = function (afterFn) {
  var _self = this;

  return function () {
    var ret = _self.apply(this, arguments);

    afterFn.apply(this, arguments);
    console.log(this);
    console.log(arguments);
    return ret;
  };
};

var base = () => {
  console.log("base");
};

var extend = (hp = 5) => {
  console.log("extend");
};

base = base.after(extend); // base 的基础上添加了extend方法的调用

base();