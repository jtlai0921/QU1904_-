require('./main.css');
// const runtime = require('serviceworker-webpack-plugin/lib/runtime');

if (navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded',function() {
    // 呼叫 serviceWorker.register 登錄，參數 /sw.js 為指令稿檔案所在的 URL 路徑
    navigator.serviceWorker.register('sw.js');
  });
}

// require('offline-plugin/runtime').install();
window.document.getElementById('app').innerText = 'Hello,Webpack';
