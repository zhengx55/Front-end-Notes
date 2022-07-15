let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

console.log(user.fullName); // John Smith
user.fullName = "Test"; // Error（属性只有一个 getter）

// 通过setter来添加属性

let user1 = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};

// set fullName 将以给定值执行
user.fullName = "Alice Cooper";

console.log(user1.name); // Alice
console.log(user1.surname); // Cooper

Object.defineProperty(user1, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});

console.log(user1.fullName); // Alice Cooper

for (let key in user) console.log(key); // name, surname

// 通过getter 是设置新的属性
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // 年龄是根据当前日期和生日计算得出的
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}

let john = new User("John", new Date(1992, 6, 1));

console.log(john.birthday); // birthday 是可访问的
console.log(john.age); // ……age 也是可访问的
