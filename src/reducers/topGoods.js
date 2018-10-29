
import * as ActionTypes from '../actions/'
import {Map,List,fromJS} from 'immutable'
import {formatGoodsListData} from '../util/formatData'

export default (state = fromJS({
	fetching : false,
	error 	 : false,
	data 	 : fromJS([])
}), action) => {

	if (action.type === ActionTypes.FETCH_TOP_GOODS_SUCCESS) {
		const {topGoods} = action.response

		return state.merge({
			fetching : false,
			error 	 : false,
			data 	 : fromJS(topGoods.list?topGoods.list.map(formatGoodsListData).map(vv=>{
				vv.isTop = true
				return vv
			}):[])
		})
	}else if(action.type === ActionTypes.FETCH_TOP_GOODS_REQUEST){
		return state.merge({
			fetching : true,
			error 	 : false
		})
	}else if(action.type === ActionTypes.FETCH_GOODS_SUCCESS){
		//合并Goods数据
		const {goods} = action.response

		return state.merge({
			fetching : false,
			error 	 : false,
			data: [...state.get('data')].concat(goods.list)
		})
	}else if(action.type === ActionTypes.CLEAR_TOP_GOODS){
		return state.merge({
			data 	 : fromJS([])
		})
	}

	return state
}
