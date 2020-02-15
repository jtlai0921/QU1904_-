const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',// 給輸出的檔名稱加上 hash 值
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目錄下的檔案，node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 使用 ParallelUglifyPlugin 平行壓縮輸出的 JS 程式碼
    new ParallelUglifyPlugin({
      // 快取壓縮後的結果，下次遇到一樣的輸入時直接從快取中取得壓縮後的結果傳回
      // cacheDir 用於組態快取存放的目錄路徑
      cacheDir: '.uglify-cache',
      uglifyJS: {
        output: {
          // 最緊湊的輸出
          beautify: false,
          // 移除所有的注解
          comments: false,
        },
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
      }
    }),
  ],
};
