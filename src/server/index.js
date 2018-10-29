import express from 'express'
import path from 'path'
import proxy from 'express-http-proxy'
import apiConfig from '../config/apiConfig'
import { matchRoutes } from 'react-router-config'
import { renderHTML } from '../config/tmp'
import { render } from './render'
import {getStore} from '../store'
import routes from '../config/routes'
import Routes from '../routes'

const app = express()

//静态资源代理
app.use(express.static(path.resolve('public')))

// express代理远程API转发
app.use('/api',proxy(apiConfig.apiDomain, {
    proxyReqPathResolver: function (req) {
      return req.url
    }
}));

app.get('*', (req, res) => {
  const store = getStore()
  // 根据路由路径往store里添加数据
  const matchedRoutes = matchRoutes(routes,req.path)

  // 执行matchRoutes中组件对应的loadData获取数据
  const promises = []
  matchedRoutes.forEach(item=>{
    if(item.route.loadData){
      const promise = new Promise((resolve,reject)=>{
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })
  Promise.all(promises).then(()=>{
    const context = {css:[]}
    const html = render(store,Routes,req,context)

    // 301重定向 组件中有redirect的话则重定向
    if(context.action === 'REPLACE'){
      res.redirect(301,context.url)
    }else if(context.NOT_FOUND){
      res.status(404)
      res.send(html)
    }else{
      res.send(html)
    }

  }).catch(error=>{
    console.log("error:",error)
  })

})

app.listen(8000, () => console.log('app listening on port 8000!'))
