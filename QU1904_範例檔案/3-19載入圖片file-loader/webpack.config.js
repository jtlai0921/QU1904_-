const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // JS 執行入口檔案
  entry: {
    main: './main.js'
  },
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: '[name].js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 轉換 .css 檔案需要使用的 Loader
          use: ['css-loader'],
        }),
      },
      {
        test: /\.png$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `[name].css`,
    }),
    new WebPlugin({
      template: 'template.html',
      filename: 'index.html',
      requires: ['main']
    })
  ]
};
