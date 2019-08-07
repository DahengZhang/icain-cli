const merge = require('webpack-merge')
const webpack = require('webpack')
const conf = require('./webpack.com.conf')

module.exports = merge(conf, {
	module: {
		rules: [{
			test: /\.(c|sc|sa)ss$/,
			exclude: /node_modules/,
			use: [
				'vue-style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('dart-sass')
					}
				}
			]
		}]
	},
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		hot: true,
		overlay: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})
