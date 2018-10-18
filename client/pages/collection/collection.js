// pages/my/my.js
const app = getApp()
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    comments: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取收藏的影评
    this.getCollectionComments()
  },

  //获取收藏的影评或我的影评
  getCollectionComments(){
    qcloud.request({
      url: config.service.getCommentsUrl+0,
      login: true,
      success: res => {
        console.log('getCollectionComments success res in collection page',res)
        this.setData({
          comments: res.data.data
        })
      },
      fail: res => {
        console.log('getCollectionComments fail res in collection page', res)
      }
    })
  },

  //响应点击播放音频按键
  onTapRecord(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = this.data.comments[index].audio_url
    console.log('onTapRecord audio_url in my page',innerAudioContext.src)
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