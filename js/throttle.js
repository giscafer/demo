/**
 * 节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export const throttle = (fn, wait) => {
  let inThrottle = false;
  let lastTime = Date.now();
  let timer;
  return function () {
    const context = this;
    const args = arguments;

    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      lastTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/* 
window.addEventListener(
  'resize',
  throttle(function (evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
 */
