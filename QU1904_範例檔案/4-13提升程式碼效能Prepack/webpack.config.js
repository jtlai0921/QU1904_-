const path = require('path');
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

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
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 壓縮輸出的 JS 程式碼
    new UglifyJSPlugin({
      compress: {
        // 在 UglifyJS 移除沒有用到的程式碼時不輸出警示
        warnings: false,
        // 內嵌定義了但是只用到一次的變數
        collapse_vars: true,
        // 分析出出現多次但是沒有定義成變數去參考的靜態值
        reduce_vars: true,
      },
      output: {
        // 最緊湊的輸出
        beautify: false,
        // 移除所有的注解
        comments: false,
      }
    }),
    new PrepackWebpackPlugin()
  ]
};
