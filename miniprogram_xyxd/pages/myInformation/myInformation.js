// pages/myInformation/myInformation.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tempResult: [],
    flag: 0,
    active: 3, //页面选中的下标 
  },
  modify: function (e) {
    wx.navigateTo({
      url: '../modify/modify'
    })
  },
  result: function (e) {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  admin: function (e) {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.setData({
      userInfo: app.globalData.userInfo,// 获取index页面的头像信息
      flag: app.globalData.status,// 获取index页面的头像信息
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

    var that = this
    if (app.globalData.status == 0 || app.globalData.status == 1) {
      var util = require("../../utils/util.js");
      var nowseconds = util.changeToSecondsBy2019(new Date())
      wx.getStorage({
        key: 'temporary_results',
        success: function (res) {
          //console.log(res.data.selectingResult)
          that.setData({
            tempResult: res.data.selectingResult
          })
          if ((nowseconds - res.data.time) > 20000) {
            wx.removeStorage({
              key: 'temporary_results',
              success: function (res) {
                console.log('清除缓存成功')
              },
            })
          }
         // console.log(res.data.time)
        },
        fail: function (res) {
          wx.cloud.callFunction({
            name: 'get_temporary_results',
            data: {
              openID: app.globalData.openid,
              status: app.globalData.status
            },
            success: res => {
              console.log('获取临时数据成功' + res)
              if (app.globalData.status == 0) {
                wx.setStorage({
                  key: 'temporary_results',
                  data: {
                    selectingResult: res.result.data[0].selectTeacher,
                    time: nowseconds
                  }
                })
              } else {
                wx.setStorage({
                  key: 'temporary_results',
                  data: {
                    selectingResult: res.result.data[0].selectedStudent,
                    time: nowseconds
                  }
                })
              }
            },
            fail: res => {
              console.log('获取临时数据失败')
            }
          })
        }
      })
    } else {
      console.log('游客身份')
    }






  },
  /*tabar切换*/
  onChange: function (event) {
    var n = event.detail;
    if (n == 0) {
      wx.switchTab({
        url: '../home/home'
      })
    } else if (n == 1) {
      wx.switchTab({
        url: '../tutorInformation/tutorInformation'
      })
    } else if (n == 2) {
      wx.switchTab({
        url: '../chooseTutor/checkUser/checkUser'
      })
    } else if (n == 3) {
      wx.switchTab({
        url: '../myInformation/myInformation'
      })
    }
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