const path = require('path');

module.exports = {
  // JS 執行入口檔案
  entry: './src/main.js',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 使用絕對路徑指明第三方模組存放的位置，以減少搜尋步驟
    modules: [path.resolve(__dirname, 'node_modules')],
    // 只采用 main 字段作為入口檔案描述字段，以減少搜尋步驟
    mainFields: ['main'],
    // 使用 alias 把匯入 react 的敘述換成直接使用單獨完整的 react.min.js 檔案，減少耗時的遞歸解析動作
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js'),
    },
    // 盡可能的減少副檔名嘗試的可能性
    extensions: ['js'],
  },
  module: {
    // 獨完整的 `react.min.js` 檔案就沒有采用模組化，忽略對 `react.min.js` 檔案的遞歸解析處理
    noParse: [/react\.min\.js$/],
    rules: [
      {
        // 若果專案原始程式中只有 js 檔案就不要寫成 /\.jsx?$/，提升正規表示法效能
        test: /\.js$/,
        // babel-loader 支援快取轉換出的結果，透過 cacheDirectory 選項開啟
        use: ['babel-loader?cacheDirectory'],
        // 只對專案根目錄下的 src 目錄中的檔案采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
    ]
  },
};
