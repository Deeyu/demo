<template>
<div class="search-bar" :class="{position:top}">
    <span>搜索商家、搜索商品</span>
</div>
</template>
<script>
export default {
  name:'searchBar',
  props:{
      top:Boolean
  },
  data(){
      return{}
  }
}
</script>
<style scoped>
.search-bar{
    box-sizing: border-box;
    padding: 6px 12px;
    width: 100%;
    background:linear-gradient(90deg,#0af,#0085ff);
}
.search-bar.position{
    position: absolute;
    top:0;
    left: 0;

}
.search-bar span{
    display:block;
    width: 100%;
    background: #ffffff;
    color: #999;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
}

</style>

