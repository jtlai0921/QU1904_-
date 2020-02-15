const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  // JS 執行入口檔案
  entry: {
    // 把 React 關聯的放到一個單獨的動態連結庫
    react: ['react', 'react-dom'],
    // 把專案需要所有的 polyfill 放到一個單獨的動態連結庫
    polyfill: ['core-js/fn/object/assign', 'core-js/fn/promise', 'whatwg-fetch'],
  },
  output: {
    // 輸出的動態連結庫的檔名稱，[name] 代表目前動態連結庫的名稱，也就是 entry 中組態的 react 和 polyfill
    filename: '[name].dll.js',
    // 輸出的檔案都放到 dist 目錄下
    path: path.resolve(__dirname, 'dist'),
    // 存放動態連結庫的全局變數名稱，例如對應 react 來說就是 _dll_react
    // 之所以在前面加上 _dll_ 是為了防止全局變數沖突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 動態連結庫的全局變數名稱，需要和 output.library 中保持一致
      // 該字段的值也就是輸出的 manifest.json 檔案 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述動態連結庫的 manifest.json 檔案輸出時的檔名稱
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
    }),
  ],
};
