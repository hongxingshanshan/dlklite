//app.js
//方法名自定义 比如import makeMd5 from 'utils/md5.js';
import md5 from 'utils/md5.js';
// 请求数据 封装js
var http = require('/utils/service/http.js')
App({
  // md5 操作
  globalData: {
    appSecret: 'com.ckeyedu.duolapinke2018',
    //other data
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  func: {
    req: http.req,
    reqs: http.reqs
  },
  /** 
    *  数组对象按key升序, 并生成 md5_hex 签名
    * @param {Array/Object} obj   数组对象
    * @return {String}  encrypted md5加密后的字符串
    */
  makeSign: function (uid, timestamp) {
     // 获取时间戳
    var key1 = uid.trim() + timestamp;
    var data = md5(key1).toLowerCase();
     // 加密盐
     var secret = this.globalData.appSecret;    
    return md5(secret + data + timestamp).toLowerCase();
  }
})