/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-07 10:34:26
 * @description 通用化curring函数
 */

const currying = function (fn, length) {
  length = length || fn.length;
  return function (...args) {
    if (args.length < length) {
      return currying(fn.bind(this, ...args), length - args.length);
    } else {
      // 参数已满，执行 fn 函数
      return fn.call(this, ...args);
    }
  };
};

const add3 = currying((a, b, c) => a + b + c, 3);
console.log(add3(1, 2, 3));
console.log(add3(1)(2)(3));

const currying2 = (fn) =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...args2) => judge(...args, ...args2));

const add2 = currying((a, b) => a + b);
console.log(add2(1)(2));
