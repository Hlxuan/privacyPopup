// pages/writePhotosAlbum/writePhotosAlbum.js
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

  writePhotosAlbum() {
    const that = this
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
    wx.getSetting({
      success(res) {
        console.log("getSetting success =>", res)
        // 用户没有授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          // 发起授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              console.log("authorize success =>", res)
              that.saveImageToPhotosAlbum()
            },
            fail(err) {
              console.error("authorize fail =>", err)
            }
          })
        }
        // 用户授权了
        else {
          that.saveImageToPhotosAlbum()
        }
      },
      fail(err) {
        console.error("getSetting fail =>", err)
      }
    })
  },

  saveImageToPhotosAlbum() {
    wx.saveImageToPhotosAlbum({
      filePath: "/images/ilangyue.jpg",
      success(res) {
        console.log("saveImageToPhotosAlbum success =>", res)
      },
      fail(err) {
        console.error("saveImageToPhotosAlbum fail =>", err)
      }
    })
  },

})