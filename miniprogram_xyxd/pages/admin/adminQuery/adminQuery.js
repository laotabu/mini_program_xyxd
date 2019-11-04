// pages/result/result.js
const app = getApp()
const db = wx.cloud.database()
//  var utilMd5 = require('../untils/md5.js');
// // var password = utilMd5.hexMD5(password); 
Page({

  /**
   * 页面的初始数据
   */

  data: {
    
      student: []
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.teacherID)
    db.collection('selecting_dgut_tch').where({
      teacherID: options.teacherID
    }).get({
      success: res => {
        console.log('调用adminQuery函数成功');
        that.setData({
          student: res.data[0].selectedStudent
        })
        //console.log(res.data[0].selectedStudent)
      },fail: res => {
        console.log(res)
        wx.showToast({
          title: '没有这个老师',
          duration: 2000
        })
      }
    })
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
     
    })