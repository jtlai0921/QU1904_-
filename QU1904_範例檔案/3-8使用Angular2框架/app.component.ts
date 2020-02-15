import {Component} from '@angular/core';

// 透過註釋的模式描述清楚了這個檢視元件所需的模版、型態、資料、邏輯。
@Component({
  // 標簽名稱
  selector: 'app-root',
  // HTML 模版
  template: '<h1>{{msg}}</h1>',
  // CSS 型態
  styles: ['h1{ color:red; }']
})
export class AppComponent {
  msg = 'Hello,Webpack';
}
