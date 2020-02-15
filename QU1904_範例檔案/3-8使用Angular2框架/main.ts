// 讓 Angular2 標準執行需要的 polyfill
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
// Angular2 框架核心模組
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// 專案自訂檢視元件
import {AppComponent} from './app.component';

@NgModule({
  // 該 NgModule 所相依的檢視元件
  declarations: [AppComponent],
  // 該 NgModule 所相依的其它 NgModule
  imports: [BrowserModule],
  // 套用的根檢視元件，只有根 NgModule 需要設定
  bootstrap: [AppComponent]
})
class AppModule {
}

// 從 AppModule 啟動套用
platformBrowserDynamic().bootstrapModule(AppModule);
