const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          // 轉換 .css 檔案需要使用的 Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 從 .js 檔案中分析出來的 .css 檔案的名稱
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};
