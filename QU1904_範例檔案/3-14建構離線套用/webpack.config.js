const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: {
    app: './main.js'// Chunk app 的 JS 執行入口檔案
  },
  output: {
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css/,// 增加對 CSS 檔案的支援
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ExtractTextPlugin.extract({
          use: ['css-loader'] // 壓縮 CSS 程式碼
        }),
      },
    ]
  },
  plugins: [
    // 一個 WebPlugin 對應一個 HTML 檔案
    new WebPlugin({
      template: './template.html', // HTML 模版檔案所在的檔案路徑
      filename: 'index.html' // 輸出的 HTML 的檔名稱
    }),
    new ExtractTextPlugin({
      filename: `[name].css`,// 給輸出的 CSS 檔名稱加上 hash 值
    }),
    new ServiceWorkerWebpackPlugin({
      // 自訂的 sw.js 檔案所在路徑
      // ServiceWorkerWebpackPlugin 會把檔案清單植入到產生的 sw.js 中
      entry: path.join(__dirname, 'sw.js'),
    }),
  ],
  devServer: {
    // Service Workers 相依 HTTPS，使用 DevServer 提供的 HTTPS 功能。
    https: true,
  }
};
