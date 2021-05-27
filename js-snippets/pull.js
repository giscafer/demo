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

// var myArray = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
// pullBy(myArray, [{ x: 1 }, { x: 3 }], (o) => o.x);
// console.log(myArray);

export const pullAtIndex = (arr, ...args) => {
  const argState = Array.isArray(args[0]) ? args[0] : args;
  let removed = [];
  let pulled = arr
    .map((v, i) => (argState.includes(i) ? removed.push(v) : v))
    .filter((v, i) => !argState.includes(i));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
  return removed;
};

// let myArray = ['a', 'b', 'c', 'd'];
// let pulled = pullAtIndex(myArray, [1, 3]);
// myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]

export const pullAtValue = (arr, ...args) => {
  const argState = Array.isArray(args[0]) ? args[0] : args;
  const removed = [];
  const pulled = arr
    .map((v) => (argState.includes(v) ? (removed.push(v), v) : v))
    .filter((v) => !argState.includes(v));
  arr.length = 0;
  pulled.forEach((v) => arr.push(v));
  return removed;
};

// let myArray = ['a', 'b', 'c', 'd'];
// let pulled = pullAtValue(myArray, ['b', 'd']);
// myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]
