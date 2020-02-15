// 異步載入 show.js
import('./show').then((show) => {
  // 執行 show 函數
  show('Webpack');
});
