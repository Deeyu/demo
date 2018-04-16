import axios from 'axios'
import {handerAppImg} from '../utils/format.js'
import API from '../api'
// 报错跨域，应该使用proxy服务器代理,在webpack中server.js中设置
// 请求轮播数据
export function getBannerData(options){
    return new Promise((resolve,reject)=>{
        axios.get(API.BANNER_URL,{
            params:options
        })
        .then(res=>{
            let entries=res.data[0].entries.map(item=>{
                return{
                    name:item.name,
                    imgpath:handerAppImg(item.image_hash,90)
                }
            })
            let newdata=[];
            while(entries.length>0){
                let item =entries.splice(0,10)
                newdata.push(item)
            }
            resolve(newdata)
            // console.log(newdata);
        })   
        // .catch(error=>{
        //   console.log(error); 
        // })                     
    })   
}

// 请求商家列表数据
export function getSellerListData(options){
    return new Promise((resolve,reject)=>{
        axios.get(API.SELL_LIST_URL,{
            // 配置请求参数，发送请求
            params:options
        })
        .then(response=>{
            // console.log('请求到的数据为：');
            // console.log(response)
            // 处理数据
            let newData=response.data.items.map(item=>{
                return{
                    name:item.restaurant.name,
                    logo:handerAppImg(item.restaurant.image_path,130),
                    //品牌
                    isPremium:item.restaurant.is_premium,
                    // 新店
                    isNew:item.restaurant.is_new,
                    // 评分
                    rate:item.restaurant.rating,
                    // 票
                    supports:item.restaurant.supports.map(support=>{
                        return{
                            color:support.icon_color,
                            name:support.icon_name
                        }
                    }),
                    // 月售
                    orderNum:item.restaurant.recent_order_num,
                    // 口碑人气好店
                    // color,image_hash,is_ad
                    reason:item.restaurant.recommend.reason,
                    reasonImg:handerAppImg(item.restaurant.recommend.image_hash,10),
                    reasonColor:item.restaurant.recommend.color,
                    // 广告
                    reasonAd:item.restaurant.recommend.is_ad,
                    // 送达时间
                    time:item.restaurant.order_lead_time,
                    // 距离
                    distance:item.restaurant.distance,
                     // 起送
                    startSend:item.restaurant.float_minimum_order_amount,
                    // 配送费
                    moneylimit:item.restaurant.piecewise_agent_fee.tips,
                    // 配送物流
                    delivery:item.restaurant.delivery_mode?item.restaurant.delivery_mode.text:'',

                    activities:item.restaurant.activities.map(act=>{
                        return {
                            des:act.description,
                            name:act.icon_name,
                            color:act.icon_color,
                        }
                    }),
                    // 活动显示
                    isShowAct:false
                }
            })
            resolve(newData)
        })
        .catch(error=>{
            console.log(error)
        })
    })
}

export function getAddressListByKeyword(options){
    return new Promise((resolve,reject)=>{
        axios.get(API.ADDRESS_LIST_URL,{
            params:options
        })
        .then(response=>{
            console.log(response);
            let newData=response.data.map(item=>{
                console.log(item);
                return {
                    name:item.name,
                    address:item.address,
                    lon:item.longitude,
                    lat:item.latitude
                }
            })
            resolve(newData)
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

