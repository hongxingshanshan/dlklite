// 弹窗 模板 js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    //是否显示modal
    choose_show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({ choose_show: false })
    },
    open() {
      this.setData({ choose_show: true })
    }
  }
})
