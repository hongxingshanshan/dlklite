var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
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

  },
  getData() {
    var that = this;
    // app.func.reqs('order/detail', 'POST', {
    //   lan: 1,
    //   lon: 1,
    //   orderId = 1178,
    //   radius = 1,
    //   sign: f10c89f059506435a1e7332801d46225,
    //   t: 1546919614,
    //   uid: 21}, function (res) {
    //     console(res)
    //   that.setData({
    //   })
    // });
  },
  navigateBack() {
    getApp().globalData.value = 'value'
    wx.navigateBack()
    console.log('返回上一级')
  },
})