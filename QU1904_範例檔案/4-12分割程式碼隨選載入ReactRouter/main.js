import React, {PureComponent, createElement} from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
import PageHome from './pages/home';

/**
 * 異步載入元件
 * @param load 元件載入函數，load 函數會傳回一個 Promise，在檔案載入完成時 resolve
 * @returns {AsyncComponent} 傳回一個高階元件用於封裝需要異步載入的元件
 */
function getAsyncComponent(load) {
  return class AsyncComponent extends PureComponent {

    componentDidMount() {
      // 在高階元件 DidMount 時才去執行網路載入步驟
      load().then(({default: component}) => {
        // 程式碼載入成功，取得到了程式碼匯出的值，呼叫 setState 知會高階元件重新著色子元件
        this.setState({
          component,
        })
      });
    }

    render() {
      const {component} = this.state || {};
      // component 是 React.Component 型態，需要透過 React.createElement 生產一個元件案例
      return component ? createElement(component) : null;
    }
  }
}

// 根元件
function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/login'>Login</Link>
        </nav>
        <hr/>
        <Route exact path='/' component={PageHome}/>
        <Route path='/about' component={getAsyncComponent(
          // 異步載入函數，異步地載入 PageAbout 元件
          () => import(/* webpackChunkName: 'page-about' */'./pages/about')
        )}
        />
        <Route path='/login' component={getAsyncComponent(
          // 異步載入函數，異步地載入 PageAbout 元件
          () => import(/* webpackChunkName: 'page-login' */'./pages/login')
        )}
        />
      </div>
    </HashRouter>
  )
}

// 著色根元件
render(<App/>, window.document.getElementById('app'));
