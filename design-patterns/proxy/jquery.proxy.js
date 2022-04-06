/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-06 11:44:54
 * @description jquery proxy
 */

const gQuery = {};

gQuery.prototype = {
  proxy: function (fn, context) {
    // 模拟bind方法
    const args = Array.prototype.slice.call(arguments, 2);
    const proxy = function () {
      return fn.apply(
        content,
        args.concat(Array.prototype.slice.call(arguments)),
      );
    };
    return proxy;
  },
};
