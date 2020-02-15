import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';

// 把根元件著色到 DOM 樹上
render(<AppComponent/>, window.document.getElementById('app'));
