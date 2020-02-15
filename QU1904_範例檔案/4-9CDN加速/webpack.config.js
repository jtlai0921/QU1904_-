const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  entry: {
    // Chunk app 的 JS 執行入口檔案
    app: './main.js'
  },
  output: {
    // 給輸出的 JavaScript 檔名稱加上 Hash 值
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    // 指定存放 JavaScript 檔案的線上目錄
    publicPath: '//js.cdn.com/id/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目錄下的檔案，node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加對 CSS 檔案的支援
        test: /\.css/,
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ExtractTextPlugin.extract({
          // 壓縮 CSS 程式碼
          use: ['css-loader?minimize'],
          // 指定存放 CSS 中匯入的資源（例如圖片）的線上目錄
          publicPath: '//img.cdn.com/id/'
        }),
      },
      {
        // 增加對 PNG 檔案的支援
        test: /\.png/,
        // 給輸出的 PNG 檔名稱加上 Hash 值
        use: ['file-loader?name=[name]_[hash:8].[ext]'],
      },
    ]
  },
  plugins: [
    // 使用 WebPlugin 自動產生 HTML
    new WebPlugin({
      // HTML 模版檔案所在的檔案路徑
      template: './template.html',
      // 輸出的 HTML 的檔名稱
      filename: 'index.html',
      // 指定存放 CSS 檔案的線上目錄
      stylePublicPath: '//css.cdn.com/id/',
    }),
    new ExtractTextPlugin({
      // 給輸出的 CSS 檔名稱加上 Hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 壓縮輸出的 JS 程式碼
    new UglifyJsPlugin({
      compress: {
        // 在UglifyJs移除沒有用到的程式碼時不輸出警示
        warnings: false,
        // 移除所有的 `console` 敘述，可以相容ie瀏覽器
        drop_console: true,
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
  ],
};
