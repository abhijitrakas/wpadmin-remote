const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'assets/build');

module.exports = ( env, argv ) => ( {

	entry : [
		'./assets/src/js/index.js',
	],

	output: {
		path: BUILD_DIR,
		filename: 'js/bundle.js'
	},

	mode: argv.mode,

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
		]
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin(
				{
					cache: false,
					parallel: true,
					sourceMap: false,
				}
			),
		]
	},

	plugins: [
		new MiniCssExtractPlugin(
			{
				filename: 'css/[name].css',
				path: BUILD_DIR,
			}
		),
	]
} );
