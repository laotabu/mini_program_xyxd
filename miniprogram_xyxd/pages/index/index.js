//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    logged: false,
    inputInformation: null
  },

  onLoad: function (e) {

    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction({
            name: 'getControl',
            
            success: res => {
              //如果为空字符串，app.globalData.inputInformation在条件判断中为识别成false,非空字符串则为true
              app.globalData.inputInformation = res.result.data[0].inputInformation 
              app.globalData.resultDisplay = res.result.data[0].resultDisplay
              if (app.globalData.inputInformation) {
                
                wx.navigateTo({
                  url: '../temporaryInput/temporaryInput'
                })
              } else {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    app.globalData.userInfo = res.userInfo
                    app.globalData.avatarUrl = res.userInfo.avatarUrl
                  }
                })
                // 获取缓存的openid
                wx.getStorage({
                  key: 'check_user',
                  success: function (res) {
                    console.log('读取成功')
                    app.globalData.openid = res.data.openid
                    app.globalData.status = res.data.status
                    app.globalData.college = res.data.college
                    app.globalData.userID = res.data.userID
                    //app.globalData.resultDisplay = res.data.resultDisplay
                    console.log(app.globalData.openid + '读取成功' + app.globalData.status + ' ' + app.globalData.college)
                    wx.switchTab({
                      url: '../home/home'
                    })
                  },
                })
              }
            }
          })
        }
      }
    })
  },


  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name: 'getControl',
      success: res => {

        app.globalData.inputInformation = res.result.data[0].inputInformation
        app.globalData.resultDisplay = res.result.data[0].resultDisplay
        if (app.globalData.inputInformation && e.detail.userInfo) {

          wx.navigateTo({
            url: '../temporaryInput/temporaryInput'
          })
        } else if (!this.logged && e.detail.userInfo) {

          app.globalData.userInfo = e.detail.userInfo,
            app.globalData.avatarUrl = e.detail.userInfo.avatarUrl,
            this.data.logged = true,
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                /** 确认身份 */
                wx.cloud.callFunction({
                  name: 'check_user',
                  data: {
                    openID: app.globalData.openid
                  },
                  success: res => {
                    app.globalData.status = res.result.data[0].status
                    app.globalData.college = res.result.data[0].college
                    app.globalData.userID = res.result.data[0].userID
                    // 缓存
                    wx.setStorage({
                      key: 'check_user',
                      data: {
                        openid: app.globalData.openid,
                        status: app.globalData.status,
                        college: app.globalData.college,
                        userID: app.globalData.userID,
                        //inputInformation: false,
                        //resultDisplay: app.globalData.resultDisplay
                      },
                      success: function () {
                        console.log("写入成功")
                      },
                      fail: function () {
                        console.log("写入失败")
                      }
                    })
                  },

                  fail: res => {
                    console.log('用户身份识别错误')
                  }
                })
                wx.switchTab({
                  url: '../home/home'
                })
                //}
              },
              fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                  url: '../deployFunctions/deployFunctions',
                })
              }
            })
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  }
})
