const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  // JS 執行入口檔案
  entry: {
    main: './main.js',
  },
  output: {
    // 把所有相依的模組合並輸出到一個 bundle.js 檔案
    filename: '[name].js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 把對 .js 檔案的處理轉交給 id 為 babel 的 HappyPack 案例
        use: ['happypack/loader?id=babel'],
        // 排除 node_modules 目錄下的檔案，node_modules 目錄下的檔案都是采用的 ES5 語法，沒必要再透過 Babel 去轉換
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 把對 .css 檔案的處理轉交給 id 為 css 的 HappyPack 案例
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['happypack/loader?id=css'],
        }),
      },
    ]
  },
  plugins: [
    new HappyPack({
      // 用唯一的標誌符 id 來代表目前的 HappyPack 是用來處理一類別特定的檔案
      id: 'babel',
      // 如何處理 .js 檔案，用法和 Loader 組態中一樣
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HappyPack({
      id: 'css',
      // 如何處理 .css 檔案，用法和 Loader 組態中一樣
      loaders: ['css-loader'],
    }),
    new ExtractTextPlugin({
      filename: `[name].css`,
    }),
  ],
  devtool: 'source-map' // 輸出 source-map 方便直接除錯 ES6 原始程式
};
