window.document.getElementById('btn').addEventListener('click', function () {
  // 當按鈕被點擊後才去載入 show.js 檔案，檔案載入成功後執行檔案匯出的函數
  import(/* webpackChunkName: "show" */ './show').then((show) => {
    show('Webpack');
  })
});
