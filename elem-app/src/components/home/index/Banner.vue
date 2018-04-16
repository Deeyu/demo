<template>
	<div class="swiper-container banner" ref="banner">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(slideData,i) in bannerData" :key="i">
				<div class="banner-item" v-for="(item,j) in slideData" :key="j">
					<img :src="item.imgpath">
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
		
		<!-- 如果需要导航按钮 -->
		<!-- <div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div> -->
		
		<!-- 如果需要滚动条 -->
		<!-- <div class="swiper-scrollbar"></div> -->
	</div>
</template>
<script>
import {getBannerData} from '../../../services/homeService.js'
import {mapState} from 'vuex'
	export default {
		name:'banner',
		data(){
			return {
				bannerData:[]
			}
		},
		computed:{
			...mapState({
				lon:state=>state.address.longitude,
				lat:state=>state.address.latitude				
			})
		},
		methods:{
			// 请求数据方法
			requestData(){
				// 请求轮播数据
				getBannerData({
					// 使用定位的位置信息
					latitude:this.lat,
					longitude:this.lon,
					templates:['main_template','favourable_templat','svip_template']
				})
				.then(result=>{
					this.bannerData=result
					// bannerData数据变化，导致dom更新，
					// updated完毕后，出发￥nextTicl中的回调					
					this.$nextTick(()=>{					 
						this.bannerSwiper.update();
					})					
				})
			}
		},
		// 挂载完成
		mounted(){
			// 请求轮播数据
			// this.requestData()
			// 创建轮播
			// 扩展成普通属性
			//创建轮播
			this.bannerSwiper = new Swiper(this.$refs.banner, {
				pagination: '.swiper-pagination'
			});
			// 判断是否有经纬度,如果有就请求，没有等待定位完成在请求数据
			if(this.lon&&this.lat){
				this.requestData()
			}
			// 一直监听经纬度变化，如果有变化，重新请求数据
			this.$watch('lon',()=>{
				this.requestData()
			})
		}
		/*,
		beforeUpdate(){
			console.log(3);
		},
		// 数据变化导致updated去更新dom结构,updata不是更新数据
		updated(){
			// 每次更新数据都会走updated
			console.log(4);	
		}*/
	}
</script>
<style scoped>
.banner{
	padding-bottom:14px ;
}
.banner .swiper-slide{
	overflow: hidden;
}
.banner .banner-item{
	width: 20%;
	float: left;
	margin-top: 5px
}
.banner .banner-item img{
	width: 40px;	
	margin: 0 auto;
}
.banner .banner-item p{
	font-size: 12px;
	text-align: center;
	color: #666;
}
.banner .swiper-pagination-bullets{
	bottom: 0;
}
.banner .swiper-pagination-bullet{
	display:block;
	width: 4px;
	height: 4px;
}
.banner .swiper-pagination-bullet-active{
	background: #000000;
	filter: 0.6;
}

</style>
