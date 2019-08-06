const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '',
		filename: 'js/[name].bundle.[hash:5].js',
		chunkFilename: 'js/[name].chunk.[hash:6].js'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src/')
		}
	},
	module: {
		rules: [{
			test: /\.vue$/,
			exclude: /node_modules/,
			loader: 'vue-loader'
		}]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}
