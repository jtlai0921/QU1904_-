const webpack = require('webpack');
// 讀取 webpack.config.js 檔案中的組態
const config = require('./webpack.config');

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 建構過程出錯
  }
  // 成功執行完建構
});
