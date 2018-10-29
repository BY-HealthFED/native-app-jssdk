/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable global-require */
import { fork } from './internals/cp';
import run from './internals/run';

if (process.send) {
  // Load environment variables
  require('./internals/env.js');

  // eslint-disable-next-line import/no-dynamic-require
  const task = require(`./scripts/${process.argv[2]}.js`);
  run(task).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
} else {
  fork(__filename, process.argv.slice(2));
}
