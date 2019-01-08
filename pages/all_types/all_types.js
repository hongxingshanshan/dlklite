var app = getApp()

Page({  
    data: {  
        navLeftItems: [],  //左边导航 数据数组
        navRightItems: [],  //右边导航 数据数组
        curNav: 1,  //当前项的id
        curIndex: 0  //当前项的下标
    },  
    onLoad: function() {  
        //加载的使用进行网络访问，把需要的数据设置到data数据对象
         this.getdata();  
    },  
  
    //事件处理函数  
    switchRightTab: function(e) {  
        //获取item项的id，和数组的下标值  
        let id = e.target.dataset.id,  
            index = parseInt(e.target.dataset.index);  
        //把点击到的某一项，设为当前index  
        this.setData({  
            curNav: id,  
            curIndex: index  
        })  
    },
  getdata() {
    var that = this;
    app.func.req('courseClassify/alllist', {}, function (res) {
      
      that.setData({
        //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
        navLeftItems: res.data[0].tgCourseTypeDTOS,
        navRightItems: res.data[0].tgCourseTypeDTOS

      })
    });
  },
})