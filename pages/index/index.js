// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      path: "/pages/home/home",
      name: "首页",
    }, {
      path: "/pages/phoneNumber/phoneNumber",
      name: "获取手机号",
    }, {
      path: "/pages/chooseMedia/chooseMedia",
      name: "拍摄或从手机相册中选择图片或视频",
    }, {
      path: "/pages/userProfile/userProfile",
      name: "头像昵称填写",
    }]
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

  navigator(e) {
    const path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: path,
    })
  },

})