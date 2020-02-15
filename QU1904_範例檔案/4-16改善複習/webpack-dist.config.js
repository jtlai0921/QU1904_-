const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {AutoWebPlugin} = require('web-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// 自動尋找 pages 目錄下的所有目錄，把每一個目錄看成一個一頁套用
const autoWebPlugin = new AutoWebPlugin('./src/pages', {
  // HTML 模版檔案所在的檔案路徑
  template: './template.html',
  // 分析出所有頁面公共的程式碼
  commonsChunk: {
    // 分析出公共程式碼 Chunk 的名稱
    name: 'common',
  },
  // 指定存放 CSS 檔案的 CDN 目錄 URL
  stylePublicPath: '//css.cdn.com/id/',
});

module.exports = {
  // AutoWebPlugin 會找為尋找到的所有一頁套用，產生對應的入口組態，
  // autoWebPlugin.entry 方法可以取得到產生入口組態
  entry: autoWebPlugin.entry({
    // 這裡可以加入你額外需要的 Chunk 入口
    base: './src/base.js',
  }),
  output: {
    // 給輸出的檔名稱加上 hash 值
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    // 指定存放 JavaScript 檔案的 CDN 目錄 URL
    publicPath: '//js.cdn.com/id/',
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
        use: ExtractTextPlugin.extract({
          use: ['happypack/loader?id=css'],
          // 指定存放 CSS 中匯入的資源（例如圖片）的 CDN 目錄 URL
          publicPath: '//img.cdn.com/id/'
        }),
      },
    ]
  },
  plugins: [
    autoWebPlugin,
    // 4-14開啟ScopeHoisting
    new ModuleConcatenationPlugin(),
    // 4-3使用HappyPack
    new HappyPack({
      // 用唯一的標誌符 id 來代表目前的 HappyPack 是用來處理一類別特定的檔案
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
      // 透過 minimize 選項壓縮 CSS 程式碼
      loaders: ['css-loader?minimize'],
    }),
    new ExtractTextPlugin({
      // 給輸出的 CSS 檔名稱加上 hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    // 4-11分析公共程式碼
    new CommonsChunkPlugin({
      // 從 common 和 base 兩個現成的 Chunk 中分析公共的部分
      chunks: ['common', 'base'],
      // 把公共的部分放到 base 中
      name: 'base'
    }),
    new DefinePlugin({
      // 定義 NODE_ENV 環境變數為 production 去除 react 程式碼中的開發時才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 使用 ParallelUglifyPlugin 平行壓縮輸出的 JS 程式碼
    new ParallelUglifyPlugin({
      // 傳遞給 UglifyJS 的參數
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
      },
    }),
  ]
};
