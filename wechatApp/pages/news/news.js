// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    msg:'这是新闻页面',
    products:[],
    num:0,
    color:'',
    windowHeight:'300',
    flag:true,
    page:1
  },
  
  getmsg(){
    this.setData({
      msg:'修改了msg',
      num:++this.data.num
    })
  },
  handleEvent(e){
    console.log(e.currentTarget.dataset.aid)
  },
  handleAid(e){
    console.log(e.currentTarget.dataset.aid)
    // 跳转到页面详情
    wx.navigateTo({
      url: '../newdetail/newdetail?aid=' + e.currentTarget.dataset.aid,
    })
  },
  requestData(){
    if(this.data.flag){
      wx.showLoading({
        title: '玩命加载中...',
      })
      this.setData({
        flag:false
      })
      wx.request({
        url: 'http://www.phonegap100.com/appapi.php', //仅为示例，并非真实的接口地址
        data: {
          // 参数
          a: 'getPortalList',
          catid: '20',
          page:this.data.page
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:  (res)=> {
          wx.hideLoading();
          // console.log(res.data.result)
          if(res.data.result.length<20){
            
            this.setData({
              products: [...this.data.products, ...res.data.result],
              flag: false
            })
          }else{
            this.setData({
              products: [...this.data.products, ...res.data.result],
              page: ++this.data.page,
              flag:true
            })
          }
        }
      })
    }
  },
  loadMore() {
    console.log('下拉加载更多')
    this.requestData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData()
    
    let that=this
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})