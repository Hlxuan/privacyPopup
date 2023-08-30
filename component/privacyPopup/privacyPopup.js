// component/privacyPopup/privacyPopup.js
let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()

// 低版本兼容
if (wx.onNeedPrivacyAuthorization) {
  wx.onNeedPrivacyAuthorization(resolve => {
    if (typeof privacyHandler === 'function') {
      privacyHandler(resolve)
    }
  })
}

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗开关
    showPrivacy: {
      type: Boolean,
      value: false,
    },
    // 是否自动弹窗
    auto: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPrivacy: false, // 显示弹窗（默认关闭）
    miniprogramName: "i朗月", // 小程序的名称
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {

      privacyHandler = resolve => {
        this.popUp()
        privacyResolves.add(resolve)
      }

      // 低版本兼容
      if (wx.getPrivacySetting) {
        wx.getPrivacySetting({
          success: res => {
            console.log("getPrivacySetting success =>", res)
            if (res.needAuthorization) {
              // 需要弹出隐私协议
              if (this.properties.auto) {
                this.popUp()
              }
              this.setData({
                privacyContractName: res.privacyContractName,
              })
            } else {
              // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用隐私接口

            }
          },
          fail: (err) => {
            console.error("getPrivacySetting fail =>", err)
          }
        })
      }
    },
  },

  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    // 组件所在的页面被隐藏时执行
    hide: function () {
      if (privacyHandler) {
        // 告知平台用户已经拒绝了
        this.handleDisagree()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 跳转至隐私协议页面
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    },

    // 用户拒绝
    handleDisagree() {
      console.log("用户拒绝隐私授权，相关的接口无法使用")
      this.triggerEvent("disagree")
      // 低版本兼容
      if (privacyHandler) {
        // 告知平台用户已经拒绝
        privacyResolves.forEach(resolve => {
          resolve({
            event: 'disagree',
          })
        })
        privacyResolves.clear()
      }
      this.disPopUp()
    },

    // 用户同意
    handleAgree() {
      console.log("用户同意隐私授权，相关的接口可以正常使用")
      this.triggerEvent("agree")
      // 告知平台用户已经同意，参数传同意按钮的id。为确保用户有同意的操作，基础库在 resolve 被调用后，会去检查对应的同意按钮有没有被点击过。检查通过后，相关隐私接口会继续调用
      privacyResolves.forEach(resolve => {
        resolve({
          event: 'agree',
          buttonId: 'agree-btn'
        })
      })
      privacyResolves.clear()
      this.disPopUp()
    },

    popUp() {
      if (this.data.showPrivacy === false) {
        this.setData({
          showPrivacy: true
        })
      }
    },

    disPopUp() {
      if (this.data.showPrivacy === true) {
        this.setData({
          showPrivacy: false
        })
      }
    },

  }
})