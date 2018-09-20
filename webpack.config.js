const path = require( 'path' );

module.exports = {

	entry : [
		'./src/es6/index.js',
		'./src/scss/wpadminremote-style.scss'
	],

	output: {
		path    : path.resolve( __dirname, 'assets' ),
		filename: 'js/bundle.js'
	},

	mode  : 'development',

	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'style.css',
							outputPath: 'css/',
							minimize: false
						}
					},
					{ loader: 'extract-loader' },
					{ loader: "css-loader" },
					{ loader: "sass-loader" }
				]
			},
		]
	},
};
