//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

var movieInfo
var comments
let userInfo
var recordInfo


const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  data: {
    locationAuthType: UNPROMPTED
  },

  login({ success, error }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {

          this.data.locationAuthType = UNAUTHORIZED
          // 已拒绝授权
          wx.showModal({
            title: '提示',
            content: '请授权我们获取您的用户信息',
            showCancel: false
          })
          error && error()
        } else {
          this.data.locationAuthType = AUTHORIZED
          this.doQcloudLogin({ success, error })
        }
      }
    })
  },

  doQcloudLogin({ success, error }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
        if (result) {
          userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({ success, error })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  getUserInfo({ success, error }) {
    if (userInfo) return userInfo

    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data

        if (!data.code) {
          userInfo = data.data
          success && success({
            userInfo
          })
        } else {
          error && error()
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  checkSession({ success, error }) {
    if (userInfo) {
      return success && success({
        userInfo
      })
    }

    wx.checkSession({
      success: () => {
        this.getUserInfo({
          success: res => {
            userInfo = res.userInfo

            success && success({
              userInfo
            })
          },
          fail: () => {
            error && error()
          }
        })
      },
      fail: () => {
        error && error()
      }
    })
  },


  //“写影评”
  addComment() {
    console.log('app.js addComment()', this.movieInfo)
    //判断是否登录
    this.checkSession({
      success:() => {
        //获取所有影评
        this.getComments((comments) => {
          //判断是否已有评论
          var commentIndex = -1
          comments.forEach((element, index) => {
            if (element.open_id == userInfo.openId) {
              commentIndex = index
            }
          })
          if (commentIndex >= 0) {
            //已评论
            wx.navigateTo({
              url: '../comment/comment?index=' + commentIndex,
            })
            wx.showToast({
              title: '您已评论',
              icon: 'none'
            })
          } else {
            //没有评论，选择评论形式
            wx.showActionSheet({
              itemList: ["文字", "音频"],
              success: res => {
                console.log(res)
                wx.navigateTo({
                  url: '../edit/edit?commentType=' + res.tapIndex,
                })
              }
            })
          }
        })
      }
    })
  },

  //获取某个电影所有影评
  getComments(success) {
    let movieId = this.movieInfo.id
    qcloud.request({
      url: config.service.listUrl,
      data: {
        movieId: movieId
      },
      success: res => {
        console.log('getCommentList success', res)
        this.comments = res.data.data
        success && success(comments)
      },
      fail: res => {
        console.log('getCommentList fail', res)
      }
    })
  },

  //录音
  record() {
    let recordManager = wx.getRecorderManager()
    recordManager.onStop(res => {
      console.log(res)
    })
    recordManager.start()
  }
})