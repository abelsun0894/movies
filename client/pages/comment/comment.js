// pages/comment/comment.js
const app = getApp()
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: null,
    comment: null,
    userInfo: null
  },

  //响应点击“写影评”
  onTapAddComment() {
    app.addComment()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('comment page onLoad options',options)
    this.setData({
      movieInfo: app.movieInfo,
      comment: app.comments[+options.index]
    })
  },

  //响应点击收藏影评
  onTapCollect(){
    qcloud.request({
      url: config.service.collectionUrl,
      login: true,
      method: 'POST',
      data: {
        commentId: this.data.comment.id
      },
      success: res => {
        console.log('onTapCollect success res in comment page',res)
        wx.showToast({
          title: '收藏成功！',
        })
      },
      fail: res => {
        console.log('onTapCollect fail res in comment page',res)
      }
    })
  },

  //响应点击播放音频按键
  onTapRecord() {
    //console.log('onTapRecord options in list page',options)
    let audio_url = this.data.comment.audio_url
    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = audio_url
    innerAudioContext.play()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        console.log('checkSession success', this.data.userInfo)
      },
      error: () => {
        wx.navigateTo({
          url: '../login/login',
        })
        console.log('checkSession fail')
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})