const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
  // JS 執行入口檔案
  entry: './main.js',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
};
