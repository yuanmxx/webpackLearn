const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式
module.exports = {
    //入口文件的配置项
    entry: './src/index.js',
    mode: 'development',
    // 更改代码之后不用build,保存代码之后自动打包，但是需要手动刷新页面
    // watch: true,
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'build'),
        //输出的文件名称
        filename: 'bundle.js',
        // 输出文件路径前缀
        // publicPath: '/build/'

        // 使用npm run server时候
        publicPath: '/'
    },
    module: {
        rules: [
            // url-loader把图片转成base64，和bundle.js打包到一起
            // {
            //     test: /\.(png|jpg|gif|bmp)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             name: '[name]_[hash:8].[ext]',
            //             // 写法同 name: 'image/[name]_[hash:8].[ext]',
            //             outputPath: 'image',
            //             // 超过limit就使用file-loader
            //             limit: 14000,
            //         }
            //     }]
            // },
            {
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
                use: [
                    // 单独打成css包
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    // 使用style-loader样式会被打包到head的style标签中
                    // 'style-loader',
                    "css-loader",
                    'postcss-loader',
                    'less-loader',
                ]
            },
            // 打包iconfont
            {
                test: /\.(eot|ttf|svg|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // build输出路劲---build/font
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

        // 压缩css
        new OptimizeCssAssetsPlugin(),

        // 压缩js
        // new TerserJSPlugin(),

        // 自动删除output.path文件
        new CleanWebpackPlugin(),
        // 自动生成html打包模板，并且自动引入js和css
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: './build/index.html',
        // 设置端口
        port: 8888,
        // 是否支持热更新
        hot: true,
        // 阻止浏览器自动刷新
        hotOnly: true,
        // 自动打开浏览器
        open: true
    },
    // devtool:'cheap-module-source-map',
}