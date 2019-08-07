const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jb = require('./build/jb')

const conf = process.env.NODE_ENV === 'development'
			? require('./build/webpack.dev.conf')
			: require('./build/webpack.pro.conf')

const page = jb() || getArgv('page')

function getEntry() {
	const entry = {}
	const context = glob.sync(page
		? `./src/**/${page}/**/index.js`
		: './src/**/index.js')
	context.forEach(key => {
		const slice = key.split('/')
		const pageName = slice[slice.length - 2]
		entry[pageName] = [key]
	})
	return entry
}

function getHtmlPlugin() {
	const context = glob.sync(page
		? `src/**/${page}/**/index.html`
		: 'src/**/index.html')
	return context.map(key => {
		const slice = key.split('/')
		const pageName = slice[slice.length - 2]
		return new HtmlWebpackPlugin({
			filename: `views/${pageName}/index.html`,
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

function getArgv(name) {
	const argvs = process.argv.find(item => {
		return item.indexOf(`--${name}`) !== -1
	}) || '';
	return argvs.split('=').length < 2
				? false : argvs.split('=')[1];
}

module.exports = merge(conf, {
	mode: process.env.NODE_ENV,
	entry: getEntry(),
	plugins: [...getHtmlPlugin()]
})
