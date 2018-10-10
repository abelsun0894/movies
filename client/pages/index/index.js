// pages/index/index.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: null,
    comments: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //连接数据库获取随机电影信息和影评信息
    this.getRandomMovieInfo()
    //模拟用户数据
    app.userInfo = { "nickname": "瓦伦西", "logoUrl": "https://qcloudtest-1256761953.cos.ap-guangzhou.myqcloud.com/movies/th.jpeg", "openId": "dfidfianwebebf" }
    //console.log(app.userInfo)
  },

  //获取随机电影信息和影评信息
  getRandomMovieInfo(){
    qcloud.request({
      url: config.service.indexFilmUrl,
      success: res => {
        console.log('getRandomMovieInfo success res',res)
        this.setData({
          movieInfo: res.data.data[0]
        })
        //当前电影信息设置为app.movieInfo
        app.movieInfo = res.data.data[0]
        console.log('index page movie info',this.data.movieInfo)
        //获取评论设置app.comments&this.data.comment
        app.comments = res.data.data[1]
        this.setData({
          comments: res.data.data[1],
        })
      },
      fail: res => {
        console.log('getRandomMovieInfo fail res',res)
      }
    })
  },

  //响应点击电影图片
  onTapImage(){
    wx.navigateTo({
      url: '../detail/detail',
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