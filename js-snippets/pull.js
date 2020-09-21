/**
 * Mutates the original array to filter out the values specified.
 * @param {Array} arr
 * @param  {...any} args
 */
export const pull = (arr, ...args) => {
  const argState = Array.isArray(args[0]) ? args[0] : args;
  let pulled = arr.filter((v) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
};

/**
 * Mutates the original array to filter out the values specified, based on a given iterator function.
 * @param {Array} arr
 * @param  {...any} args
 */
export const pullBy = (arr, ...args) => {
  const length = args.length;
  let fn = length > 1 ? args[length - 1] : undefined;
  fn = typeof fn === 'function' ? (args.pop(), fn) : undefined;
  let argState = (Array.isArray(args[0]) ? args[0] : args).map((v) => fn(v));
  const pulled = arr.filter((v) => !argState.includes(fn(v)));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
};

var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

pullBy(myArray, [{ x: 1 }, { x: 3 }], (o) => o.x);
console.log(myArray);
