/*
首页轮播接口
/restapi/shopping/openapi/entries
?latitude=22.54286&
longitude=114.059563&
templates[]=main_template&
templates[]=favourable_template&
templates[]=svip_template
latitude:经度
longitude:纬度
/restapi/shopping/openapi/entries
*/
// 接口文件


const BANNER_URL='/restapi/shopping/openapi/entries'
// 请求商家列表接口
/*https://h5.ele.me/restapi/shopping/v3/restaurants
latitude=22.54286
longitude=114.059563
offset=8
limit=8
extras[]=activities
extras[]=tags
extra_filters=home
rank_id=ed7363f32bf44af7a6bffe486ddc678d
terminal=h5
brand_ids[]
restaurant_category_ids[]
*/
const SELL_LIST_URL='/restapi/shopping/v3/restaurants'
// 根据关键字查询地址
/*参数
    keyword=
    offset=
    limit
    latitude
    longitude
*/ 
const ADDRESS_LIST_URL='/restapi/bgs/poi/search_poi_nearby'
export default{
    BANNER_URL,
    SELL_LIST_URL
}

/*
https://h5.ele.me/restapi/shopping/v3/restaurants
?latitude=22.54286
&longitude=114.059563
&keyword=&offset=0
&limit=8
&extras[]=activities
&extras[]=tags
&terminal=h5
&brand_ids[]=
*/