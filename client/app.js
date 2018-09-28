//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

var movieInfo
var comments

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
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../edit/edit',
          })
        }
      }
    })
  }
})
