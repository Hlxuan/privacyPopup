// pages/phoneNumber/phoneNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPrivacy: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  // 手机号快速验证组件事件回调
  getPhoneNumber(e) {
    console.log("getPhoneNumber", e)
    if (e.detail.errMsg) {
      wx.showToast({
        title: e.detail.errMsg,
        icon: "none",
        duration: 2500,
      })
    }
  },

  // 用户点击同意按钮后
  handleAgreePrivacyAuthorization() {

  },

  // 用户点击拒绝按钮后
  handleDisagree() {
    wx.showToast({
      title: '没有权限使用该功能',
      icon: "none",
      duration: 2000,
    })
  },

})