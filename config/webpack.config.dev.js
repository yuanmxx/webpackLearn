
const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name]_[hash:8].js',
        path: path.resolve(__dirname,'../build')
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
            // template: path.resolve(__dirname,'../src/index.html')
        }),
        // new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules:[
            {
                test:/\.css$/,
                use: [
                    "style-loader",
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}