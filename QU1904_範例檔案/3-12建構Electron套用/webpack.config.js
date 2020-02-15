const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

// 使用本文的主角 AutoWebPlugin，自動尋找 pages 目錄下的所有目錄，把每一個目錄看成一個一頁套用
const autoWebPlugin = new AutoWebPlugin('pages', {
  template: './template.html', // HTML 模版檔案所在的檔案路徑
  postEntrys: ['./common.css'],// 所有頁面都相依這份通用的 CSS 型態檔案
  // 分析出所有頁面公共的程式碼
  commonsChunk: {
    name: 'common',// 分析出公共程式碼 Chunk 的名稱
  },
});

module.exports = {
  // AutoWebPlugin 會找為尋找到的所有一頁套用，產生對應的入口組態，
  // autoWebPlugin.entry 方法可以取得到產生入口組態
  entry: autoWebPlugin.entry({
    // 這裡可以加入你額外需要的 Chunk 入口
  }),
  // 建構出用於 Electron 著色執行緒用的 JavaScript 程式碼，也就是這2個視窗需要的程式碼
  target: 'electron-renderer',
  output: {
    filename: '[name]_[chunkhash:8].js',// 給輸出的檔名稱加上 hash 值
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
      {
        test: /\.css/,// 增加對 CSS 檔案的支援
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize'] // 壓縮 CSS 程式碼
        }),
      },
    ]
  },
  plugins: [
    autoWebPlugin,
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`,// 給輸出的 CSS 檔名稱加上 hash 值
    }),
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
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
    }),
  ],
  devtool: 'source-map',
};
