import React, { Component } from 'react';
import './index.css';

// 匯出該元件供給其它模組使用
export default class HelloWebpack extends Component {
  render() {
    return <h1 className="hello-component">Hello,Webpack</h1>
  }
}
