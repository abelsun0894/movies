// pages/preview/preview.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: null,
    comment: null,
    userInfo: null,
    commentType: null,
    recordInfo:null,
    recordDuration: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.recordInfo)
    this.setData({
      movieInfo: app.movieInfo,
      comment: app.comment || null,
      userInfo: app.userInfo,
      commentType: + options.commentType,
      recordInfo: app.recordInfo || null,
      recordDuration: Math.trunc(app.recordInfo.duration / 1000)
    })
  },

  onTapSubmit(){
    qcloud.request({
      url: config.service.commentUrl,
      method: 'POST',
      data: {
        userInfo: this.data.userInfo,
        commentType: 0,
        comment: this.data.comment,
        movieId: this.data.movieInfo.id
      },
      success: res =>{
        //console.log(res)
        wx.redirectTo({
          url: '../list/list',
        })
      },
      fail: res => {
        console.log('fail',res)
      }
    })
  },

  //响应点击播放音频按键
  onTapRecord(){
    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.data.recordInfo.tempFilePath
    innerAudioContext.play()
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