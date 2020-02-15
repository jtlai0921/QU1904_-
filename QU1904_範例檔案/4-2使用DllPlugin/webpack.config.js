const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  entry: {
    // 定義 入口 Chunk
    main: './main.js'
  },
  output: {
    // 輸出檔案的名稱
    filename: '[name].js',
    // 輸出檔案都放到 dist 目錄下
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // 專案原始程式使用了 ES6 和 JSX 語法，需要使用 babel-loader 轉換
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  plugins: [
    // 告訴 Webpack 使用了哪些動態連結庫
    new DllReferencePlugin({
      // 描述 react 動態連結庫的檔案內容
      manifest: require('./dist/react.manifest.json'),
    }),
    new DllReferencePlugin({
      // 描述 polyfill 動態連結庫的檔案內容
      manifest: require('./dist/polyfill.manifest.json'),
    }),
  ],
  devtool: 'source-map'
};
