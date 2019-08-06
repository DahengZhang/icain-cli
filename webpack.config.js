const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const conf = process.env.NODE_ENV === 'development'
			? require('./build/webpack.dev.conf')
			: require('./build/webpack.pro.conf')

function getEntry() {
	const entry = {}
	const context = glob.sync('./src/**/index.js')
	context.forEach(key => {
		const slice = key.split('/')
		const pageName = slice[slice.length - 2]
		entry[pageName] = [key]
	})
	return entry
}

function getHtmlPlugin() {
	const context = glob.sync('src/**/index.html')
	return context.map(key => {
		const slice = key.split('/')
		const pageName = slice[slice.length - 2]
		return new HtmlWebpackPlugin({
			filename: `${pageName}/index.html`,
			template: `./${key}`,
			inject: true,
			chunks: [pageName],
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	})
}

module.exports = merge(conf, {
	mode: process.env.NODE_ENV,
	entry: getEntry(),
	plugins: [...getHtmlPlugin()]
})
