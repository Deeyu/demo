// 地址数据管理组件
const state={
    longitude:'',
    latitude:''
}
const mutations={
    modifyLon(state,params){
        state.longitude=params.value   
    },
    modifyLat(state,params){
        state.latitude=params.value   
    }
}
const actions={
    // 定位方法
    getLocation(context){
        // html5定位方法
        /*navigator.geolocation.getCurrentPosition(
            (position)=>{//成功的回调
                // 定位成功，获得用户信息
                let lon=position.coords.longitude
                let lat=position.coords.latitude
                // 赋值给全局状态
                context.commit('modifyLon',{value:lon})
                context.commit('modifyLat',{value:lat})                
            },
            ()=>{
                // 定位失败的回调，可以设置默认值
            }
        )*/
        setTimeout(function(){
            // 模拟定位效果
            // latitude=22.54286&longitude=114.059563
            // latitude=22.537359&longitude=113.993433
            // lon:114.059563  lat:22.54286
            context.commit('modifyLon',{value:114.059563})
            context.commit('modifyLat',{value:22.54286}) 
        },1000)
    },
    // x修改地址的方法，用户在地址输入栏中输入地址，修改全局状态
    selectLocation(context,params){
        // params用户选择的地址参数
        context.commit('modifyLon',{value:params.lon})
        context.commit('modifyLat',{value:params.lat})        

    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions
}