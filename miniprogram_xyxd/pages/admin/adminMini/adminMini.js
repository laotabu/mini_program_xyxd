// pages/modify/modify.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  sayHi: function (e) {

    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    this.setData({
      flag: app.globalData.status,// 获取index页面的头像信息

    })
    console.log(this.data.flag)
    wx.cloud.callFunction({
      name: 'getAllStudentLength',
      success: res => {
        console.log(res);
        that.setData({
          studentLength: res.result
        })
        wx.showToast({
          title: ' 获取云端学生数据成功',
          icon: 'success',
          duration: 2000
        })
      }
    }),
    wx.cloud.callFunction({
      name: 'getAllTeacherLength',
      success: res => {
        console.log(res);
        that.setData({
          teacherLength: res.result
        })
        wx.showToast({
          title: ' 获取云端老师数据成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
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

  miniCreateStuAndTch: function () {

    
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var that = this
    //console.log(that.data.student)
    console.log(Page.data.studentLength)
    console.log(Page.data.teacherLength)
    for (var i = 0; i <Page.data.studentLength ; i+=100 )
    {
      wx.cloud.callFunction({
        name: 'getAllStudent',
        data: {
         i: i,
        },
        success: res => {
          // console.log(res);
          wx.cloud.callFunction({
            name: 'adminMini',
            data: {
              information: res.result.data,
              options: 'selectingDgutStu'
            },
            success: res => {
            
            }
          })
        }
      });
    }
    wx.showToast({
      title: ' miniCreateStuAndTch成功',
      icon: 'success',
      duration: 2000
    })
   

    for (var i = 0; i < Page.data.teacherLength; i += 100) {
      wx.cloud.callFunction({
        name: 'getAllTeacher',
        data: {
          i: i,
        },
        success: res => {
          wx.cloud.callFunction({
            name: 'adminMini',
            data: {
              information: res.result.data,
              options: 'selectingDgutTch'
            },
            success: res => {

            }
          })
        }
      });
    }
    wx.showToast({
      title: ' miniCreateStuAndTch成功',
      icon: 'success',
      duration: 2000
    })
  },

// 消除selecting_dgut_tch重复项
  eliminateDuplicates: function () {
    wx.cloud.callFunction({
      name: 'get_temporary_results',
      success: res => {
        var sign = false;
        for (var i = 0; i < res.result.data.length; i++) {
          //console.log(res.result.data[i].teacherID+":"+res.result.data[i].selectedStudent)
          var temp = []
          for (var j = 0; j < res.result.data[i].selectedStudent.length; j++) {
            if (temp.indexOf(res.result.data[i].selectedStudent[j]) < 0) {
              temp.push(res.result.data[i].selectedStudent[j])

            }
          }
          if (temp.length != res.result.data[i].selectedStudent.length) {
            res.result.data[i].selectedStudent = temp
            sign = true
          }
          //console.log(res.result.data[i].selectedStudent)
          //console.log(temp)
        }

        //console.log(res.result.data)
        if (sign) {
          wx.cloud.callFunction({
            name: 'update_temporary_results',
            data: {
              arr: res.result.data
            },
            success: res => {
              console.log('调用成功')
            },
            fail: res => {
              console.log('调用失败')
            }
          })
        }else {
          console.log('没有重复项')
        }
      },
      fail: res => {
        console.log(res)
      }
    })

  },
  adminMiniResultDisplay: function (e) {
    wx.navigateTo({
      url: '../adminMiniResultDisplay/adminMiniResultDisplay',
    })
  },
  adminMiniInputInformation: function (e) {
    wx.navigateTo({
      url: '../adminMiniInputInformation/adminMiniInputInformation',
    })
  }

})