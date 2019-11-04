// pages/temporaryInput/temporaryInput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        //console.log(res)
        that.data.openid = res.data.openid
      }
    })
  },

  stuInput: function(){
    //console.log(this.data.openid)
    if (this.data.openid == null){
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          //console.log('云函数,'+res)
          this.data.openid = res.result.openid
          wx.setStorage({
            key: 'openid',
            data: {
              openid: this.data.openid
            }
          })
          console.log('云函数,' + this.data.openid)
        }
      })
    }
    wx.getStorage({
      key: 'majors',
      success: function (res) {
        /*that.setData({
          majors: res.data
        })*/
        //that.data.majors =  res.data
        // 测试，可以删掉 
        //var lenth = that.data.majors['lenth']
        var lenth = res.data['lenth']
        for (var i = 1; i <= lenth; i++) {
          console.log('缓存' + res.data[i])
        }
      },
      fail: function (res) {
        wx.cloud.callFunction({
          name: 'getAllMajor',
          success: res => {
            console.log('云函数' + res.result.data[0]['1'])
            wx.setStorage({
              key: 'majors',
              data: res.result.data[0]
            })
           /* that.setData({
              majors: res.result.data[0]
            })*/
            //that.data.majors = res.result.data[0]
          }
        })
      }
    })

    wx.navigateTo({
      url: './userInput/userInput?status=' + 0
    })
  },

  tchInput: function(){
    if (this.data.openid == null) {
      //console.log(1)
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          console.log('云函数,' + res)
          this.data.openid = res.result.openid
          wx.setStorage({
            key: 'openid',
            data: {
              openid: this.data.openid
            }
          })
          console.log(this.data.openid)
        }
      })
    }
    wx.navigateTo({
      url: './userInput/userInput?status=' + 1
    }) 
  },
  admin: function (e) {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },


})