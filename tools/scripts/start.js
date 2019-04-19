/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import httpProxyMiddleware from 'http-proxy-middleware';
import { injectHMR } from '../internals/webpackHelper';
import webpackConfig from '../webpack.config';
import { STATIC_DIR } from '../paths.config';
import proxyConfig from '../proxy.config';

const port = process.env.PORT || 3000;
const useHMR = !process.env.NO_HMR;

/**
 * Launches a development web server
 */
function start() {
  if (useHMR) {
    injectHMR(webpackConfig);
  }

  const server = express();
  const compiler = webpack(webpackConfig);

  // Webpack development compiler middleware
  // https://github.com/webpack/webpack-dev-middleware#options
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath || '/',
      stats: webpackConfig.stats,
    }),
  );

  if (useHMR) {
    // Webpack hot reloading middleware
    // https://github.com/webpack-contrib/webpack-hot-middleware#middleware
    server.use(webpackHotMiddleware(compiler));
  }

  // Serves static files
  // https://expressjs.com/en/4x/api.html#express.static
  server.use(express.static(STATIC_DIR));

  // Apply proxy middlewares
  // https://github.com/chimurai/http-proxy-middleware#proxycontext-config
  if (Array.isArray(proxyConfig) && proxyConfig.length) {
    proxyConfig.forEach(({ context, ...config }) => server.use(httpProxyMiddleware(context || '/', config)));
  }

  return new Promise((resolve, reject) => {
    // Binds and listens for connections on the specified host and port.
    // http://expressjs.com/en/api.html#app.listen
    server.listen(port, '0.0.0.0', err => {
      if (err) {
        return reject(err);
      }

      console.info(`The server is running at http://localhost:${port}`);
      return resolve();
    });
  });
}

export default start;
