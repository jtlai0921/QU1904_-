import React, { Component } from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';
import path from 'path';
import './index.css';

class App extends Component {

  // 在按鈕被點擊時
  handleBtnClick() {
    // 新視窗對應的頁面的 URI 位址
    const modalPath = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
    // 新視窗的大小
    let win = new remote.BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () {
      // 視窗被關閉時清理資源
      win = null
    })
    // 載入網頁
    win.loadURL(modalPath)
    // 顯示視窗
    win.show()
  }

  render() {
    return (
      <div>
        <h1>Page Index</h1>
        <button onClick={this.handleBtnClick}>Open Page Login</button>
      </div>
    )
  }
}

render(<App/>, window.document.getElementById('app'));
