/**
 * Abstract 类是用来继承使用的类
 * 无法创建实例
 * 抽象类中可以添加抽象方法
 */
abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 抽象方法没有方法体
  // 抽象方法只能定义在抽象类中, 子类必须！对抽象方法进行重写
  abstract sayHello(): void;
}
