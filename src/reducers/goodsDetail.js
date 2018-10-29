
import * as ActionTypes from '../actions/'
import {Map,List,fromJS} from 'immutable'
import {formatGoodsListData} from '../util/formatData'
import {GoodsSourceMap} from '../config/constants';
import moment from 'moment'

export default (state = fromJS({
	fetching : false,
	error 	 : false,
	data 	 : fromJS({})
}), action) => {

	if (action.type === ActionTypes.FETCH_GOODS_DETAIL_SUCCESS) {
		const {goodsDetail} = action.response
		const data = goodsDetail

		data.inStockTime = moment(data.inStockTime * 1000).format('MM-DD')
		data.source = `来自${GoodsSourceMap[data.source]}`
		data.goodsName = `${data.goodsName.length>=40?data.goodsName.slice(0,40)+'...':data.goodsName}`
		data.price = `￥${data.price}`
		data.priceByCoupon = data.priceByCoupon ? `￥${data.priceByCoupon}`:''
		data.beginDate = String(data.beginDate).slice(4).replace(/(\d{2})(\d{2})/,'$1-$2')
		data.endDate = String(data.endDate).slice(4).replace(/(\d{2})(\d{2})/,'$1-$2')
		data.impressionCount = data.impressionCount>=1000?`${parseFloat(data.impressionCount/1000).toFixed(1)}k`:data.impressionCount
		data.likeCount = data.likeCount>=1000?`${parseFloat(data.likeCount/1000).toFixed(1)}k`:data.likeCount

		if(data.sameGoodsStruct){
			data.sameGoodsStruct.sameGoods.forEach(v=>{
				v.price = `￥${v.price}`
				v.source = `${GoodsSourceMap[v.source]}同款`
			})
		}

		return state.merge({
			fetching : false,
			error 	 : false,
			data 	 : fromJS(data)
		})
	}else if(action.type === ActionTypes.FETCH_GOODS_DETAIL_REQUEST){
		return state.merge({
			fetching : true,
			error 	 : false
		})
	}

	return state
}
