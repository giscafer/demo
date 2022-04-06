/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-06 11:30:53
 * @description 实现一个根据调用频率来进行截流的函数代理
 */
const createThrottleProxy = (fn, delay) => {
  const last = Date.now() - delay;
  return new Proxy(fn, {
    apply(target, context, args) {
      const now = Date.now();
      if (now - last >= delay) {
        fn(...args);
        last = Date.now();
        return;
      }
    },
  });
};
