const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
// 在express启动的服务app中调用这个中间件。
// 通过watch mode监听文件变化，一旦变化启动wenpack自动打包成新的bundle.js，快速编译，走内存,和npm run watch不同，这个不会生成新的本地build文件（打包慢）
// 在编译期间，停止提供旧版的 bundle 并且将请求延迟到最新的编译结果完成之后
// webpack 编译后的资源会存储在内存中，当用户请求资源时，直接于内存中查找对应资源，减少去硬盘中查找的 IO 操作耗时
const webpackmiddle = require('webpack-dev-middleware');
const app = express();

const complier = webpack(config);

app.use(webpackmiddle(complier,{
    publicPach: config.output.publicPach
}))
app.listen(3003, () => { console.log('服务器启动成功了') })