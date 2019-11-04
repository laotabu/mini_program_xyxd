// pages/result/result.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
     
      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      },
  adminMiniInputInformation: function (e) {
        
       
       /* var pages = getCurrentPages();
        var Page = pages[pages.length - 1];//当前页
        var inputInformation = Boolean(Page.data.inputInformation)*/
    console.log(this.data.inputInformation);
        wx.cloud.callFunction({
          name: 'adminMini',
          data: {
            options: "modifyInputInformation",
            inputInformation: this.data.inputInformation,
          },
          success: res => {
            console.log('调用adminMini云函数成功');
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: res => {
            console.log('调用云函数失败')
          }
        })
      },
      radioChange:function(e)
      {
       // console.log(e)
       this.setData({
         inputInformation:e.detail.value
       })
        console.log(this.data.inputInformation)
      },
    })