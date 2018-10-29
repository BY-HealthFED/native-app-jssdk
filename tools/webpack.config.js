/**
 * Copyright (c) 2018 Wind4 <puxiaping@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('../package.json');
const { getClientEnvironment } = require('./internals/env');
const paths = require('./paths.config');

const isDev = process.argv.includes('--dev');
const isVerbose = process.argv.includes('--verbose');
const clientEnv = getClientEnvironment();

const webpackConfig = {
  mode: process.env.NODE_ENV,

  context: paths.SRC_DIR,

  entry: {
    index: ['./polyfills', '.'],
  },

  output: {
    path: paths.BUILD_DIR,
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev
      ? 'chunks/[name].js'
      : 'chunks/[name].[chunkhash:8].js',
    publicPath: process.env.PUBLIC_URL || '',
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': paths.SRC_DIR,
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: isDev,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: pkg.browserslist,
                },
                forceAllTransforms: !isDev, // for UglifyJS
                modules: false,
                useBuiltIns: false,
                loose: true,
              },
            ],
            ['@babel/preset-react', { development: isDev }],
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false,
              },
            ],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
          ],
        },
        include: [paths.SRC_DIR],
      },

      {
        test: /\.(css|less|sass|scss)$/,
        rules: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },

          // Process external/third-party styles
          {
            exclude: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: paths.SRC_DIR,
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDev,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDev
                ? '[name]-[local]-[hash:base64:5]'
                : '[hash:base64:5]',
            },
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js',
              },
            },
          },

          // Compile Less to CSS
          // https://github.com/webpack-contrib/less-loader
          // Install dependencies before uncommenting: yarn add --dev less-loader less
          // {
          //   test: /\.less$/,
          //   loader: 'less-loader',
          //   options: {
          //     sourceMap: isDev,
          //   },
          // },

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
            options: {
              data: '@import "style/variables.scss";',
              sourceMap: isDev,
              includePaths: [paths.SRC_DIR],
            },
          },
        ],
      },

      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
        oneOf: [
          {
            issuer: /\.(css|less|sass|scss)$/,
            oneOf: [
              {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                  name: 'assets/[hash:8].[ext]',
                  limit: 8192, // 8kb
                },
              },

              {
                loader: 'url-loader',
                options: {
                  name: 'assets/[hash:8].[ext]',
                  limit: 8192, // 8kb
                },
              },
            ],
          },

          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash:8].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },

      {
        test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': clientEnv.stringified,
      __DEV__: isDev,
    }),

    // Extracts CSS into separate files
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: 'chunks/[name].[contenthash:8].css',
    }),

    // Simplifies creation of HTML files to serve your webpack bundles
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './index.ejs',
      hash: isDev,
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
  ],

  optimization: {
    minimizer: [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: isVerbose,
          output: {
            comments: false,
          },
        },
      }),

      // Optimize and minimize CSS assets
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin
      new OptimizeCSSAssetsPlugin(),
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDev,

  devtool: isDev ? 'cheap-module-inline-source-map' : false,

  performance: isDev ? false : { hints: 'warning' },

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    children: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    errorDetails: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDev,
    timings: true,
    version: isVerbose,
  },
};

module.exports = webpackConfig;
