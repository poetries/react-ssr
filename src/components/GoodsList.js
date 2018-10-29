import React, {Component} from 'react'
import { List,Icon,SearchBar,Flex,Modal,Toast } from 'antd-mobile';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import storage from 'good-storage'
import moment from 'moment'
import { IoIosMenu,IoIosHeart } from "react-icons/io"
import { MdStarHalf } from "react-icons/md";
import { withRouter } from 'react-router-dom'
import { IoMdArrowUp,IoIosEye,IoIosWarning,IoMdShare } from "react-icons/io";
import {DataReportType,GOODS_DATA} from '../config/constants'
import {openQuickapp,openApp,hasInstalledApp,createA,isOverReportOrLike} from '../util'

const Item = List.Item;
const Brief = Item.Brief;

const IconWrapper = styled.div`
	display: inline-block;
	font-size:12px;
	margin-right:6px;
	position:relative;
	top:2px;
`

const WrapperLink = styled.div`
	border-radius: 10px;
	background: #d46070;
	padding: 0px 10px;
	margin-right: 10px;
	text-align: center;
	height: 30px;
  line-height: 30px;
`
const WrapperSkipLink = styled.div`
	border-radius: 10px;
	background: #d46070;
	padding: 0px 10px;
	margin-right: 10px;
	text-align: center;
	height: 30px;
  line-height: 30px;
	margin-left: 30px;
`

const GoodsWrapper = styled.div`
	.am-list-body::after {
			@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx){
				background-color: #fff !important;
			}
	}
	.am-flexbox-item {
		font-size: 12px;
		color: #bcb7b7;
		margin-left: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.am-list-footer {
		line-height: 20px;
		padding-bottom: 6px;
		padding-top: 0;
	}
	.am-list-item.am-list-item-middle{
		min-height: 20px;
		margin-top: -2px;
	}
	.price-color {
		color:#d46070
	}
	.goods-time {
		text-align: right;
		padding-right: 5px;
	}
	.timeWrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
	.timeWrapper .skip-link {
		color: #fafdfb;
    background: rgb(212, 96, 112);
    border-radius: 3px;
    font-size: 12px;
    padding: 3px;
		position: absolute;
		right: 30px;

		@media screen  and (max-width: 320px) {
			right: 10px;
		}
	}
	.timeWrapper .am-list-brief {

	}
`
const IsTopWrapper = styled.div`
	.am-list-item.am-list-item-middle .am-list-content{
		font-size: 12px !important;
		color: #ec576c;
		padding: 0;
		padding-bottom: 8px;
		padding-top: 2px;
	}
	.am-list-line::after {
		@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx){
			height: 0px !important;
		}
	}
`
const ModalListWrapper = styled.div`
	padding: 30px 0;
	.goods-name {
		text-align: left;
		font-size: 14px;
		overflow: hidden;
    text-overflow: ellipsis;
	}
	.am-list:first-child {
		padding-top: 0;
  }
`

class GoodsList extends Component {
	constructor(props) {
		super(props)
		this.showPopup = this.showPopup.bind(this)
		this.showModal = this.showModal.bind(this)
		this.handeTongKuan = this.handeTongKuan.bind(this)
		this.handleQuan = this.handleQuan.bind(this)
		this.handleGoodsUrl = this.handleGoodsUrl.bind(this)
		this.hanldeLike = this.hanldeLike.bind(this)
		this.handleOverReport = this.handleOverReport.bind(this)
	}
	state = {
		modal:false,
		like:false,
		isCloseModal:false,
		goodsItem:{},
		goodsData:[]
	}
	componentDidMount() {

	}
	onClose = key => () => {
    this.setState({
      [key]: false,
			isCloseModal:true
    });
  }
	showPopup(newState){
		this.setState({modal:newState,isCloseModal:false})
	}
	showModal(e,v){
		 e.stopPropagation() //阻止冒泡

		 this.setState({
			 goodsItem:v
		 })
		 this.showPopup(true)
	}
	handleGoodsUrl(data){
		this.setState({modal:false})
		const {url,deepLink,goodsId} = data
		const goodsUrl = url.indexOf('http')!==-1?url:`://${url}`

		// 上报点击商品数据
		this.props.dataReport({goodsId,dataType:DataReportType.DataReportType_ORDER})

		// 延迟等待数据上报
		setTimeout(()=>{
			// deep_link与h5链接跳转区分
			if(deepLink){
				Toast.loading('正在跳转中...',0)
				hasInstalledApp(deepLink).then(hasInstall=>{
					Toast.hide()
		 			if(!hasInstall){//未安装 直接跳H5
		 			  // window.location.href = goodsUrl
		 			  createA(goodsUrl)
		 			}
	 			})
			}else{
				createA(goodsUrl)
				// window.location.href = goodsUrl
			}
		},100)

	}
	handeTongKuan(v){
		this.setState({modal:false})
		const {url,deepLink,goodsId} = v
		const tongKuanUrl = url.indexOf('http')!==-1?url:`://${url}`

		// 上报点击同款数据
		this.props.dataReport({goodsId,dataType:DataReportType.DataReportType_ORDER_SIMILAR})

		// 延迟等待数据上报
		setTimeout(()=>{
			if(deepLink){
				Toast.loading('正在跳转中...',0)
				hasInstalledApp(deepLink).then(hasInstall=>{
					Toast.hide()
					if(!hasInstall){//未安装 直接跳H5
						createA(tongKuanUrl)
						// window.location.href = tongKuanUrl
					}
				})
			}else{
				createA(tongKuanUrl)
				// window.location.href = tongKuanUrl
			}
		},100)

	}
	handleQuan(data){
		this.setState({modal:false})
		const {couponLink,goodsId} = data
		const link = couponLink.indexOf('http')!==-1?couponLink:`://${couponLink}`

		// 上报点击优惠券数据
		this.props.dataReport({goodsId,dataType:DataReportType.DataReportType_COUPON})

		// 延迟等待数据上报
		setTimeout(()=>{
			createA(link)
			// window.location.href = link
		},100)

	}
	hanldeLike(data,obj={}){
		const {goodsId} = data
		const {goodsList,detailInfo} = this.props

		let goods = goodsList.find(v=>v.goodsId==goodsId)

		if(isOverReportOrLike({goodsId,action:'like'})){
			return Toast.success('您已喜欢过~',1);
		}else{
			// 处理详情页点赞
			if(obj && obj.page=='detail'){
				detailInfo.likeCount = (parseInt(goods.likeCount) || 0) +1
				this.setState({detailData:detailInfo})
			}

			goods.like = true
			goods.likeCount = (parseInt(goods.likeCount) || 0) +1
			this.setState({goodsData:goodsList})
		}

		storage.set('__curr_like_time__',Date.now()) // 记录当前点赞时间
		this.props.dataReport({goodsId,dataType:DataReportType.DataReportType_LIKE})
	}
	handleOverReport(data){
		const {goodsId} = data

		if(isOverReportOrLike({goodsId,action:'report'})){
			return Toast.success('您已举报过~',1);
		}

		this.props.dataReport({goodsId,dataType:DataReportType.DataReportType_REPORT})
	}

	render() {
		const {goodsList,history,detailInfo,showShareActionSheet} = this.props
		const {goodsData,goodsItem,detailData,modal,isCloseModal} = this.state
		const pathname = window.location.pathname
		const updateCacheTime = moment(Date.now()).diff(moment(storage.get('__curr_like_time__')), 'minute') //上次点赞时间和当前时间差值 >=10分钟 更新服务器cache的likeCount
		const isDetail = pathname.indexOf('detail')!==-1
		const isSearch = pathname.indexOf('search')!==-1
		const goodsCache = storage.get(GOODS_DATA,[])
		let showPopupData = detailData || detailInfo || goodsItem

		// 还原详情页点赞数
		goodsCache && goodsCache.forEach(vv=>{
			if(vv.goodsId == showPopupData.goodsId){
				showPopupData.like = true
			}
		})

		const list = goodsData.length===goodsList.length?goodsData : goodsList.length && goodsList.map(v=>{
			// 从缓存中找出标志like的商品合并到列表
			goodsCache.length && goodsCache.forEach(vv=>{
				if(v.goodsId == vv.goodsId){
					v.like = true
					// fix:加modal判断 否则点击直达链接会多触发一次这里
					if(!modal && !isCloseModal && parseInt(updateCacheTime) < 10){// 时间差小于10分钟，从本地读取，否则直接拉取服务器点赞数据
						v.likeCount = (parseInt(v.likeCount) || 0) +1 	// 前台缓存
					}
				}
			})
			return {
				...v
			}
		})

		return (
			<GoodsWrapper>
				{list && list.length > 0 &&
					list.map(v=> <List
						key={v.goodsId}
						renderHeader={() => ''}
						renderFooter={()=> <div>{!isDetail ?
							<Flex>
								<Flex.Item><IconWrapper><IoIosEye/></IconWrapper>{v.impressionCount}</Flex.Item>
								<Flex.Item
									onClick={e=>this.hanldeLike(v)}>
									<IconWrapper><IoIosHeart style={{color: v.like?'#d46070':'' }} /></IconWrapper>{v.likeCount}
								</Flex.Item>
							  <Flex.Item
									onClick={e=>this.handleOverReport(v)}>
									<IconWrapper><IoIosWarning /></IconWrapper>举报
								</Flex.Item>

							  <Flex.Item className="goods-time">{v.inStockTime}</Flex.Item>
								<Flex.Item>{v.source}</Flex.Item>
						 </Flex>:null
					}</div>} >
			 {!isDetail && v.isTop ? <IsTopWrapper><Item><MdStarHalf />置顶推荐</Item></IsTopWrapper>:
				 (!isDetail && <IsTopWrapper><Item><MdStarHalf />好物精选</Item></IsTopWrapper>:null)
			 }
			 <Item
				 arrow="horizontal"
				 thumb={v.goodsImageStruct && v.goodsImageStruct.postImage}
				 multipleLine
				 activeStyle={{background:'#fff'}}
				 onClick={() => {
					 storage.set('__DetailGoodsName__',v.goodsName)
					 storage.set('__goodsCategoryId__',v.goodsCategoryId)

					 history.push(`/detail/${v.goodsId}`)
					 isDetail && window.location.reload() // hack处理 详情页路由跳转内容不变化
				 }}
			 >
				 {v.goodsName}
				 <Brief><span className="price-color">现价 {v.price}</span></Brief>
			 {v.priceByCoupon && <Brief><span className="price-color">券后价 {v.priceByCoupon}</span></Brief>}
					 {v.sameGoodsStruct &&
						 v.sameGoodsStruct.sameGoods.map(vv=><Brief key={`${vv.source}_${Math.random()}`}> {vv.source} {vv.price}</Brief>)
					 }
					 <div className="timeWrapper" onClick={e=>!isDetail && !isSearch && this.showModal(e,v)}>
						 <Brief>有效期 {v.beginDate}~{v.endDate}</Brief>
					  {!isDetail && !isSearch && <span className="skip-link">直达链接</span>}
				 </div>
				 </Item>

			</List>)
		}

		{
			isDetail && <List
				key='footer'
				style={{paddingTop:45}}
				renderFooter={()=>
				 <Flex style={{position:'fixed',bottom:0,background:'#fff',height:50,width:'100%',zIndex:100,right: 0,left: 0,borderTop:'1px dashed #ddd'}}>
					 <Flex.Item style={{paddingLeft:10}}><IconWrapper><IoIosEye/></IconWrapper>{showPopupData.impressionCount || 0}</Flex.Item>

					 <Flex.Item
						 onClick={()=>this.hanldeLike(showPopupData,{page:'detail'})}>
						 <IconWrapper><IoIosHeart style={{color: showPopupData.like?'#d46070':'' }}/></IconWrapper>{showPopupData.likeCount}
					 </Flex.Item>

				   {/* 复制功能：需要复制的文本内容传递data-clipboard-text，定义类copyBtn用于实例化 */}
				 	 <Flex.Item
							data-clipboard-text={window.location.href}
							className="copyBtn"
							onClick={()=>showShareActionSheet()}>
							<IconWrapper><IoMdShare/></IconWrapper>分享
						</Flex.Item>
					 <Flex.Item
						 onClick={()=>this.handleOverReport(showPopupData)}>
						 <IconWrapper><IoIosWarning /></IconWrapper>举报
					 </Flex.Item>
					 <WrapperLink><Flex.Item onClick={()=>this.showPopup(true)} style={{color: '#fff'}}>直达链接</Flex.Item></WrapperLink>
				</Flex>
			} >
			</List>
		}
		<Modal
				popup
				animationType='slide-down'
				visible={this.state.modal}
				onClose={this.onClose('modal')}
				animationType="slide-up"
			>
				<ModalListWrapper>
					<List style={{marginTop:-30}}>
						{/* 商品 */}
						<List.Item onClick={()=>this.handleGoodsUrl(showPopupData)} key="goods">
							<Flex>
								<Flex.Item className="goods-name">{showPopupData.goodsName}</Flex.Item>
							 <WrapperSkipLink><Flex.Item  style={{color: '#fff'}}>直达链接</Flex.Item></WrapperSkipLink>
							</Flex>
						</List.Item>
						{/* 优惠券 */}
						{showPopupData.couponName && <List.Item onClick={()=>this.handleQuan(showPopupData)} key="quan">
							<Flex>
								<Flex.Item className="goods-name">{showPopupData.couponName}</Flex.Item>
								<WrapperSkipLink><Flex.Item  style={{color: '#fff'}}>直达链接</Flex.Item></WrapperSkipLink>
							</Flex>
						</List.Item>}
						{/* 同款 */}
						{showPopupData.sameGoodsStruct && showPopupData.sameGoodsStruct.sameGoods &&
							showPopupData.sameGoodsStruct.sameGoods.map(vvv=><List.Item onClick={()=>this.handeTongKuan(vvv)} key={`${vvv}_${Math.random()}`}>
								<Flex>
									<Flex.Item className="goods-name">{vvv.source}</Flex.Item>
									<WrapperSkipLink><Flex.Item  style={{color: '#fff'}}>直达链接</Flex.Item></WrapperSkipLink>
								</Flex>
							</List.Item>)
						}
					</List>
			  </ModalListWrapper>
			 </Modal>
			</GoodsWrapper>
		 )
	}
}

GoodsList.propTypes = {
	goodsList:PropTypes.array.isRequired,
	dataReport:PropTypes.func,
	showPopup:PropTypes.func
}

export default withRouter(GoodsList)
