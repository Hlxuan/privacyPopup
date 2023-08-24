// pages/chooseMedia/chooseMedia.js
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

  // 用户点击同意按钮后
  handleAgreePrivacyAuthorization() {

  },

  // 用户点击拒绝按钮后
  handleDisagree() {

  },

  chooseMedia() {
    const that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log("chooseMedia success =>", res)
        that.setData({
          tempFiles: res.tempFiles,
        })
      },
      fail(err) {
        console.error("chooseMedia fail =>", err)
        wx.showToast({
          title: err.errMsg,
          icon: "none",
          duration: 2500,
        })
      }
    })
  },
})