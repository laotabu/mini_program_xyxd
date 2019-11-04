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
    user: {
      teacher: {
      },
      student: [
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    console.log(app.globalData.status);
    if (app.globalData.status == 0) {
      wx.getStorage({
        key: 'resultTeacher',
        success: function (res) {
          console.log('实现了teacher缓存')
          that.setData({
            teacher: res.data,
          })
        },
        fail: function () {
          console.log("没有实现teacher的缓存：");
          console.log("studentID:" + app.globalData.userID);
              db.collection("result_dgut").where({
                studentID: app.globalData.userID
              }).get(
                {
                  success: function (res) {
                    console.log("teacherID:" + res.data[0].teacherID);
                    console.log("teacherID:" + res.data[0]);
                    console.log("teacherID:" + res);
                    db.collection("teacher").where({
                      teacherID: res.data[0].teacherID //这里应该是老师的工号
                    }).where({
                      college: app.globalData.college
                    }).get({
                      success: function (res) {
                        console.log("teacher:" + res.data[0]);
                        that.setData({
                          teacher: res.data[0],
                        })
                        wx.setStorage({
                          key: 'resultTeacher',
                          data:   res.data[0],
                        })
                      }
                    })
                  }
                });
        }
      })
      wx.getStorage({
        key: 'studentPrint',
        success: function (res) {
          console.log('实现了studentPrint缓存')
          that.setData({
            studentPrint: res.data,
          })
        },
        fail: function () {
          console.log("没有实现studentPrint的缓存：");
          db.collection("student").where({
            openID: app.globalData.openid
          }).get(
            {
              success: function (res) {
                that.setData({
                  studentPrint: res.data[0],
                })
                wx.setStorage({
                  key: 'studentPrint',
                  data: res.data[0],
                })
              }
            }
          );
        }
      })
    }
    else if (app.globalData.status == 1) {
      wx.getStorage({
        key: 'resultStudent',
        success: function (res) {
          console.log('实现了student缓存')
          that.setData({
            student: res.data,
          })
        },
        fail: function () {
          console.log("没有实现student的缓存：");
        
            
              db.collection("result_dgut").where({
                teacherID: app.globalData.userID //这里应该是老师的工号
              }).get(
                {
                  success: function (res) {
                    that.setData({
                      student: res.data,
                    })
                    wx.setStorage({
                      key: 'resultStudent',
                      data: res.data,
                    })
                    console.log(res)
                  }
                });
           
          
         
        }
      });
    }
    else {
      console.log('游客身份')
    }
    this.setData({
      isFinish: app.globalData.resultDisplay,
      flag: app.globalData.status,
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
    if (!app.globalData.resultDisplay) {
      /* 判断为老师 */
      wx.showModal({
        title: '提示',
        content: '你好，最终结果需要选导结束后才能查看！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../myInformation/myInformation',
            })
          }
        }
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
  teacherPrint: function () {



  }
})