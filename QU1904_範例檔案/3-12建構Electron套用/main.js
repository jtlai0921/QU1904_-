const { app, BrowserWindow } = require('electron')

// 保持一個對於 window 物件的全局參考，若果你不這樣做，
// 當 JavaScript 物件被垃圾回收， window 會被自動地關閉
let win

// 開啟主視窗
function createWindow() {
  // 建立瀏覽器視窗
  win = new BrowserWindow({ width: 800, height: 600 })

  // 載入套用的 index.html
  const indexPageURL = `file://${__dirname}/dist/index.html`;
  win.loadURL(indexPageURL);

  // 當 window 被關閉，這個事件會被觸發
  win.on('closed', () => {
    // 取消參考 window 物件
    win = null
  })
}

// Electron 會在建立瀏覽器視窗時呼叫這個函數。
app.on('ready', createWindow)

// 當全部視窗關閉時離開
app.on('window-all-closed', () => {
  // 在 macOS 上，除非使用者用 Cmd + Q 確定地離開
  // 否則絕大部分套用會保持啟動
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
