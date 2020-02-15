const path = require('path');

module.exports = {
  // JS 執行入口檔案
  entry: './main.ts',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 增加對 TypeScript 的 .ts 和 .vue 檔案的支援
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      // 載入 .vue 檔案
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/,
      },
      // 載入 .ts 檔案
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // 讓 tsc 把 vue 檔案當成一個 TypeScript 模組去處理，以解決 moudle not found 的問題，tsc 本身不會處理 .vue 結尾的檔案
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ]
  },
  devtool: 'source-map' // 輸出 source-map 方便直接除錯 ES6 原始程式
};

