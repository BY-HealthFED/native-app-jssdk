/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

/**
 * 回调函数Id
 * @ignore
 */
let cbIdentity = 0;

/**
 * Create a callback function proxy in Window and return the callback name.
 * @param fn Callback function.
 * @param once Execute only once.
 * @ignore
 */
function createCallback(fn: (args: any) => void, once?: boolean): string {
  const fnName = `__native__${++cbIdentity}`;

  (window as any)[fnName] = (args: any) => {
    try {
      fn(args);
    } finally {
      if (once !== false) {
        delete (window as any)[fnName];
      }
    }
  };

  return fnName;
}

export default createCallback;
