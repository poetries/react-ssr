import React,{Component} from 'react'
import {renderRoutes} from 'react-router-config'
import Header from './components/Header'
import styles from './index.css'
import withStyle from './withStyle'

class App extends Component {
  render(){
    return (
       <div>
         <Header />
       {renderRoutes(this.props.route.routes)}
       </div>
    )
  }
}

export default withStyle(App,styles)
