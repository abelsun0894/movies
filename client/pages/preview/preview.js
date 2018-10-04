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
    recordDuration: null,
    recordCOSUrl: null
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

  //响应点击“发布影评”
  onTapSubmit(){
    //上传文字评论或者音频
    //如是音频，上传音频，获取地址
    if (this.data.commentType === 1) {
      let path = this.data.recordInfo.tempFilePath
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: path,
        header: {
          'content-type': 'multipart/form-data'
        },
        name: 'file',
        success: res => {
          console.log('upLoad record success res', res)
          let data = JSON.parse(res.data).data
          console.log('upLoad res data',data)
          this.setData({
            recordCOSUrl: data.imgUrl
          })
          //上传数据库
          this.updateDatabase()
        },
        fail: res => {
          console.log('upLoad record fail res',res)
        }
      })
    }else if(this.data.commentType === 0){
      //如是文字评论，上传文字
      this.updateDatabase()
    }
  },

  //上传数据库
  updateDatabase(){
    qcloud.request({
      url: config.service.commentUrl,
      method: 'POST',
      data: {
        userInfo: this.data.userInfo,
        commentType: this.data.commentType,
        comment: this.data.comment,
        recordCOSUrl: this.data.recordCOSUrl,
        movieId: this.data.movieInfo.id
      },
      success: res => {
        console.log('update database success',res)
        wx.redirectTo({
          url: '../list/list',
        })
      },
      fail: res => {
        console.log('update database fail', res)
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