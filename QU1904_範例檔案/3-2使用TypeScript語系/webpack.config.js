const path = require('path');

module.exports = {
  // TS 執行入口檔案
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先嘗試 ts，tsx 副檔名的 TypeScript 原始程式檔案
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 輸出 SourceMap 方便在瀏覽器裡除錯 TS 程式碼
};
