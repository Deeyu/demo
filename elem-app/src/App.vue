<template>
  <div id="app">
    <!-- 路由组件 -->
    <keep-alive>
      <router-view></router-view>    
    </keep-alive>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from './Tabs.vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components:{
      [Tabs.name]:Tabs
  },
  methods:{
    // 将全局方法转为组件内部方法（mapAcitons）
    // ...mapActions(['getLocation'])  方法1
    ...mapActions({
      'getLocation':'address/getLocation'
    })
  },
  created(){
    // 进入app后先定位
    // this.getLocation()     方法1
    this.$store.dispatch('address/getLocation')

  }
}
</script>

<style>

</style>
