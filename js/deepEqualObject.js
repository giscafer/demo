/**
 * 浅对比和深对比
 * https://github.com/dt-fe/weekly/blob/159/157.%20%E7%B2%BE%E8%AF%BB%E3%80%8A%E5%A6%82%E4%BD%95%E6%AF%94%E8%BE%83%20Object%20%E5%AF%B9%E8%B1%A1%E3%80%8B.md
 *
 */

function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

const isObject = (obj) => {
  return obj !== null && typeof obj === 'object';
};
function deepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return deepEqual(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
