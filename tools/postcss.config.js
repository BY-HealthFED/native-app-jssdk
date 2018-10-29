/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable global-require */
const pkg = require('../package.json');

// PostCSS - A tool for transforming CSS with JavaScript
// https://github.com/postcss/postcss-loader#config
module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Add vendor prefixes to CSS rules using values from caniuse.com
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      // flexbox: 'no-2009', // Recommended for modern browsers
      browsers: pkg.browserslist,
    }),
  ],
});
