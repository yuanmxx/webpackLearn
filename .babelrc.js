module.exports = {
    "presets": [
      // @babel/preset-env是用来转化浏览器不认识的es6语法的(promise.map)
      // 使用这个配置后，index.js里面的import '@babel/polyfill'可以不需要，这个配置默认引入@babel/polyfill;
      ['@babel/preset-env',  {
        "corejs": "3",
        "useBuiltIns": 'usage'
      }],
      // @babel/preset-react是用来解析jsx语法的
      "@babel/preset-react",
    ]
}