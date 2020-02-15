const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

// 從 webpack.config.js 檔案中讀取 Webpack 組態
const config = require('./webpack.config.js');
// 案例化一個 Expressjs app
const app = express();

// 用讀取到的 Webpack 組態案例化一個 Compiler
const compiler = webpack(config);
// 給 app 登錄 webpackMiddleware 中介軟體
app.use(webpackMiddleware(compiler));
// 為了支援模組熱置換
app.use(require('webpack-hot-middleware')(compiler));
// 把專案根目錄作為靜態資源目錄，用於服務 HTML 檔案
app.use(express.static('.'));
// 啟動 HTTP 伺服器，監聽在 3000 通訊埠
app.listen(3000, () => {
  console.info('成功監聽在 3000');
});
