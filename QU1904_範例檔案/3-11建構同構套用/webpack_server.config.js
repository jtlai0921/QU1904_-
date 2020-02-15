const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // JS 執行入口檔案
  entry: './main_server.js',
  // 為了不打包進 Nodejs 內建的模組，例如 fs net 模組等
  target: 'node',
  // 為了不打包進 node_modules 目錄下的第三方模組
  externals: [nodeExternals()],
  output: {
    // 為了以 CommonJS2 規範匯出著色函數，以給采用 Nodejs 撰寫的 HTTP 服務呼叫
    libraryTarget: 'commonjs2',
    // 把最終可在 Nodejs 中執行的程式碼輸出到一個 bundle.js 檔案
    filename: 'bundle_server.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // CSS 程式碼不能被打包進用於服務端的程式碼中去，忽略掉 CSS 檔案
        test: /\.css/,
        use: ['ignore-loader'],
      },
    ]
  },
  devtool: 'source-map' // 輸出 source-map 方便直接除錯 ES6 原始程式
};
