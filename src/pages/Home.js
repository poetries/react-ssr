import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet";
import styled from 'styled-components'
import {
	fetchGoods,
	fetchGoodsDetail,
	fetchTopGoods,
	goodsDataReport,
	clearGoodsList
} from "../actions";
import { List } from 'antd-mobile';

const Item = List.Item;

const Wrapper = styled.div`
	font-size:16px;
`

class Home extends Component {
  constructor(props) {
		super(props)
    this.state = {
			page:1
		}
	}
	// 服务端渲染不执行componentDidMount
	componentDidMount() {
		const {topGoods} = this.props
		if(topGoods && !topGoods.data.length){
			this.props.fetchTopGoods()
		}
	}
  render(){
		const {topGoods} = this.props

		console.log(this.props.staticContext,'staticContext')
    return (
       <Wrapper>
				 <List renderHeader={() => 'Basic Style'} className="my-list">

					{
	 				topGoods.data.map(v=><Item extra={v.goodsId} key={v.goodsId}>{v.goodsName}</Item>)
	 			 }
      	</List>

       </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
	goods: state.get('goods').toJS(),
	topGoods: state.get('topGoods').toJS(),
	goodsDetail: state.getIn(['goodsDetail','data']).toJS()
})

const ExportHome = connect(mapStateToProps, {
	fetchGoods,
	fetchGoodsDetail,
	fetchTopGoods,
	goodsDataReport,
	clearGoodsList
})(Home)

// 负责在服务端渲染之前，把这个路由的数据提前加载好
ExportHome.loadData = (store)=>{
	return store.dispatch(fetchTopGoods())
}

export default ExportHome
