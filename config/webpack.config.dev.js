
const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Webpackbar = require('webpackbar');
const webpack = require('webpack');

module.exports = {
    // development模式默认没有tree shaking
    // build之后得main.js   /*! exports provided: add, minus */
    // production模式不用配置optimization，只用配置sideEffects
    mode: 'development',
    entry: {
        // lodash: './src/lodash.js',
        main: './src/index.js',
    },
    // watch:true,
    output: {
        filename: '[name]_[hash:8].js',
        path: path.resolve(__dirname,'../build'),
        // publicPath:'/'

        // 配合devServer使用
        // publicPath:'/text',
    },
    // devtool: "source-map",
    // dev开启tree shaking
    // build之后的main.js 
    /*! exports provided: add, minus */
    /*! exports used: add */
    /* unused harmony export minus */
    // optimization:{
    //     usedExports:true
    // },
    optimization:{
        usedExports:true,
        splitChunks: {
            chunks: 'all',
            // 表示之分割同步的模块
            // chunks: 'initial',
            // 也就是只从动态加载得模块里面进行拆分
            // chunks: 'async',
            minSize: 30000,
            // cacheGroups里面每个组的minChunks会覆盖这个，没有设置的就使用这个默认值
            minChunks: 1,
            // 每一个动态加载的文件import()，里面的最大并行请求数量，如果两个以上的模块满足cacheGroup的规则，体积大的文件优先拆分
            maxAsyncRequests: 5,
            // 每一个入口里面最多可以加载好多个拆分的js文件，如果两个以上的模块满足cacheGroup的规则，体积大的文件优先拆分
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            // cacheGroups: {
            //     vendors:false,
            //     default: false
            // }
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
          },
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new Webpackbar({color: 'purple'}),
        new MiniCssExtractPlugin({
            filename: "css/[name]_[hash:8].css",
            chunkFilename: "[id].css"
        }),
        // new OptimizeCssAssetsPlugin(),
        // new TerserJSPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules:[
            {
                test:/\.(css|less)$/,
                use: [
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use: [
                   {
                       loader:  "url-loader",
                       options: {
                          limit: 2048,
                          name:'[name]_[hash:8].[ext]',
                          outputPath:'image'
                       }
                   }
                ]
            },
            {
                test:/\.(ttf|woff|eot|svg)$/,
                use: [
                   {
                       loader:  "file-loader",
                       options: {
                          outputPath:'font'
                       }
                   }
                ]
            },
            {
                test:/\.(js|ts|jsx|tsx)$/,
                use:'babel-loader'
            }
        ]
    },
    resolve: {
        // 配置别名@
        alias: {
            '@': path.resolve(__dirname,'../src'),
        },
    },
    // 1.设置devServer.publicPath取设置的，如果这没有设置devServer.publicPath，就取output.publicPath,都没设置取默认值
    // 2.如果目录下存在build文件，直接先走目录下的build文件，如果没有build文件，在走内存
    // 3.设置了contentBase，如果不存在build文件，就走devServer.publicPath
    // 4.devServer只有在development下才有用，上线不需要
    devServer: {
        // 以那个文件为基准，一般设置成output.path(build)
        contentBase: 'build',
        // 默认值是/
        publicPath:'/',

        // 1.如果这里需要设置publicPath:'/text'，那么output.publicPath需要设置成publicPath:'/text'
        // 2.npm run build:start的时候，在浏览器http://localhost:7777/text可正常显示
        // 3.devServer.publicPath和output.publicPath需要保持一致，否则会出现css和js文件找不到的错误
        // publicPath:'/text',

        open: true,
        port: 7777,
        // 不用浏览器刷新页面，页面就更新
        hot: true,
        // 阻止浏览器刷新,页面也不更新
        // hotOnly: true,
        historyApiFallback: true
    },
}