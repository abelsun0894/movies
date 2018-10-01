//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

var movieInfo
var comments
var userInfo
var recordInfo

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
  //“写影评”
  addComment() {
    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success: res => {
        console.log(res)
        wx.navigateTo({
          url: '../edit/edit?commentType=' + res.tapIndex,
        })
      }
    })
  },

  //录音
  record(){
    let recordManager = wx.getRecorderManager()
    recordManager.onStop(res => {
      console.log(res)
    })
    recordManager.start()
  }
})
