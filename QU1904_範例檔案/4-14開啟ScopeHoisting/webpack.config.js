const path = require('path');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
  // JS 執行入口檔案
  entry: './main.js',
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 針對 Npm 中的第三方模組優先采用 jsnext:main 中指向的 ES6 模組化語法的檔案
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 開啟 Scope Hoisting
    new ModuleConcatenationPlugin(),
  ],
};
