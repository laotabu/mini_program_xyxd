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
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.teacherID)
    db.collection('result_dgut').where({
      teacherID: options.teacherID
    }).get({
      success: res => {
        console.log('调用adminDelete函数成功');
        that.setData({
          student: res.data,
          teacherID:options.teacherID
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
      adminDelete: function (e) {
        
        console.log(e.detail.value.teacherID);
        var pages = getCurrentPages();
        var Page = pages[pages.length - 1];//当前页
        console.log(Page.data.studentID);
        wx.cloud.callFunction({
          name: 'adminUpdate',
          data: {
            options: "adminDelete",
            teacherID: Page.data.teacherID,
            studentID: Page.data.studentID,
          },
          success: res => {
            console.log('调用adminUpdate云函数成功');
           
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: res => {
            console.log('调用adminUpdate云函数失败')
          }
        })
      },
      radioChange:function(e)
      {
        console.log(e)
       this.setData({
         studentID:e.detail.value
       })
      },
    })