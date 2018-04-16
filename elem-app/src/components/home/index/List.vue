<template>
  <ul class="list">
		<li class="item one-border-bottom" v-for="(item,i) in listData" :key="i">
			<div class="item-logo">
				<img :src="item.logo">
			</div>
			<div class="item-content">
				<div>
					<section name="" id="">
						<h3><i v-if="item.isPremium">品牌</i>{{item.name}}</h3>
						<ul>
							<li v-for="(support,key) in item.supports" :key="key">
								
							</li>
						</ul>
					</section>
					<section>
						<div>
	 						<!-- <star :num='star'></star> 评分组件 -->
							<span>评分{{item.rate}}</span>|<span>月售{{item.orderNum}}单</span>
						</div>
						<div>
							<span>{{item.delivery}}</span>								
						</div>	
					</section>
					<section>
						<div>
							<span>{{item.startSend}}起送</span>|<span>{{item.moneylimit}}</span>	
						</div>
						<div>
							<span>{{item.distance}}</span>|<span>{{item.time}}分钟</span>	
						</div>
					</section>
					<section>
						<img :src="item.reasonImg">
						<i>{{item.reason}}</i>
						
					</section>
				</div>
				
				<div class="activity-wrapper one-border-top">
					<ul class="activity-list">
						<li class="activity-item" v-for="(act,j) in item.activities" :key="j" v-show="j<2||item.isShowAct">
							<letter :name='act.name' :color='act.color'></letter>
							{{act.des}}
						</li>
					</ul>
					<span class="handle" v-if="item.activities.length>2" @click.stop="showActivity(i)">
						{{item.activities.length}}个活动
					</span>
				</div>
			</div>
		</li>
  </ul>
</template>
<script>
import Letter from '../../../common/letter.vue'
import {getSellerListData} from '../../../services/homeService.js'
export default {
	name:'list',
	components:{
		[Letter.name]:Letter
	},
  props:{
    flag:String
  },
  data(){
    return{
	  limit:10,
	  listData:[]
    }
  },
  computed:{
	  offset(){
		  return this.listData.length
	  }
  },
  methods:{
		// 
    requestData(callback){
      // 
			let options=null
			if(this.flag=='home'){
				options={
					latitude:'22.54286',
					longitude:'114.059563',
					keyword:'',
					offset:this.offset,
					limit:8,
					extras:['activities','tags'],
					terminal:'h5',
					brand_ids:''
				}
			}
      // 请求商家列表数据
      getSellerListData(options)
      .then(result=>{
		 	console.log(result);
			this.listData = [...this.listData, ...result];
			// 如果时加载更多执行的请求数据，需要关闭加载更多
				if (callback) {
					callback()
				}
      })
		},
		// 点击显示更多活动
		showActivity(index){
			// 显示隐藏活动
			this.listData[index].isShowAct=!this.listData[index].isShowAct
			// 更新完DOM,刷新滚动试图
			this.$nextTick(()=>{
				this.$emit('refresh-page')	
			})
		}
  },
  mounted(){
    // 获取初始数据
    this.requestData()
    // 上拉加载更多
  }
}
</script>
<style scoped>
.list .item{
	display: flex;
	padding: 8px;
	box-sizing: border-box;
}
.item .item-logo{
	width: 60px;
	height: 60px;
}
.item .item-logo img{
	width: 100%;
}
.item .item-content{
	margin-left: 10px;
	flex: 1;
}
.activity-item{
	font-size: 12px;
	color: #666;
	height: 18px;
	/* line-height: 18px; */
	/* 文本单行显示 */
	text-overflow: ellipsis;
	/* white-space: nowrap; */
	overflow: hidden;
	width: 200px;
}
.activity-wrapper{
position: relative;
}
.activity-wrapper .handle{
	position: absolute;
	top:4px;
	right: 4px;
	font-size: 12px;
	color:#999; 
}
</style>



