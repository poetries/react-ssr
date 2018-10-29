import {CALL_API} from '../middleware/api'
import moment from 'moment'
import {GoodsSourceMap,PAGE_SIZE} from '../config/constants'
import {Toast} from 'antd-mobile'
import axios from 'axios'

export const CLERA_SEARCH_LIST ='CLERA_SEARCH_LIST'
export const CLEAR_TOP_GOODS ='CLEAR_TOP_GOODS'
export const clearSearchList = ()=> ({type:CLERA_SEARCH_LIST})
export const clearGoodsList = ()=> ({type:CLEAR_TOP_GOODS})


export const FETCH_GOODS_REQUEST = 'FETCH_GOODS_REQUEST'
export const FETCH_GOODS_SUCCESS = 'FETCH_GOODS_SUCCESS'
export const FETCH_GOODS_FAILURE = 'FETCH_GOODS_FAILURE'
export const fetchGoods = (params={},onSuccess) => (dispatch,getState) => {
	return dispatch( {
		[CALL_API] : {
			types : [FETCH_GOODS_REQUEST, FETCH_GOODS_SUCCESS, FETCH_GOODS_FAILURE],
			endpoint: `/v1/goods`,
			schema : 'goods',
      query  : {
        method:'get',
				isServer:true,
        data:{
					current_page:params.page || 1,
					page_size:params.pageSize || PAGE_SIZE,
					...params
        }
      }
		}
	}).then(onSuccess)
}



// 置顶列表
export const FETCH_TOP_GOODS_REQUEST = 'FETCH_TOP_GOODS_REQUEST'
export const FETCH_TOP_GOODS_SUCCESS = 'FETCH_TOP_GOODS_SUCCESS'
export const FETCH_TOP_GOODS_FAILURE = 'FETCH_TOP_GOODS_FAILURE'
export const fetchTopGoods = (params={}) => (dispatch,getState) => {

	return dispatch( {
		[CALL_API] : {
			types : [FETCH_TOP_GOODS_REQUEST, FETCH_TOP_GOODS_SUCCESS, FETCH_TOP_GOODS_FAILURE],
			endpoint: `/v1/top-goods`,
			schema : 'topGoods',
      query  : {
        method:'get',
				isServer:true,
        data:{

        }
      }
		}
	}).then(res=>{
		if(res && res.topGoods){
			return dispatch(fetchGoods(params))
		}

	})
}


// 商品详情
export const FETCH_GOODS_DETAIL_REQUEST = 'FETCH_GOODS_DETAIL_REQUEST'
export const FETCH_GOODS_DETAIL_SUCCESS = 'FETCH_GOODS_DETAIL_SUCCESS'
export const FETCH_GOODS_DETAIL_FAILURE = 'FETCH_GOODS_DETAIL_FAILURE'
export const fetchGoodsDetail = (goodsId='') => (dispatch,getState) => {
	return dispatch( {
		[CALL_API] : {
			types : [FETCH_GOODS_DETAIL_REQUEST, FETCH_GOODS_DETAIL_SUCCESS, FETCH_GOODS_DETAIL_FAILURE],
			endpoint: `/v1/goods/${goodsId}`,
			schema : 'goodsDetail',
      query  : {
        method:'get',
				isServer:true,
        data:{

        }
      }
		}
	})
}

// 数据上报
export const GOODS_DATA_REPORT_REQUEST = 'GOODS_DATA_REPORT_REQUEST'
export const GOODS_DATA_REPORT_SUCCESS = 'GOODS_DATA_REPORT_SUCCESS'
export const GOODS_DATA_REPORT_FAILURE = 'GOODS_DATA_REPORT_FAILURE'
export const goodsDataReport = (params) => (dispatch,getState) => {
	return dispatch( {
		[CALL_API] : {
			types : [GOODS_DATA_REPORT_REQUEST, GOODS_DATA_REPORT_SUCCESS, GOODS_DATA_REPORT_FAILURE],
			endpoint: '/v1/special-selling-data-reports',
			schema : 'dataReport',
      query  : {
        method:'post',
				isServer:false,
        data:{
					...params
        }
      }
		}
	}).then(res=>{
		if(res && res.dataReport && params.dataType=='3'){
			Toast.success('举报成功~^_^~',1);
		}
	})
}
