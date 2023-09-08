// pages/coupling/coupling.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacyContractName: "《隐私保护指引》",
    agree: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad", options)
    if (options) {
      this.setData({
        type: options.type,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

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

  checkboxChange(e) {
    console.log("checkboxChange", e.detail.value)
    if (e.detail.value[0] === "agree") {
      this.setData({
        agree: true,
      })
    } else {
      this.setData({
        agree: false,
      })
    }
  },

  loginCheck() {
    if (!this.data.agree) {
      wx.showToast({
        title: '请先阅读并同意隐私保护指引',
        icon: 'none',
        duration: 2000,
      })
    }
  },

  handleAgreePrivacyAuthorization() {
    // 用户同意隐私协议事件回调
    // 用户点击了同意，之后所有已声明过的隐私接口和组件都可以调用了
    console.log("用户同意隐私授权，相关的接口可以正常使用")
  },

  handleGetPhoneNumber(e) {
    // 手机号快速验证组件回调
    console.log("handleGetPhoneNumber", e)
  },

  handleGetRealtimePhoneNumber(e) {
    // 手机号实时验证组件回调
    console.log("handleGetRealtimePhoneNumber", e)
  },

  handleGetUserInfo(e) {
    // 获取头像昵称回调（已回收，默认返回灰色头像和微信用户）
    console.log("handleGetUserInfo", e)
  }
})