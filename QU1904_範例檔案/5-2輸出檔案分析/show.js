function show(content) {
  window.document.getElementById('app').innerText = 'Hello,' + content;
}

// 透過 CommonJS 規範匯出 show 函數
module.exports = show;
