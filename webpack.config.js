const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: {
        app: [path.resolve(__dirname, 'src/main.js')]
    },
    output: {
        filename: 'app.bundle.[hash:5].js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }, {
            test: /\.(c|sa|sc)ss$/,
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
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ]
}
