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
  }
};
