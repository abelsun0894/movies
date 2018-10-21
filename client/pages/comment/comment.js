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
    userInfo: null,
    isCollected: false
  },

  //响应点击“写影评”
  onTapAddComment() {
    app.addComment()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('comment page onLoad options',options,app.comments)
    this.setData({
      movieInfo: app.movieInfo,
      comment: app.comments[+options.index]
    })
    //查询是否已经收藏
    qcloud.request({
      url: config.service.isCollectedUrl + this.data.comment.id,
      login: true,
      success: res => {
        console.log('get isCollected success', res)
        let isCollected = res.data.data[0]['count(*)'] == 0 ? false : true
        this.setData({
          isCollected
        })
      }
    })
  },

  //响应点击收藏影评
  onTapCollect(){
    if(this.data.isCollected){
      //取消收藏
      qcloud.request({
        url: config.service.isCollectedUrl + this.data.comment.id,
        login: true,
        method: 'POST',
        success: res => {
          console.log('取消收藏 success in comment page',res)
        },
        fail: res => {
          console.log('取消收藏 fail in comment page',res)
        }
      })
    } else {
      //收藏影评写入数据库
      qcloud.request({
        url: config.service.collectionUrl,
        login: true,
        method: 'POST',
        data: {
          commentId: this.data.comment.id
        },
        success: res => {
          console.log('onTapCollect success res in comment page', res)
          wx.showToast({
            title: '收藏成功！',
          })
          this.setData({
            isCollected: true
          })
        },
        fail: res => {
          console.log('onTapCollect fail res in comment page', res)
        }
      })
    }
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