import {Route} from 'react-router-dom'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Search from '../pages/Search'
import NotFound from '../components/NotFound'
import App from '../App'

export default [
  {
    path: '/',
    component: App,
    routes:[
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home'
      },
      {
        path: '/detail/:id',
        component: Detail,
        exact: true,
        loadData: Detail.loadData,
        key: 'detail'
      },
      {
        path: '/search',
        component: Search,
        exact: true,
        key: 'search'
      },
      {
        component: NotFound
      }
    ]
  }
]
