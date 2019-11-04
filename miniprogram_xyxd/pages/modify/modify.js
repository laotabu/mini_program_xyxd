// pages/modify/modify.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    isdisable:false // 控制修改
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goToModify: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: 'modifyInfor/index?id=' + e.currentTarget.id,
    })
  },

  modifyUserSubmit: function (e) {
   
    console.log('stuName：' + e.detail.value.stuName);
    var that = this
    if (app.globalData.status == 0){
        wx.cloud.callFunction({
          name: 'modifyUser',
          data: {
            status: app.globalData.status,
            openID: app.globalData.openid,  //传递openID，以下参数类似
            campus: e.detail.value.campus,
            major: e.detail.value.major,
            stuName: e.detail.value.stuName,
            stuSex: e.detail.value.stuSex,
            studentID: e.detail.value.studentID,
          },
          success: res => {
            console.log('调用modify云函数成功');
            console.log('openid是：' + app.globalData.openid);
            console.log('stuName：' + e.detail.value.stuName);
            console.log('e：' + e);
            wx.removeStorage({
              key: 'initStudent',
              success(res) {
                console.log('清除initStudent缓存');
                
              }
            })
          },
          fail: res => {
            console.log('openid是：'+app.globalData.openid);
            console.log('调用modify云函数失败')
          }
        })
    }else if (app.globalData.status == 1){
      wx.cloud.callFunction({
        name: 'modifyUser',
        data: {
          status: app.globalData.status,
          openID: app.globalData.openid,  //传递openID，以下参数类似
          campus: e.detail.value.campus,
          reDirection: e.detail.value.reDirection,
          tchName: e.detail.value.tchName,
          tchSex: e.detail.value.tchSex,
          teacherID: e.detail.value.teacherID,
        },
        success: res => {
          console.log('调用modify云函数成功');
          console.log('openid是：' + app.globalData.openid);

          console.log('e：' + e);
          wx.removeStorage({
            key: 'initUser',
            success(res) {
              console.log('清除initStudent缓存');

            }
          })
        },
        fail: res => {
          console.log('openid是：' + app.globalData.openid);
          console.log('调用modify云函数失败')
        }
      })
    }else {
      console.log('游客身份')
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var flag = app.globalData.status
    var that = this;
    if (flag == 0 || flag == 1) {

      var that = this
      wx.getStorage({
        key: 'initUser',
        success: function (res) {
          console.log('缓存')
          console.log(res)
          that.setData({
            user: res.data,
            status: app.globalData.status
          })
        },
        fail: function () {
          wx.cloud.callFunction({
            name: 'getInfo_user',
            data: {
              openid: app.globalData.openid,
              status: app.globalData.status
            },
            success: res => {
              console.log('云函数' + res.result.data)
              console.log('云函数' + res.result.data[0])
              wx.setStorage({
                key: 'initUser',
                data: res.result.data[0],

              })
              that.setData({
                // 注意，这里没有从缓存拿数据，所以需要res.result.data[0]
                user: res.result.data[0],
                status: app.globalData.status
              })
            },
            fail: res => {
              console.log('您不在服务范围，调回首页')
            }
          })
        }
      })
    }else {
      console.log('游客身份')
    }
  }
})