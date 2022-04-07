/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-07 17:55:46
 * @description 组合式继承
 */

function inherit(Child, Parent) {
  // 继承原型上的属性
  Child.prototype = Object.create(Parent.prototype);
  // 修复constructor
  Child.prototype.constructor = Child;
  // 存储超类
  Child.super = Parent;
  // 静态属性继承
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(Child, Parent);
  } else if (Child.__proto__) {
    Child.__proto__ = Parent;
  } else {
    // 兼容IE10等旧浏览器
    // 将 Parent 上的静态属性和方法拷贝一份到 Child 上，不会覆盖 Child 上的方法
    for (var k in Parent) {
      if (Parent.hasOwnProperty(k)) {
        Child[k] = Parent[k];
      }
    }
  }
}
