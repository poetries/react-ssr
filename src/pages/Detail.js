import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
	fetchGoods,
	fetchGoodsDetail,
	fetchTopGoods,
	goodsDataReport,
	clearGoodsList
} from "../actions";

class Detail extends Component {
  constructor(props) {
		super(props)
    this.state = {
			page:1
		}
	}
	// 服务端渲染不执行componentDidMount
	componentDidMount() {
		const {goodsDetail} = this.props
		if(goodsDetail && !goodsDetail.goodsId){
			this.props.fetchGoodsDetail(10212)
		}
	}
  render(){
		const {goodsDetail} = this.props

    return (
      <div>
				<div>{goodsDetail.goodsName}</div>
			  <div>{goodsDetail.goodsId}</div>
			  <div>{goodsDetail.url}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
	goods: state.get('goods').toJS(),
	topGoods: state.get('topGoods').toJS(),
	goodsDetail: state.getIn(['goodsDetail','data']).toJS()
})

const ExportDetail = connect(mapStateToProps, {
	fetchGoods,
	fetchGoodsDetail,
	fetchTopGoods,
	goodsDataReport,
	clearGoodsList
})(Detail)

// 负责在服务端渲染之前，把这个路由的数据提前加载好
ExportDetail.loadData = (store)=>{
	return store.dispatch(fetchGoodsDetail(10212))
}

export default ExportDetail
