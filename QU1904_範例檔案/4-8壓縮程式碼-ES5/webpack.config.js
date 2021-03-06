﻿const path = require('path');
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  entry: {
    app: './main.js'// Chunk app 的 JS 執行入口檔案
  },
  output: {
    filename: '[name]_[chunkhash:8].js',// 給輸出的檔名稱加上 hash 值
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目錄下的檔案，node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      }
    ]
  },
  plugins: [
    // 用 WebPlugin 產生對應的 HTML 檔案
    new WebPlugin({
      template: './template.html', // HTML 模版檔案所在的檔案路徑
      filename: 'index.html' // 輸出的 HTML 的檔名稱
    }),
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 壓縮輸出的 JS 程式碼
    new UglifyJSPlugin({
      compress: {
        // 在 UglifyJS 移除沒有用到的程式碼時不輸出警示
        warnings: false,
        // 移除所有的 `console` 敘述，可以相容ie瀏覽器
        drop_console: true,
        // 內嵌定義了但是只用到一次的變數
        collapse_vars: true,
        // 分析出出現多次但是沒有定義成變數去參考的靜態值
        reduce_vars: true,
      },
      output: {
        // 最緊湊的輸出
        beautify: false,
        // 移除所有的注解
        comments: false,
      }
    }),
  ],
};
