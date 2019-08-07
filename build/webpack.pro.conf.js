const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const conf = require('./webpack.com.conf')

module.exports = merge(conf, {
	module: {
		rules: [{
			test: /\.(c|sc|sa)ss$/,
			exclude: /node_modules/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: ''
					}
				},
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'cdn/static/css/[name].bundle.[hash:6].css',
			chunkFilename: 'cdn/static/css/[name].chunk.[hash:6].css',
			ignoreOrder: false
		})
	]
})
