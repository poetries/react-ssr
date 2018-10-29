import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes'
import { Provider } from 'react-redux'
import {getClientStore} from '../store'
import '../config/Interceptors'

const store = getClientStore()

const App = ()=>{
  return (
    <Provider store={store}>
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Provider>
  )
}
// 这里不能使用render
ReactDOM.hydrate(<App />, document.getElementById('root'))
