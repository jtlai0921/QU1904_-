const path = require('path');

module.exports = {
  // JS 執行入口檔案
  entry: {
    main: './main.js',
  },
  output: {
    // 為從 entry 中組態產生的 Chunk 組態輸出檔案的名稱
    filename: '[name].js',
    // 為動態載入的 Chunk 組態輸出檔案的名稱
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devtool: 'source-map' // 輸出 source-map 方便直接除錯 ES6 原始程式
};
