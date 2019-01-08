// -----------------  导入 需要的 文件  -----------------------
var util = require('../../utils/util.js')
var app = getApp();

// 将html富文本 转为 小程序所识别的数据
var WxParse = require('../../wxParse/wxParse.js');

// 引入SDK核心类 高德地图获取经纬度
var QQMapWX = require('../../datas/qqmap-wx-jssdk.min.js');

// 实例化API核心类  
var qqmapsdk = new QQMapWX({
  key: 'XMJBZ-767RU-5SEVL-4Z5GR-BBUQK-HFFTJ' // 必填
});


// --------------------  页面js  ---------------------------------
// 商品详情页面1 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ------------------  md5 加密数据 -------------------
    userInfo: {
      name: 'Terrance',
      age: 33
    },
    appkey: 'fff222',
    //other data

    // ------------------  计算 商户与用户 距离的初始值  ----------------------------
    distance: "", // 距离 = 用户 经纬度 -> 商户 经纬度
    orgInfo_latitude: "", // 商户  纬度
    orgInfo_longitude: "", // 商户 经度
    latitude: "", //用户 当前 纬度
    longitude: "", //用户 当前 经度
    residueTime: {},

    //  --------------------------  弹窗初始值  ------------------------------
    showModal: false, // 2.0  点击 “发起拼单” 按钮  弹出 “报名须知” 弹窗

    showGropBuy: false, // 3.0 点击 “立即开始拼团” 按钮 弹出 “拼团选择” 弹窗

    isChecked1: false, //5.0 “是否公开参团”  提示 开关,

    look_all: false, // 6.0 点击 “查看全部” 按钮 弹出 “拼单列表” 弹窗

    show_call: false, //7.0  点击 “咨询” 按钮 显示 “是否拨打电话” 弹窗

    // showCall: false, //9.0  点击 “咨询” 按钮 显示 “是否拨打客服电话” 弹窗

    phoneNumber: "", // 8.0 获取接口中的 “商户电话” 信息

    details: {}, //获取接口的数据  res.data数据


    // ------------  选择规模弹窗的初始数据  -----------------------------
    select_str: "请选择：拼课规模", // 选择 规模弹窗中的出师数据
    selectIndex: -1, //当前选择
    redbg: false,
    join_group: '不公开',
    isTrial: false,
  },


  // -------------------------  页面 生命周期  --------------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdata(); //获取详情页面数据
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


  // --------------------------  事件 函数  --------------------------------------


  // 禁止 弹窗是详情页的滚动，只在手机端能够调试出来       
  preventTouchMove() {

  },


  // 1.0  关闭按钮  关闭报名须知弹窗
  close_tc() {
    this.setData({
      showModal: false
    })
  },


  // 2.0  发起拼单 打开报名须知弹窗
  showModal() {
    this.setData({
      showModal: true
    })
  },


  // 3.0  点击开始报名按钮 打开选择弹窗
  showGropBuy() {
    this.setData({
      showGropBuy: true,
      showModal: false
    })
  },


  // 4.0  评课规模  单选效果
  select: function(e) {
    var num = e.target.dataset.num;
    var curIndex = this.data.selectIndex;
    this.setData({
      selectIndex: num == curIndex ? -1 : num,
      select_str: num == curIndex ? '请选择：拼课规模' : e.target.dataset.name,
      redbg: num == curIndex ? false : true
    })
  },


  // 5.0  公开参团信息  开关按钮
  changeSwitch: function(e) {
    this.setData({
      join_group: e.detail.value ? '允许公开' : '不允许公开',
    })
  },


  // 6.0  点击“查看更多”按钮 打开“所有拼单信息”
  look_all() {
    this.setData({
      look_all: true
    })
  },



  // 7.0  点击 "关闭" 按钮 关闭 “拼团人员列表”
  close_list() {
    this.setData({
      look_all: false
    })
  },


  // 在页面加载时，请求数据
  getdata() {
    var that = this;
    app.func.req('course/detail?lan=1&lon=1&radius=1&tgCourseId=211&uid=21', {}, function(res) {
      var beginTime = that.formatTime(res.data.teachingBeginTime);
      var endTime = that.formatTime(res.data.teachingEndTime);
      // 倒计时一天
      let group = res.data.userOpenGroupList;
      var teachWeek = util.getWeekArry(res.data.courseTeachingList)
      // teachWeek [{weekStr:'周三、周日'，weekTime:'09:00-09:11'}]
      // var evaluateTime = util.formatTime2('2019 - 01 - 03 17: 32: 52');
      let obj = that.calDate(res.data.endTime);
      that.setData({
        //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
        details: res.data,
        phoneNumber: res.data.orgMobile,
        beginTime,
        endTime,
        orgInfo_latitude: res.data.orgInfo.latitude,
        orgInfo_longitude: res.data.orgInfo.longitude,
        residueTime: obj,
        teachWeek: teachWeek
      })
      that.getCurGps(); //获取当前经纬度
      // 执行倒计时函数
      that.countDown();
      WxParse.wxParse('article', 'html', res.data.courseIntro, that, 5);
    });
  },
  //  获取用户当前的 经纬度  方法
  getCurGps() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        this.getDestdata(latitude + "," + longitude);
      }
    })
  },

  // 得到当前经纬度，以及商户经纬度，计算出距离
  getDestdata(curGps) {
    var that = this;
    that.formSubmit(curGps, that.data.details.orgInfo.latitude + "," + that.data.details.orgInfo.longitude)
  },



  //  计算 from 起点（用户 经纬度） -> to 终点（商家 经纬度）
  formSubmit(formStr, toStr) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
      from: formStr, //若起点有数据则采用起点坐标，若为空默认当前地址
      to: toStr, //终点坐标
      success: function(res) { //成功后的回调
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },


  // ymd 参数 进行格式化 事件   例如：2019-1-1 转换为 2019年1月1日  格式
  formatTime(ymd) {
    var ymdstr = '';
    if (ymd) {
      var ymdArry = ymd.split(' ');
      if (ymdArry) {
        ymdArry = ymdArry[0].split('-');
        ymdstr = ymdArry[0] + '年' + ymdArry[1] + '月' + ymdArry[2] + '日';
      } else {
        ymdstr = ymd;
      }
    }
    return ymdstr;
  },


  // 选择拼团规模后， 点击“确定” 按钮跳转至拼团“支付和确认订单”页面
  jumpBuy() {
    wx.navigateTo({
      url: '../order_buy/order_buy'
    })
  },


  // 点击 “单独购买” 按钮 跳转到 “支付和确认订单” 页面
  jumpBuyOnself() {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var sigStr = app.makeSign("21", timestamp);
    console.log(sigStr)
    console.log(timestamp)
    app.func.reqs('order/openGroup','POST',{
      courseId: 211,
      isStranger: true,
      purchaseId: 0,
      purchaseNum: 1,
      sign: sigStr,
      t: timestamp,
      uid: 21
    }, function(res) {
      console.log(res);
      if(res.code == 1025) {
        console.log('用户已存在订单')
        // 直接跳转到  待支付页面 进行支付
      } else if (res.code == 1000) {
        // 用户第一次发起订单，跳转到确认与支付订单页面
        wx.navigateTo({
          url: '../buy_onself/buy_onself'
        })
      }
    });
  },
  calDate(endTimeStr) {
    let newTime = new Date().getTime();
    let endTime = new Date(endTimeStr).getTime();
    let obj = null;
    // 如果活动未结束，对时间进行处理
    if (endTime - newTime > 0) {
      let time = (endTime - newTime) / 1000;
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
      }
    }
    return obj;
  },

  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组

    let countUserOpenGroup = [];
    let userOpenGroupList = this.data.details.userOpenGroupList;
    // 对结束时间进行处理渲染到页面
    userOpenGroupList.forEach(o => {
      let groupCountDown = o.countdown;
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (groupCountDown > 0) {
        let time = groupCountDown / 1000;
        // 获取天、时、分、秒
        let hou = parseInt(time / (60 * 60));
        let min = parseInt((time - hou * 60 * 60) / 60);
        let sec = parseInt((time - hou * 60 * 60 - min * 60));
        obj = {
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else { //活动已结束，全部设置为'00'
        obj = {
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      o.failObj = obj;
      o.countdown = o.countdown - 1000;
      countUserOpenGroup.push(o);
    })
    this.data.details.userOpenGroupList = countUserOpenGroup;
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      details: this.data.details
    })
    setTimeout(this.countDown, 1000);
  },
  // 点击 "咨询" 按钮 弹出 “提示是否打电话” 弹窗
  show_call() {
    this.setData({
      show_call: true
    })
  },
  locationtap: function(e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude  //纬度
        const longitude = res.longitude  //经度
        //这是你选中的地址
        wx.openLocation({
          latitude: that.data.orgInfo_latitude,
          longitude: that.data.orgInfo_longitude
        })
      }
    })
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮

      return {
        title: '哆啦课-小程序',
        desc: '自定义分享描述',
        path: '/pages/goods_detail_1/goods_detail_1'

      }
    } else {
      return {
        title: '哆啦课-小程序',
        desc: '自定义分享描述',
        path: '/pages/goods_detail_1/goods_detail_1'
      }

    }

  },
  jumpOrg() {
    wx.navigateTo({
      url: '../join_org/join_org'
    })
  },



  // ---------------------md5 加密--------------------------
  // 根据传参数组obj，追加appkey，生成签名，并返回加签后的数据，用于网络传输
  makePostData: function(obj) {
    var postData = obj;
    postData.key = this.data.appkey;
    postData.sign = app.makeSign(obj); //调用app.js的加密方法
    return postData;
  },

  //网络操作: 设置用户信息 
  setUserInfo: function() {
    var userData = this.data.userInfo;
    var postData = this.makePostData(userData);
    wx.request(
      wx.request({
        url: 'https://接口网址',
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data);
        }
      })
    )
  }
})