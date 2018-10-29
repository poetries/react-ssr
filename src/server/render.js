import React from 'react';
import {StaticRouter} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import {renderHTML} from '../config/tmp'
import { Provider } from 'react-redux'

export const render = (store,routes,req,context)=>{
    const content = renderToString((
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          {routes}
        </StaticRouter>
      </Provider>
    ))
    const cssStr = context.css.length ? context.css.join('\n') : ''
    return renderHTML(content,store,cssStr)
}
