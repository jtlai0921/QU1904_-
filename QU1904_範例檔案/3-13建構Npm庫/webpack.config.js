const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 模組的入口檔案
  entry: './src/index.js',
  output: {
    // 輸出檔案的名稱
    filename: 'index.js',
    // 輸出檔案的存放目錄
    path: path.resolve(__dirname, 'lib'),
    // 輸出的程式碼符合 CommonJS 模組化規範，以供給其它模組匯入使用。
    libraryTarget: 'commonjs2',
  },
  // 透過正則命中所有以 react 或是 babel-runtime 開頭的模組
  // 這些模組使用外部的，不能被打包進輸出的程式碼裡
  externals: /^(react|babel-runtime)/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目錄下的檔案
        // node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加對 CSS 檔案的支援
        test: /\.css/,
        // 分析出 Chunk 中的 CSS 程式碼到單獨的檔案中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 輸出的 CSS 檔名稱
      filename: 'index.css',
    }),
  ],
  // 輸出 Source Map
  devtool: 'source-map',
};
