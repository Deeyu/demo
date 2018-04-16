<template>
<!-- 公共组件 -->
<div>
    <div class="page" :class="{subpage:isSubpage}">
        <header class="header" v-if="headerData.isShow">
            <span class="header-btn header-btn-left" @click="backAction()">返回</span>
            <h1 class="title">{{headerData.title}}</h1>
        </header>
        <!-- 滚动容器 -->
        <div ref="content" class="content" :class="{'has-header':headerConfig}">
            <div class="wrapper">
                <!--页面内容-->
                <slot></slot>
                <div class="loader-more" :class="{down:loaderMoreStatus==1}" v-if="canLoaderMore" >
                    <img :src="loaderMoreImg">
                    <span>{{loaderMoreText}}</span>
                </div>
            </div>
        </div>
    </div>
    <!-- 搜索框 -->
    <router-view ></router-view>
</div>
</template>
<script>
export default {
    name:'page',
    props:{
        headerConfig:Object,
            //是否是子页面，为true表示是子页面，bottom设置为0
        isSubpage:Boolean,
        // 上拉刷新
        canLoaderMore:Boolean
    },
    data(){
        let headerData={}
        if (headerData) {
            headerData=Object.assign({},this.headerConfig)
        }
        return {
            headerData,
            // loaderMoreImg:'static/img/arrow.png',
            loaderMoreStatus:0
        }
    },
    computed:{
        loaderMoreText(){
            switch(this.loaderMoreStatus){
                case 0 :{
                    return '上拉加载更多...';
                }
                case 1 :{
                    return '释放加载更多...';
                }
                case 2 :{
                    return '立即加载...';
                }
            }
        },
        loaderMoreImg(){
                return this.loaderMoreStatus==2?'static/img/ajax-loader.gif':'static/img/arrow.png'    
        }
    },
    methods:{
        // 刷新滚动容器
        refreshPage(){
            // console.log('页面更新了');
            this.pageScroll.refresh()
                if (this.pageScroll.y<=this.pageScroll.maxScrollY+40) {
                    
                    this.pageScroll.scrollTo(0,this.pageScroll.maxScrollY+40)
                }
        },
        backAction(){
            this.$router.back()
        }
    },
    mounted(){
        //创建滚动试图
        this.pageScroll=new IScroll(this.$refs.content,{
            // 
            probeType:3
        })
        // 监听滚动事件
        this.pageScroll.on('scrollStart',()=>{
            this.pageScroll.refresh()            
        })
        // 监听滚动事件
        if (this.canLoaderMore) {
            // 添加处理加载更多的代码
            this.pageScroll.on('scroll',()=>{
                if (this.loaderMoreStatus!=2) {//不是加载更多时才能监听操作
                    var maxY=this.pageScroll.maxScrollY
                    var y=this.pageScroll.y
                    if (maxY>=y) {
                        // 超出滚动范围
                        // console.log('超出了')
                        this.loaderMoreStatus=1
                    }else{
                        this.loaderMoreStatus=0
                    }
                }
                this.$emit('onScroll',this.pageScroll.y)
            })
            this.pageScroll.on('scrollEnd',()=>{
                if (this.loaderMoreStatus!=2) {
                    var maxY=this.pageScroll.maxScrollY
                    var y=this.pageScroll.y
                    if(maxY>=y){
                        // 超出滚动范围，显示加载更多
                        this.loaderMoreStatus=2
                        // 通知对应使用page组件的页面加载更多
                        this.$emit('loadMore')
                    }
                    else if(maxY<y&&y<maxY+40){
                        // 收回加载更多的DIV
                        this.pageScroll.scrollTo(0,maxY+40,200)
                    }
                } 
            })
        }
      
    }

}
</script>
<style scoped>
.page{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50px;
    background:#fff
}
.page .subpage{
    z-index: 5;
    bottom: 0;
}
.page .header{
    position: absolute;
    width: 100%;
    height: 44px;
    left:0 ;
    top: 0;
    background:linear-gradient(90deg,#0af,#0085ff);
}
.page .header .title{
    width: 100%;
    height: 100%;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    color: #fff;
}
.page .header .header-btn{
    position: absolute;
    padding: 10px;
    font-size: 12px;
}
.page .content{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
}
.page .content.has-header{
    top: 44px;
}
.loader-more{
    line-height: 40px;
    height: 40px;
    text-align: center;
    background: red;
}
.loader-more img{
    display: inline-block;
    width: 20px;
    transition: 200ms;
}
.loader-more span{
    font-size: 12px;
    color: #010000;
}
.loader-more.down img{
    transform: rotate(180deg)
}
</style>


