const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
  entry: [
    // 為了支援模組熱置換
    'webpack-hot-middleware/client',
    // JS 執行入口檔案
    './src/main.js'
  ],
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: 'bundle.js',
  },
  plugins: [
    // 為了支援模組熱置換
    new HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
};
