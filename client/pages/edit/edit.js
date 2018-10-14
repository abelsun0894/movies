// pages/edit/edit.js
var app = getApp()
const recorderManager = wx.getRecorderManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: null,
    commentType: null,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('edit onLoad',options)
    this.setData({
      movieInfo: app.movieInfo,
      commentType: + options.commentType
    })
  },

  //响应点击“完成”
  onTapBtn(event) {
    let comment = event.detail.value.textarea
    //console.log(comment)
    if (comment) {
      app.comment = comment
      wx.navigateTo({
        url: '../preview/preview?commentType=0',
      })
    }
  },

  //开始触摸录音键
  onTouchStart(){
    recorderManager.onStop(res => {
      console.log('recorderManager tempFilePath',res)
      app.recordInfo = res
      wx.navigateTo({
        url: '../preview/preview?commentType=1',
      })
    })
    recorderManager.start()
  },

  //结束触摸录音健
  onTouchEnd(){
    recorderManager.stop()
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
        console.log('checkSession success',this.data.userInfo)
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