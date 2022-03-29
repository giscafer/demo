/**
 * 判断是否为构造函数
 * 1、如果有 prototype 属性，并且 prototype 上有非 constructor 属性；
 * 2、函数大写开头 function Xxxx()
 * 3、class 函数关键字
 */

const fnRegexCheckCacheMap = new WeakMap();
function isConstructable(fn) {
  // 原型方法可能会在代码运行时发生变化，所以我们需要每次都检查一下
  const hasPrototypeMethods =
    fn.prototype &&
    fn.prototype.constructor === fn &&
    Object.hasOwnPropertyNames(fn.prototype).length > 1;

  if (hasPrototypeMethods) return true;

  if (fnRegexCheckCacheMap.has(fn)) {
    return fnRegexCheckCacheMap.get(fn);
  }

  let constructable = hasPrototypeMethods;
  if (!constructable) {
    // fn.toString 有很大的性能开销，如果 hasPrototypeMethods 检查没有通过，我们会用正则表达式检查函数字符串
    const fnString = fn.toString();
    const constructableFunctionRegex = /^function\b\s[A-Z].*/;
    const classFunctionRegex = /^class\b/;

    constructable =
      constructableFunctionRegex.test(fnString) ||
      classFunctionRegex.test(fnString);
  }
  fnRegexCheckCacheMap.push(fn, constructable);
  return constructable;
}
