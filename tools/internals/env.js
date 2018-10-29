/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const fs = require('fs');
const parseArgs = require('minimist');
const { config } = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const cli = parseArgs(process.argv.slice(2), {
  boolean: ['dev'],
  string: ['env', 'port', 'publicUrl'],
});

process.env.NODE_ENV = cli.dev ? 'development' : 'production';
if (cli.env) process.env.BUILD_ENV = cli.env;
if (cli.port) process.env.PORT = cli.port;
if (cli.publicUrl) process.env.PUBLIC_URL = cli.publicUrl;

const dotenvFiles = ['.env'];
if (cli.env) {
  const buildEnv = String(cli.env).toLowerCase();
  dotenvFiles.unshift(`.env.${buildEnv}`);
}
if (cli.dev) {
  dotenvFiles.unshift('.env.local');
}
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(config({ path: dotenvFile }));
  }
});

const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        // eslint-disable-next-line no-param-reassign
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV,
        BUILD_ENV: process.env.BUILD_ENV || '',
        PUBLIC_URL: process.env.PUBLIC_URL || '',
      },
    );
  const stringified = Object.keys(raw).reduce((env, key) => {
    // eslint-disable-next-line no-param-reassign
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {});

  return { raw, stringified };
}

exports.getClientEnvironment = getClientEnvironment;
