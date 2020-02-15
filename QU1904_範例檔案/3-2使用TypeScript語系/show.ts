// 動作 DOM 元素，把 content 顯示到網頁上
// 透過 ES6 模組規範匯出 show 函數
export function show(content: string) {
  window.document.getElementById('app').innerText = 'Hello,' + content;
}
