const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = function (env = {}, argv) {
  const plugins = [];

  const isProduction = env['production'];

  // 在產生環境才壓縮
  if (isProduction) {
    plugins.push(
      // 壓縮輸出的 JS 程式碼
      new UglifyJsPlugin({
        // 最緊湊的輸出
        beautify: false,
        // 移除所有的注解
        comments: false,
        compress: {
          // 在UglifyJs移除沒有用到的程式碼時不輸出警示
          warnings: false,
          // 移除所有的 `console` 敘述，可以相容ie瀏覽器
          drop_console: true,
          // 內嵌定義了但是只用到一次的變數
          collapse_vars: true,
          // 分析出出現多次但是沒有定義成變數去參考的靜態值
          reduce_vars: true,
        }
      })
    )
  }

  return {
    // JS 執行入口檔案
    entry: './main.js',
    output: {
      // 把所有相依的模組合並輸出到一個 bundle.js 檔案
      filename: 'bundle.js',
      // 輸出檔案都放到 dist 目錄下
      path: path.resolve(__dirname, './dist'),
    },
    plugins: plugins,
    // 在產生環境不輸出 Source Map
    devtool: isProduction ? undefined : 'source-map',
  };
}
