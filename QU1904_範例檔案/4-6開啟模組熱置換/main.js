import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';
import './main.css';

render(<AppComponent/>, window.document.getElementById('app'));

// 只有當開啟了模組熱置換時 module.hot 才存在
if (module.hot) {
  // accept 函數的第一個參數指出目前檔案接受哪些子模組的置換，這裡只接受 ./AppComponent 這個子模組
  // 第二個參數用於在新的子模組載入完畢後需要執行的邏輯
  module.hot.accept(['./AppComponent'], () => {
    // 重新執行下群組建著色邏輯
    render(<AppComponent/>, window.document.getElementById('app'));
  });
}
