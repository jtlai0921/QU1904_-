const path = require('path');

module.exports = {
  // JS 執行入口檔案
  entry: './main_browser.js',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle_browser.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devtool: 'source-map' // 輸出 source-map 方便直接除錯 ES6 原始程式
};
