// pages/hot/hot.js

const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取所有影片信息
    this.getMoviesInfo()
  },

  //获取所有影片信息
  getMoviesInfo(){
    qcloud.request({
      url: config.service.moviesInfoUrl,
      success: res => {
        let data = res.data.data
        console.log('hot.js getMoviesInfo success data',data)
        this.setData({
          moviesInfo: data
        })
      }
    })
  },

  onTapMovie(option){
    console.log(option)
    let id = option.currentTarget.id
    let tempMoviesInfo = this.data.moviesInfo
    tempMoviesInfo.forEach((element) => {
      if(element.id == id){
        app.movieInfo = element
      }
    })
    console.log(app.movieInfo)
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