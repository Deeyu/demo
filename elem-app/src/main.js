import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stroe'

import Page from './common/Page.vue'

Vue.component(Page.name,Page)
new Vue({
  el: '#app',
  router,
  store,
  // render:h=>h(App)
  // 等价
  components: { App },
  template: '<App/>'
})
// Vue ajax请求插件
// import axios from 'axios'
// // 报错跨域，应该使用proxy服务器代理,在webpack中server.js中设置
// axios.get('/restapi/shopping/openapi/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template')
// .then(res=>{
//   console.log(res);
// })
// .catch(error=>{
//   console.log(error);
// })
