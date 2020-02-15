// 動作 DOM 元素，把 content 顯示到網頁上
export function show(content) {
  window.document.getElementById('app').innerText = `Hello,${content}`;
}
