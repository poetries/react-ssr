import React from 'react';
import {Route} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from './config/routes'

export default (
  <div>
    {renderRoutes(routes)}
  </div>
)
