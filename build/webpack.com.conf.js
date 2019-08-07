const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	devtool: isDev ? 'eval' : 'source-maps',
	output: {
		path: path.resolve(__dirname, '../public/'),
		publicPath: '',
		filename: 'cdn/static/js/[name].bundle.[hash:6].js',
		chunkFilename: 'cdn/static/js/[name].chunk.[hash:6].js'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src/')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.vue$/,
			exclude: /node_modules/,
			loader: 'vue-loader'
		}]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
