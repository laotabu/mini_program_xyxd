// pages/modify/modify.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  sayHi:function(e){

    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
 
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
 adminAdd: function (e) {
  
   wx.cloud.callFunction({
     name: 'adminUpdate',
     data: {
        options: "adminAdd",
       teacherID: e.detail.value.teacherID,
       tchName: e.detail.value.tchName,
       tchName: e.detail.value.tchName,
       studentID: e.detail.value.studentID,
       stuName: e.detail.value.stuName,
     },
     success: res => {
       console.log('调用adminUpdate云函数成功');
       console.log('tchName：' + e.detail.value.tchName);
       console.log('e：' + e);
       wx.showToast({
         title: '添加成功',
         icon: 'success',
         duration: 2000
       })
     },
     fail: res => {
       console.log('调用adminUpdate云函数失败')
     }
   })
  },
  adminQuery: function (e) {
    var that = this
    console.log("options"+e.detail.value.teacherID)
    wx.navigateTo({
      url: '../adminQuery/adminQuery?teacherID='+e.detail.value.teacherID,
    })
  },
  adminDelete: function (e) {
    var that = this
    console.log("options" + e.detail.value.teacherID)
    wx.navigateTo({
      url: '../adminDelete/adminDelete?teacherID=' + e.detail.value.teacherID,
    })
  },
  adminModify: function (e) {
    var that = this
    console.log("options" + e.detail.value.teacherID)
    wx.navigateTo({
      url: '../adminModify/adminModify?teacherID=' + e.detail.value.teacherID,
    })
  },
  adminMini: function (e) {
    wx.navigateTo({
      url: '../adminMini/adminMini',
    })
  },
})