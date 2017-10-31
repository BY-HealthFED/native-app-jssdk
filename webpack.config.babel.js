import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
// import OfflinePlugin from 'offline-plugin';
import path from 'path';
// import V8LazyParseWebpackPlugin from 'v8-lazy-parse-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: ['./core/polyfill.js','./index.js'],

	output: {
		path: path.resolve(__dirname, "build"),
		// publicPath: ENV==='production' ? 'http://wx-test.by-health.com/' : '',
		publicPath: '',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['.jsx', '.js', '.json', '.scss', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),
			styles: path.resolve(__dirname, "src/styles"),
			core: path.resolve(__dirname, "src/core"),
			'~': path.resolve(__dirname, "src"), // root
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

  // loader = rules,
  // preLoaders = enfore: pre inside rules
  // ExtractTextPlugin still not complete, some options not available
  // fallback options don't work e.g. style-loader?singleton
  // ExtractTextPlugin.extract({ ...use [ loader should be use ]
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules&localIdentName=[name][hash:base64:5]']
				})
			},
			{
				test: /\.scss$/,
				exclude: path.resolve(__dirname, 'src/styles'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules&localIdentName=[name][hash:base64:8]',
						'postcss-loader',
						{
							loader:'sass-loader',
							options: {
								data: '@import "variables.scss";',
								includePaths: [
									path.resolve(__dirname, "src/styles")
								]
							}
						}
					]
				})
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src/styles'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules&localIdentName=[name][hash:base64:8]', 'less-loader']
				})
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
				use: ENV==='production' ?
				{
					loader: 'file-loader',
					options: {
						name: '[path][name]_[hash:base64:5].[ext]'
					}
				} : {
					loader: 'url-loader'
				}
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: ENV==='production' ?
				{
					loader: 'url-loader?limit=10000'
				} : {
					loader: 'url-loader'
				}
			}
		]
	},
	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true,
			disable: ENV !== 'production'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './index.ejs',
			minify: { collapseWhitespace: true }
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "async"
		}),
		new CopyWebpackPlugin([
			{ from: './assets', to: './assets' }
		])
	]).concat(ENV==='production' ? [
		// new V8LazyParseWebpackPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				// warnings: false, // defaults to false
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				negate_iife: false
			}
		}),

		// strip out babel-helper invariant checks
		new ReplacePlugin([{
			// this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
			partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
			replacement: () => 'return;('
		}])

		// ,new OfflinePlugin({
		// 	relativePaths: false,
		// 	AppCache: false,
		// 	ServiceWorker: {
		// 		events: true
		// 	},
		// 	publicPath: '/'
		// })
	] : []),

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	// devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',
	devtool: ENV==='production' ? '' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		// colors: true, // no longer used
		publicPath: '',
		contentBase: './src',
		historyApiFallback: true,
		open: true,

		proxy: {
			'/common': {
				target: 'http://wx-test.by-health.com',
				changeOrigin: true
			}
		}
	}
};
