// 弹窗 模板 js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    phoneNumber:{
      type: String,
    },
    // 是否显示确认与取消按钮
    show_btns:{
      type: Boolean,
      value: false
    },
    //是否显示modal
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
    },
    //modal的宽度
    width: {
      type: String,
      value: '80%'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({ show: false })
    },
    open() {
      this.setData({ show: true})
    },

    cancel() {
      this.setData({ show: false })
      this.triggerEvent('cancel')
    },

    confirm() {
      this.setData({ show: false });
      this.triggerEvent('confirm');
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber // 仅为示例，并非真实的电话号码
      })
    }
  }
})
