
import * as ActionTypes from '../actions/'
import {Map,List,fromJS} from 'immutable'
import {formatGoodsListData} from '../util/formatData'

export default (state = fromJS({
	fetching : false,
	error 	 : false,
	data 	 : fromJS([])
}), action) => {

	if (action.type === ActionTypes.FETCH_GOODS_SUCCESS) {
		const {goods} = action.response
		const {totalCount,pageSize} = goods.pagination

		return state.merge({
			fetching : false,
			error 	 : false,
			totalPage: Math.ceil( parseInt(totalCount)/parseInt(pageSize) ),
			data 	 : fromJS(goods.list?goods.list.map(formatGoodsListData):[])
		})
	}else if(action.type === ActionTypes.FETCH_GOODS_REQUEST){
		return state.merge({
			fetching : true,
			error 	 : false
		})
	}else if(action.type === ActionTypes.CLERA_SEARCH_LIST){
		return state.merge({
			fetching : true,
			error 	 : false,
			data 	 : fromJS([])
		})
	}
	return state
}
