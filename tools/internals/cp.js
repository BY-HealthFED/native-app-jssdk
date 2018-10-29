/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import cp from 'child_process';

const signal = {
  RESTART: '@@SIG_RESTART',
};

/**
 * Fork a child process
 * @param {String} modulePath
 * @param {ReadonlyArray<string>} args
 * @param {cp.ForkOptions} options
 */
export function fork(modulePath, args, options) {
  const child = cp.fork(modulePath, args, options);

  child.on('message', msg => {
    if (msg === signal.RESTART) {
      child.kill();
      setImmediate(fork, modulePath, args, options);
    }
  });

  return child;
}

/**
 * Restart the current process (if it's a child process)
 */
export function restart() {
  if (process.send) {
    process.send(signal.RESTART);
  }
}

export default {
  fork,
  restart,
};
