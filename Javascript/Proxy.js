// get set 使用
var obj = {};
var proxyObj = new Proxy(obj, {
  get(target, property, receiver) {
    console.log("get:=============== ");
    console.log("target:", target);
    console.log("property:", property);
    //
    console.log("receiver:", receiver);
    console.log("target === obj:", target === obj);
    console.log("receiver === proxyObj:", receiver === proxyObj);
    console.log(" ");
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    console.log("set:=============== ");
    console.log("target:", target);
    console.log("property:", property);
    console.log("value:", value);
    console.log("receiver:", receiver);
    console.log("target === obj:", target === obj);
    console.log("receiver === proxyObj:", receiver === proxyObj);
    console.log("");
    return Reflect.set(target, property, value, receiver);
  },
});

// 设置属性
proxyObj.name = "name";
// 读取属性
console.log("proxyObj.name:", proxyObj.name);
console.log("obj.name:", obj.name);

let target = {};
let proxy = new Proxy(target, {}); // 空的handler
proxy.test = 5;

console.log(target.test);
console.log(proxy.test);

// 如果没有任何捕捉器, proxy是一个target的透明包装器

// get 捕捉器
let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0;
    }
  },
});

console.log("get ", numbers[1]);

// get - obejct

let dictionary = {
  Hello: "Hola",
  Bye: "Adios",
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    if (phrase in target) {
      return target[phrase];
    } else {
      return phrase;
    }
  },
});

console.log("get Dictionary: " + dictionary["Hello"]);

// deleteProperty

let user = {
  name: "!11",
  _password: "123",
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    // bind 的作用
    // 对象方法必须能够访问 _password
    // 当对象访问 this._password 时, get 捕捉器会被激活并抛出错误
    return typeof value === "function" ? value.bind(target) : value;
  },
  set(target, prop, val) {
    // 拦截属性写入
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    // 拦截属性删除
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    // 拦截读取属性列表
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

// "get" 不允许读取 _password
try {
  console.log(user._password); // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "set" 不允许写入 _password
try {
  user._password = "test"; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "deleteProperty" 不允许删除 _password
try {
  delete user._password; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "ownKeys" 将 _password 过滤出去
for (let key in user) console.log(key); // name
