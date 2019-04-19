/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-param-reassign */
import webpack from 'webpack';

/**
 * Merge webpack entries
 * @param {Object} webpackConfig
 * @param {Array} entries
 */
export function mergeEntries(webpackConfig, entries) {
  if (!webpackConfig.entry) {
    webpackConfig.entry = './src';
  }

  if (Array.isArray(webpackConfig.entry) || typeof webpackConfig.entry === 'string') {
    webpackConfig.entry = entries.concat(webpackConfig.entry);
  } else {
    Object.keys(webpackConfig.entry).forEach(entry => {
      webpackConfig.entry[entry] = entries.concat(webpackConfig.entry[entry]);
    });
  }

  return webpackConfig;
}

/**
 * Merge webpack plugins
 * @param {Object} webpackConfig
 * @param {Array} plugins
 */
export function mergePlugins(webpackConfig, plugins) {
  webpackConfig.plugins = webpackConfig.plugins || [];
  plugins.forEach(plugin => {
    webpackConfig.plugins.push(plugin);
  });

  return webpackConfig;
}

/**
 * Inject HMR configuration
 * @param {Object} webpackConfig
 */
export function injectHMR(webpackConfig) {
  mergeEntries(webpackConfig, ['webpack-hot-middleware/client?reload=true']);
  mergePlugins(webpackConfig, [new webpack.HotModuleReplacementPlugin()]);

  return webpackConfig;
}
