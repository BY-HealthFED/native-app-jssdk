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
function createCallback(
  resolve: (args: any) => void,
  reject: (err: { code: string; message: string }) => void,
  once = false,
  timeoutMS = -1,
): string {
  const fnName = `__native__${++cbIdentity}`;

  let timer: any;
  if (timeoutMS > 0) {
    timer = setTimeout(() => {
      reject({ code: '1', message: '[APP-SDK]: Call SDK timeout' });
    }, timeoutMS);
  }

  (window as any)[fnName] = (args: any, err: any) => {
    try {
      if (err) {
        const [code, message] = err.split(':');
        reject({ code, message });
      } else {
        resolve(args);
      }
    } finally {
      if (timer) {
        clearTimeout(timer);
      }

      if (once !== false) {
        delete (window as any)[fnName];
      }
    }
  };

  return fnName;
}

export default createCallback;
