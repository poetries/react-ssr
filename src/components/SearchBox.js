import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { List,Icon,SearchBar,Drawer,Popover } from 'antd-mobile';
import {Spin} from 'antd'
import styled from 'styled-components'
import { IoIosMenu } from "react-icons/io"
import { withRouter } from 'react-router-dom'
import storage from 'good-storage'
import {disOrderHotTag} from '../config/constants'
import { IoMdSync,IoIosTrash,IoMdTime,IoIosClose} from "react-icons/io";
import {saveSearch,deleteSearch,clearSearch,loadSearch} from '../util/cache'
import _ from 'lodash'

const Item = List.Item;
const Brief = Item.Brief;

const HOT_TAGS = disOrderHotTag()



const HeaderWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	background-color: #fff;
	position: fixed;
	z-index: 2;
	top: -14px;
	border-bottom: 0px solid #f5f5f9;
	background-color: white;

  > .bar-wrapper {
    width:85%
  }
  > .icon-menu {
    font-size:36px;
    margin-top:1rem;
		margin-left: 5px;
    color:#bdb9b9
  }
	.search-bar {
		background-color:#fff;
		border-radius:5px;
		margin-left:10px;
		margin-top:10px;
		height:40px
	}
`

const HotSearchWrapper = styled.div`
		.title {
			font-size: 14px;
		}
	 .hot-search.am-list {
		  margin-top: 23px;
		}
		.history .am-list-brief,.hot-search .am-list-brief{
			font-size: 12px;
		}
		.history.am-list {
 		  margin-top: 5px;
 		}
	 .refresh-text {
		 color: #c1b7b3;
		 font-size: 12px;
	 }
	 .refresh-icon {
	   font-size: 18px;
		 position: relative;
		 top: 5px;
		 color: #d9cfcb;
	 }
	 .hot-tags {
		 padding:2px;
     display:inline-flex;
     flex-direction:row;
     flex-wrap:wrap;
		 justify-content: flex-start;
	 }
	 .tag-item {
     border-radius:5px;
     padding:4px;
     border: 1px solid #dddddd;
     margin-right:2px;
		 font-size: 12px;
		 color: #b4afaf;
	 }
	 .history-icon {
		 padding-right: 3px;
	 }
	 .close-icon {
		 font-size: 25px;
		 position: relative;
		 left: 3px;
		 top: 5px;
		 color: #ddd;
	 }
`

const Nocontent = styled.div`
	margin-top: 50px;
	display: flex;
	justify-content: center;
	background: #fff;
	.am-list-content .am-list-brief {
		font-size: 12px;
		color: #ddd;
	}
`

class SearchBox extends Component {

	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleHotTagAndHistory = this.handleHotTagAndHistory.bind(this)
		this.handleHistory = this.handleHistory.bind(this)
	}
	state = {
		visible: false,
		changeFlag:false,
		historyTag:[],
		searchValue:'',
		hotTags:HOT_TAGS
	}
	componentDidMount() {
		const {location:{state}} = this.props
		const isSearchPage = this.props.path.indexOf('search')!==-1
		this.autoFocusInst.focus();

		// 从首页点击类目跳转过来 查询类目
		if(state && state.category){
			let {category_id,category_name} = state.category
			saveSearch(category_name)
			this.props.onChange({goodsCategoryId:category_id})
		}

		//加载历史记录
		isSearchPage && this.setState({historyTag:loadSearch()})
	}
	handleChange(val){

		this.setState({
			searchValue: val,
			changeFlag:true
		});


		this.handleSubmit(val)
	}
	handleSubmit(val,obj={}){
		if (!val) {
			return this.props.onBlur() // 清空搜索列表数据
		};

		saveSearch(val)
		this.setState({historyTag:loadSearch()})

		// 查询类目
		if(obj.action && obj.action == 'querryCategory'){
			return this.props.onChange({goodsCategoryId:obj.categoryId})
		}
		// 查询商品关键词
		this.props.onChange({searchKeyword:val})
	}
	handleHotTagAndHistory(v){
		this.setState({searchValue:v})
		this.handleSubmit(v)
	}
	handleHistory(obj){
		if(obj.action=='deleteItem'){
			 deleteSearch(obj.value)
		}else if(obj.action=='deleteAll'){
			clearSearch()
		}

		// 更新状态
		this.setState({historyTag:loadSearch()})
	}
	// 类目选择
	onSelect = (opt) => {
		 const isSearchPage = this.props.path.indexOf('search')!==-1
		 const {value} = opt.props
		 const categoryName = value.category_name
		 const categoryId = value.category_id
		 this.setState({
			 visible: false
		 });

		 this.setState({searchValue:categoryName})

		 // 从首页跳转过来参数处理
		 if(!isSearchPage){
			 this.props.history.push('/search',{category:value})
		 }else{
			 this.handleSubmit(categoryName,{action:'querryCategory',categoryId})
		 }

	 };
	 handleVisibleChange = (visible) => {
		 this.setState({
			 visible,
		 });
	 };

	render() {
		const {path,hasnoGoods,isLoading,history,clearSearchList,tags,location:{state}} = this.props
		const {searchValue,changeFlag,hotTags,historyTag} = this.state

		const isSearchPage = path.indexOf('search')!==-1
		const searchKeyword = searchValue || !changeFlag && state && state.category.category_name || ''

		const overlayContent = tags && tags.map(v=>{
			return (<Popover.Item key={v.category_id} value={v} icon={''}>{v.category_name}</Popover.Item>)
		})

		return (
			<div>
			 <HeaderWrapper>
					<div className="bar-wrapper">
						<div onClick={e=>!isSearchPage && history.push('/search')} style={{marginRight:10}}>
							<SearchBar
								onChange={val=>this.handleChange(val)}
								onBlur={()=>!searchKeyword && this.props.onBlur()}
								value={searchKeyword}
								onCancel={()=>{
									if(isSearchPage) {
										history.push('/')
										//window.location.reload() //hack 修复某些手机浏览器返回首页列表被截断问题
									}
								}}
								ref={ref => this.autoFocusInst = ref}
								disabled={isSearchPage?false:true}
								placeholder="搜索商品/标签"
								maxLength={8}
								className="search-bar"
							/>
						</div>
		  	  </div>

					<Popover
						mask={true}
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={overlayContent}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [0, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <IoIosMenu className="icon-menu" />
          </Popover>
					</HeaderWrapper>
					{isSearchPage && !searchKeyword && <HotSearchWrapper>
						<List className="hot-search">
							<Item extra={<span className="refresh-text" onClick={()=>{
									this.setState({hotTags:disOrderHotTag()})
								}}>换一批 <IoMdSync className="refresh-icon"/></span>}><Brief className="title">热门搜索</Brief></Item>
						  <Item wrap>
								{hotTags.map(v=><div className="hot-tags" key={v} onClick={()=>this.handleHotTagAndHistory(v)}><span className="tag-item">{v}</span></div>)}
							</Item>
						</List>
						{historyTag && historyTag.length>0 && <List className="history">
							<Item extra={<IoIosTrash className="refresh-icon" onClick={()=>this.handleHistory({action:'deleteAll'})} />}><Brief className="title">历史搜索</Brief></Item>
						{historyTag.map(v=><Item wrap extra={<IoIosClose className="close-icon" onClick={()=>this.handleHistory({action:'deleteItem',value:v})}/>} key={v}><div onClick={()=>this.handleHotTagAndHistory(v)}><Brief><IoMdTime className="history-icon"/>{v}</Brief></div></Item>)}
					</List>}
					</HotSearchWrapper>}

					{searchKeyword && hasnoGoods && !isLoading && <Nocontent>
						<List>
							<Item>
								<img src="https://cdn.yesdat.com/BAAAAAAAAMlBbzYi1Aqn8IlgW.png" />
							  <Brief>没有找到该商品~</Brief></Item>
						</List>
				 </Nocontent>}
			 </div>
		 )
	}
}

SearchBox.propTypes = {
	path:PropTypes.string.isRequired,
	isLoading:PropTypes.bool,
	hasnoGoods:PropTypes.bool,
	clearSearchList:PropTypes.func,
	tags:PropTypes.array
}

export default withRouter(SearchBox)
