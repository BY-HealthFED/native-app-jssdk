/**
 * Noop function
 */
export function noop() {}

/**
 * Promise value pass-throught
 * @param {Function} fn
 * @param {Boolean} isThrow
 */
export function valuePassThrought(fn, isThrow) {
  return args => {
    fn();

    if (isThrow) {
      throw args;
    } else {
      return args;
    }
  };
}
