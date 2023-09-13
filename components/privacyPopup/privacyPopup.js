// components/privacyPopup/privacyPopup.js
let privacyHandler
let privacyResolves = new Set()
let closeOtherPagePopUpHooks = new Set()

// 低版本兼容
if (wx.onNeedPrivacyAuthorization) {
  wx.onNeedPrivacyAuthorization((resolve, eventInfo) => {
    console.log('触发本次事件的接口是：', eventInfo.referrer)
    if (typeof privacyHandler === 'function') {
      privacyHandler(resolve)
    }
  })
}

const closeOtherPagePopUp = (closePopUp) => {
  closeOtherPagePopUpHooks.forEach(hook => {
    if (closePopUp !== hook) {
      hook()
    }
  })
}

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗开关
    show: {
      type: Boolean,
      value: false,
      observer: "showPopup",
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
    showPopup: false, // 显示弹窗（默认关闭）
    showPrivacy: false, // 显示弹窗（默认关闭）
    miniprogramName: "小程序名称", // 小程序的名称
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {

      const closePopUp = () => {
        this.disPopUp()
      }

      privacyHandler = resolve => {
        this.popUp()
        privacyResolves.add(resolve)
        // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
        closeOtherPagePopUp(closePopUp)
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
              this.triggerEvent("agree")
            }
          },
          fail: (err) => {
            console.error("getPrivacySetting fail =>", err)
          }
        })
      } else {
        this.triggerEvent("agree")
      }

      this.closePopUp = closePopUp
      closeOtherPagePopUpHooks.add(this.closePopUp)
    },
    detached: function () {
      closeOtherPagePopUpHooks.delete(this.closePopUp)
    }
  },

  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    // 组件所在的页面被隐藏时执行
    hide: function () {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 离开后触发
    afterleave() {
      if (!this.data.agree) {
        this.handleDisagree()
      }
    },

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
      this.data.agree = true
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

    showPopup() {
      console.log("popup")
      if (this.data.showPopup === false) {
        this.popUp()
      } else if (this.data.showPopup === true) {
        this.disPopUp()
      }
    },

    // 显示弹窗
    popUp() {
      if (this.data.showPrivacy === false) {
        this.setData({
          showPopup: true
        })
        let timer = setTimeout(() => {
          this.setData({
            showPrivacy: true,
          })
          clearTimeout(timer)
        }, 100)
        // 低版本兼容
        if (privacyHandler) {
          // 把隐私弹窗曝光告知平台
          privacyResolves.forEach(resolve => {
            resolve({
              event: 'exposureAuthorization',
            })
          })
        }
      }
    },

    // 隐藏弹窗
    disPopUp() {
      if (this.data.showPrivacy === true) {
        this.setData({
          showPrivacy: false
        })
        this.data.show = false
        let timer = setTimeout(() => {
          this.setData({
            showPopup: false,
          })
          clearTimeout(timer)
        }, 300)
      }
    },

    // tabBar页面切换时
    tabBarPageShow() {
      console.log("tabBarPageShow")
      if (this.closePopUp) {
        privacyHandler = resolve => {
          privacyResolves.add(resolve)
          this.popUp()
          // 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
          closeOtherPagePopUp(this.closePopUp)
        }
      }
    },

  }
})