import Vue from 'vue'
import Vuex from 'vuex'
 Vue.use(Vuex)

 import addressModule  from './address'
 export default new Vuex.Store({
    //  state,
    //  mutations,
    //  actions,
     modules:{
        //  声明address模块
         address:addressModule
     }

 })