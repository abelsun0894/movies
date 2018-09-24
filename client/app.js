//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

var movieInfo

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})