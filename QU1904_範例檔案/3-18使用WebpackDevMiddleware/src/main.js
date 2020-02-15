// 透過 CommonJS 規範匯入 show 函數
const show = require('./show.js');
// 執行 show 函數
show('Webpack1');

// 為了支援模組熱置換
if (module.hot) {
  module.hot.accept();
}
