const path = require('path');
const { WebPlugin } = require('web-webpack-plugin');

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
      },
      {
        test: /\.css/,// 增加對 CSS 檔案的支援
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    // 使用本文的主角 WebPlugin，一個 WebPlugin 對應一個 HTML 檔案
    new WebPlugin({
      template: './template.html', // HTML 模版檔案所在的檔案路徑
      filename: 'index.html', // 輸出的 HTML 的檔名稱
      requires: ['app'] // 該 HTML 網頁相依 Chunk app 包括的資源
    }),
  ],
};
