import moment from 'moment'

export const PAGE_SIZE  = 20 //每次加载20条数据

export const GOODS_DATA = '__goods_data__'

// 需要上报的数据
export const DataReportType = {
    DataReportType_VIEW : 1,  // 查看
    DataReportType_LIKE : 2,  // 点赞
    DataReportType_REPORT : 3, // 举报
    DataReportType_COUPON : 4, // 优惠券
    DataReportType_ORDER : 5, // 下单
    DataReportType_ORDER_SIMILAR : 6  //购买同类
}

// 类目约定写死
export const CATEGORY_TAGS = [
  {
    category_name:'男鞋',
    category_id:1
  },{
    category_name:'女鞋',
    category_id:2
  },{
    category_name:'手机',
    category_id:3
  },{
    category_name:'电脑',
    category_id:4
  },{
    category_name:'箱包',
    category_id:5
  },{
    category_name:'女装',
    category_id:6
  },{
    category_name:'男装',
    category_id:7
  },{
    category_name:'护肤',
    category_id:8
  },{
    category_name:'化妆品',
    category_id:9
  },{
    category_name:'食品',
    category_id:10
  },{
    category_name:'家电',
    category_id:11
  },{
    category_name:'生活用品',
    category_id:12
  }
]

export const GoodsSourceMap = {
    1: '天猫',
    2: '京东',
    3: '亚马逊',
    4: '淘宝',
    5: '苏宁',
    6: '国美'
}

// 热门标签
const HOT_SEARCH_TAGS = [
  '钟表珠宝','美妆护肤','内衣配饰','iPhone','抽纸','时尚连衣裙','衬衫','新款男鞋','风衣','夹克外套',
  '牛仔裤', '夹克', '时尚休闲裤', '沙发', '保温杯', '定制窗帘',
  '床垫', '男装', '女装', '女鞋', '母婴孕童', '个护清洁'
]

// 随机打乱 取10个
export const disOrderHotTag = ()=>{
  const tags = HOT_SEARCH_TAGS.sort(function(){
    return Math.random()>.5 ? -1 : 1;
  });
  return tags.slice(0,10)
}


export const DATA = {
	DATE_TODAY: moment().format('YYYY-MM-DD'),
	DATE_YESTERDAY: moment().subtract(1, 'days').format('YYYY-MM-DD'),
	DATE_1_WEEK_BEFORE: moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
	DATE_2_WEEKS_BEFORE: moment().subtract(2, 'weeks').format('YYYY-MM-DD'),
	DATE_3_WEEKS_BEFORE: moment().subtract(3, 'weeks').format('YYYY-MM-DD'),
	DATE_1_MONTH_BEFORE: moment().subtract(1, 'months').format('YYYY-MM-DD'),
	DATE_2_MONTH_BEFORE: moment().subtract(2, 'months').format('YYYY-MM-DD'),
	DATE_3_MONTHS_BEFORE: moment().subtract(3, 'months').format('YYYY-MM-DD'),
	DATE_1_YEAR_BEFORE: moment().subtract(1, 'years').format('YYYY-MM-DD'),

	DATE_3_MONTHS_AFTER: moment().add(3, 'months').format('YYYY-MM-DD'),
	DATE_1_YEAR_AFTER: moment().add(1, 'year').format('YYYY-MM-DD'),

	DATE_FIRST_DAY_OF_MONTH: moment().startOf('month').format('YYYY-MM-DD'),
	DATE_LAST_DAY_OF_MONTH: moment().endOf('month').format('YYYY-MM-DD'),

	DATE_7_DAYS_BEFORE: moment().subtract(7, 'days').format('YYYY-MM-DD'),
	DATE_30_DAYS_BEFORE: moment().subtract(30, 'days').format('YYYY-MM-DD'),
	DATE_90_DAYS_BEFORE: moment().subtract(90, 'days').format('YYYY-MM-DD'),
	DATE_100_DAYS_BEFORE: moment().subtract(100, 'days').format('YYYY-MM-DD'),
}
