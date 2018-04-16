<template>
<div>
    <page :canLoaderMore='true' @loadMore='handerLoadMore' ref="page" @onScoll='pageScrollAction'>
        <home-header></home-header>
        <searchBar></searchBar>
        <div class="activity activity66">
            <img src="https://fuss10.elemecdn.com/0/cf/e16c1687a4ea84674d5b531623934png.png?imageMogr/format/webp/thumbnail/!750x210r/gravity/Center/crop/750x210/" />
        </div>
        <banner></banner>
        <div class="activity-box">
            <div class="activity">
                <img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/" />
            </div>
            <div id="activity-lego">
                <div class="activity-lego-box">
                    <div class="box">
                        <h3>限量抢购</h3>
                        <div>超值美味 9.9元起</div>
                        <div>
                            <span>3317人</span>正在抢 &gt;
                        </div>
                        <img src="//fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
                    </div>
                    <div class="box">
                        <h3>品质套餐</h3>
                        <div>搭配齐全吃得好</div>
                        <div>立即抢购 &gt;</div>
                        <img src="//fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
                    </div>
                </div>
                <div></div>
            </div>
        </div>
        <p class="seller-title">推荐商家</p>
        <!-- 列表 -->
        <list ref="list"  flag='home' @refresh-page='handeleRefresh'></list>

    </page>
    <search-bar v-show="showSearchBar" :top='showSearchBar'></search-bar>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
import Header from "../../components/home/index/Header.vue";
import SearchBar from "../../components/home/index/SearchBar.vue";
import Banner from "../../components/home/index/Banner.vue";
import List from "../../components/home/index/List.vue";
export default {
  name: "home",
  components: {
    [Header.name]: Header,
    [SearchBar.name]: SearchBar,
    [Banner.name]: Banner,
    [List.name]: List
  },
  data(){
      return {
          showSearchBar:false
        }
  },
//   请求商家列表数据
methods:{
    handerLoadMore(){
        // 调用list组件请求下一页数据
        this.$refs.list.requestData(()=>{

            // console.log('请求完成');
            // 关闭加载更多的动画
            this.$refs.page.loaderMoreStatus=0
        })
    },
    handeleRefresh(){
        // 列表组件的活动撑开了滚动容器，需要更新滚动容器
        this.$refs.page.refreshPage()
    },
    // 页面滚动事件
    pageScrollAction(y){
        console.log(y);
        if (y<-38) {
            this.showSearchBar=true
        }else{
            this.showSearchBar=false
        }
    }
}
};
</script>
<style scoped>
.activity img {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.activity66 img{
    padding: 0;
}
.activity-box{
    width: 100%;
}
.activity-lego-box{
    box-sizing: border-box;    
    display:flex;  
    padding: 0 10px;
}
.activity-lego-box .box{
    flex:1;
    position: relative;
    background: #f8f8f8;  
    margin-left: 5px;  
}
.box img{
    width: 120px;
    position: relative;
    left:50px;
}
.seller-title{
    font-size: 14px;
    text-align: center;
    line-height: 30px;
}
.seller-title:before,.seller-title:after{
    display: inline-block;
    content: '';
    height: 2px;
    width: 20px;
    background: #999;
    transform: translate(-10px,-5px)
}
.seller-title:after{
    transform: translate(10px,-5px)    
}
.slideInRight{
    animation-duration: 200ms
}
.slideOutRight{
    animation-duration: 200ms
}
</style>
