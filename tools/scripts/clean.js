/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs-extra';
import { BUILD_DIR } from '../paths.config';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await fs.remove(BUILD_DIR);
}

export default clean;
