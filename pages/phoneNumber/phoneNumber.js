// pages/phoneNumber/phoneNumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 监听隐私接口需要用户授权事件
    wx.onNeedPrivacyAuthorization(resolve => {
      // 需要用户同意隐私授权时
      // 弹出开发者自定义的隐私授权弹窗
      this.setData({
        showPrivacy: true
      })
      this.resolvePrivacyAuthorization = resolve
    })
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

  getPhoneNumber(e) {
    console.log("getPhoneNumber", e)
  },

  // 用户点击同意按钮后
  handleAgreePrivacyAuthorization() {
    this.resolvePrivacyAuthorization({
      buttonId: 'agree-btn',
      event: 'agree'
    })
    // 用户点击同意后，开发者调用 resolve({ buttonId: 'agree-btn', event: 'agree' })  告知平台用户已经同意，参数传同意按钮的id。为确保用户有同意的操作，基础库在 resolve 被调用后，会去检查对应的同意按钮有没有被点击过。检查通过后，相关隐私接口会继续调用
    // 用户点击拒绝后，开发者调用 resolve({ event:'disagree' }) 告知平台用户已经拒绝
  },

  handleDisagree() {
    this.resolvePrivacyAuthorization({
      event: "disagree"
    })
  },

})