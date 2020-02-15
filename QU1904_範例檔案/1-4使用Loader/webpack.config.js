const path = require('path');

module.exports = {
  // JS 執行入口檔案
  entry: './main.js',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正則去比對要用該 loader 轉換的 css 檔案
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  }
};
