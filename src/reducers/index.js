import {combineReducers} from 'redux-immutable'

import {routerReducer as routing} from 'react-router-redux'

const rootReducer = combineReducers({
	routing,
	goods			    : require('./goods').default,
	topGoods			: require('./topGoods').default,
	goodsDetail		: require('./goodsDetail').default
})

export default rootReducer
