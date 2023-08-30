// pages/userProfile/userProfile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    focus: false,
    showPrivacy: false,
    needAuthorization: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 查询隐私授权情况
    if (wx.getPrivacySetting) {
      wx.getPrivacySetting({
        success: res => {
          console.log("getPrivacySetting success =>", res)
          this.data.needAuthorization = res.needAuthorization
        },
        fail: (err) => {
          console.error("getPrivacySetting fail =>", err)
        },
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

  // 用户点击input后
  handleTouchInput() {
    if (this.data.needAuthorization) {
      this.setData({
        showPrivacy: true,
      })
      this.data.handleTouchInput = true
    } else {
      this.setData({
        focus: true,
      })
    }
  },

  // 获取头像事件回调
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },

  // 用户点击同意按钮后
  handleAgreePrivacyAuthorization() {
    if (this.data.handleTouchInput) {
      this.setData({
        focus: true,
      })
      this.data.handleTouchInput = false
    }
  },

  // 用户点击拒绝按钮后
  handleDisagree() {
    wx.showToast({
      title: '没有权限设置头像和昵称',
      icon: "none",
      duration: 2000,
    })
  },

})