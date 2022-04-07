/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-07 17:49:31
 * @description 实现new
 */

function newFunc(...args) {
  // 取出 args 数组的第一个参数，即目标构建函数
  const constructor = args.shift();
  // 创建一个空对象，且这个空对象继承构造函数的 prototype 属性
  const obj = Object.create(constructor.prototype);
  // 执行构造函数，得到构造函数返回结构
  // 注意这里我们使用 apply，将构造函数内的this指向obj
  const result = constructor.apply(obj, args);
  // 如果构造函数返回结构是一个对象且不为null（显示返回值），就直接返回，否则返回 obj 对象
  return result instanceof Object && result !== null ? result : obj;
}
