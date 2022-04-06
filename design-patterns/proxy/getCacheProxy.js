/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-04-06 11:26:05
 * @description 通过对函数进行代理，来缓存函数对应参数的计算返回结果
 */
const getCacheProxy = (fn, cache = new WeekMap()) =>
  new Proxy(fn, {
    apply(target, context, args) {
      const key = args.join(',');
      if (cache.get(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    },
  });
