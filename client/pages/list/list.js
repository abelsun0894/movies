// pages/list/list.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null,
    movieInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getComments(comments => {
      app.comments = comments
      this.setData({
        movieInfo: app.movieInfo,
        comments: comments
      })
    })
  },

  //响应点击播放音频按键
  onTapRecord(options) {
    //console.log('onTapRecord options in list page',options)
    let audio_url = options.currentTarget.dataset.url
    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = audio_url
    innerAudioContext.play()
  },

  onTapCommentItem(options){
    console.log('onTapCommentItem ..index in list page',options.currentTarget.dataset.index)
    let index = options.currentTarget.dataset.index
    wx.navigateTo({
      url: '../comment/comment?index='+index,
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