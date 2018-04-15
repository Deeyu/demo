// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   bannerData:[],
   tabs:['个性推荐','歌单','电台主播','排行耪'],
    newsData:[],
    newurl:'https://www.toutiao.com/',
    flag: 0
  },
  
  requestData(){
    var that=this
    wx.request({
      url: 'http://localhost:3000/v1/banner',
      // header: {},
      // method: 'GET',
      // dataType: 'json',
      // responseType: 'text',
      success: function(res) {
        console.log(res.data.banners)
        that.setData({
          bannerData:res.data.banners
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: 'https://easy-mock.com/mock/5acd86b663b2d05900908abd/api/news',
      success: function(res) {
       
        res.data.data.map((item)=>{
          item.group_id = that.data.newurl + item.group_id
        })
        console.log(res.data.data)
        that.setData({
          newsData: [...that.data.newsData, ...res.data.data]
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  handleClick(e){
    this.setData({
      flag: e.currentTarget.dataset.id
    })
  },
  loadMore(){
    console.log('加载更多')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData()
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