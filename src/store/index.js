import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {fromJS} from "immutable";
import {createLogger } from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers/'

// 保证每个用户访问的时候store都是独立的
export const getStore = ()=> createStore(rootReducer,applyMiddleware(thunk, api))

// 拆分成两个store的原因是需要拿到服务器返回的store数据，而不是通过客户端渲染
export const getClientStore = ()=> {
  const defatulState = window.context.state //拿到服务器渲染的时候对应的内容

  // 这样创建客户端的初始数据和服务端的初始数据一样
  return createStore(rootReducer, fromJS(defatulState), applyMiddleware(thunk, api))
}
