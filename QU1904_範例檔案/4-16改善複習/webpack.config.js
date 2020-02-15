const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const {AutoWebPlugin} = require('web-webpack-plugin');
const HappyPack = require('happypack');

// 自動尋找 pages 目錄下的所有目錄，把每一個目錄看成一個一頁套用
const autoWebPlugin = new AutoWebPlugin('./src/pages', {
  // HTML 模版檔案所在的檔案路徑
  template: './template.html',
  // 分析出所有頁面公共的程式碼
  commonsChunk: {
    // 分析出公共程式碼 Chunk 的名稱
    name: 'common',
  },
});

module.exports = {
  // AutoWebPlugin 會找為尋找到的所有一頁套用，產生對應的入口組態，
  // autoWebPlugin.entry 方法可以取得到產生入口組態
  entry: autoWebPlugin.entry({
    // 這裡可以加入你額外需要的 Chunk 入口
    base: './src/base.js',
  }),
  output: {
    filename: '[name].js',
  },
  resolve: {
    // 使用絕對路徑指明第三方模組存放的位置，以減少搜尋步驟
    // 其中 __dirname 表示目前工作目錄，也就是專案根目錄
    modules: [path.resolve(__dirname, 'node_modules')],
    // 只采用 main 字段作為入口檔案描述字段，以減少搜尋步驟
    mainFields: ['jsnext:main', 'main'],
  },
  module: {
    rules: [
      {
        // 若果專案原始程式中只有 js 檔案就不要寫成 /\.jsx?$/，提升正規表示法效能
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        // 只對專案根目錄下的 src 目錄中的檔案采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=ui-component'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        // 增加對 CSS 檔案的支援
        test: /\.css/,
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ['happypack/loader?id=css'],
      },
    ]
  },
  plugins: [
    autoWebPlugin,
    // 使用HappyPack
    new HappyPack({
      id: 'babel',
      // babel-loader 支援快取轉換出的結果，透過 cacheDirectory 選項開啟
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HappyPack({
      // UI 元件載入分割
      id: 'ui-component',
      loaders: [{
        loader: 'ui-component-loader',
        options: {
          lib: 'antd',
          style: 'style/index.css',
          camel2: '-'
        }
      }],
    }),
    new HappyPack({
      id: 'css',
      // 如何處理 .css 檔案，用法和 Loader 組態中一樣
      loaders: ['style-loader', 'css-loader'],
    }),
    // 4-11分析公共程式碼
    new CommonsChunkPlugin({
      // 從 common 和 base 兩個現成的 Chunk 中分析公共的部分
      chunks: ['common', 'base'],
      // 把公共的部分放到 base 中
      name: 'base'
    }),
  ],
  watchOptions: {
    // 4-5使用自動更新：不監聽的 node_modules 目錄下的檔案
    ignored: /node_modules/,
  }
};
