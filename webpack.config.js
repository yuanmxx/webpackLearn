const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口文件的配置项
    entry: './src/index.js',
    mode: 'development',
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        // 写法同 name: 'image/[name]_[hash:8].[ext]',
                        outputPath: 'image'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                        // 单独打成css包
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    // 样式会被打包到head的style标签中
                    // 'style-loader',
                    "css-loader"
                ]
            },
            // 打包iconfont
            {
                test: /\.(eot|ttf|svg|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // dist输出路劲---dist/font
                        outputPath: 'font/'
                    }
                }, ]
            }
        ]
    },
    plugins: [
        // 打包后把css抽离成单独的文件
        new MiniCssExtractPlugin({
            filename: "css/[name]_[hash:8].css",
            chunkFilename: "[id].css"
        }),
        // 自动删除output.path文件
        new CleanWebpackPlugin(),
        // 自动生成html打包模板，并且自动引入js和css
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: './dist/index.html',
        // 设置端口
        port: 8888,
        // 是否支持热更新
        hot: true,
        // 阻止浏览器自动刷新
        hotOnly: true,
        // 自动打开浏览器
        open: true
    }
}