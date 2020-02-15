import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppComponent } from './AppComponent';

// 匯出著色函數，以給采用 Nodejs 撰寫的 HTTP 伺服器程式碼呼叫
export function render() {
  // 把根元件著色成 HTML 字串
  return renderToString(<AppComponent/>)
}
