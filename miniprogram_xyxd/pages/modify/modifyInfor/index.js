// pages/myItem/modify/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    radioCollege: '1',
    colleges: null,
    majors: null,
    collegeColumns: null,
    majorColumns: null,
    show: false,
    show_college: false,
    show_major: false,
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    console.log(Page.data.radio);
  },
  showPopup(event) {
    console.log(event);
    var show = event.target.id;
    if (show == "sex")
      this.setData({
        show: true
      });
    if (show == "campus")
      this.setData({
        show_campus: true
      });
    if (show == "college")
      this.setData({
        show_college: true
      });
    if (show == "major")
      this.setData({
        show_major: true
      });
  },

  onClose(event) {
    var show = event.target.id;
    if (show == "sex")
      this.setData({
        show: false
      });
    if (show == "campus")
      this.setData({
        show_campus: false
      });
    if (show == "college")
      this.setData({
        show_college: false
      });
    if (show == "major")
      this.setData({
        show_major: false
      });
  },
  onConfirm(event) {
    // const { picker, value, index } = event.detail;
    console.log(event);
    var show = event.target.id;
    if (show == "sex")
      this.setData({
        sex: event.detail.value,
      });
    if (show == "campus")
      this.setData({
        campus: event.detail.value,
      });
    if (show == "college")
      this.setData({
        college: event.detail.value,
      });
    if (show == "major")
      this.setData({
        major: event.detail.value,
      });
    this.onClose(event)

  },

  onCancel(event) {
    // console.log(event);
    this.onClose(event);
    // this.setData({
    //   show: false
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    this.setData({
      id: options.id,
      status: app.globalData.status,
    })
    wx.getStorage({
      key: 'colleges',
      success: function (res) {
        // 测试，可以删掉 
        //var lenth = that.data.majors['lenth']
        var lenth = res.data['lenth']
        for (var i = 1; i <= lenth; i++) {
          console.log(res.data[i])
        }
        that.setData({
          colleges: res.data
        })
        var source_arr = that.data.colleges;
        console.log("原始数据是对象数组：" + source_arr);
        console.log("原始数据是对象数组1：" + that.data.colleges);
        // var obj = source_arr[1];
        // console.log("获取第一个对象" + obj);
        var out_arr = [];	//创建一个数组
        for (var i = 1; i <= 14; i++) {
          out_arr[i - 1] = source_arr[i];
        }
        console.log("转换输出：" + out_arr);
        that.setData({
          collegeColumns: out_arr,
        })
      },
      fail: function (res) {
        //console.log('11云函数')
        wx.cloud.callFunction({
          name: 'getAllInstitute',
          success: res => {
            console.log('云函数' + res.result.data[0]['1'])
            wx.setStorage({
              key: 'colleges',
              data: res.result.data[0]
            })
            that.setData({
              colleges: res.result.data[0]
            })
            //that.data.majors = res.result.data[0]
            var source_arr = that.data.colleges;
            console.log("原始数据是对象数组：" + source_arr);
            console.log("原始数据是对象数组1：" + that.data.colleges);
            // var obj = source_arr[1];
            // console.log("获取第一个对象" + obj);
            var out_arr = [];	//创建一个数组
            for (var i = 1; i <= 14; i++) {
              out_arr[i - 1] = source_arr[i];
            }
            console.log("转换输出：" + out_arr);
            that.setData({
              collegeColumns: out_arr,
            })
          }
        })
      }
    })
    wx.getStorage({
      key: 'majors',
      success: function (res) {
        // 测试，可以删掉 
        //var lenth = that.data.majors['lenth']
        var lenth = res.data['lenth']
        for (var i = 1; i <= lenth; i++) {
          console.log(res.data[i])
        }
        that.setData({
          majors: res.data
        })
        var source_arr = that.data.majors;
        console.log("原始数据是对象数组：" + source_arr);
        console.log("原始数据是对象数组1：" + that.data.majors);
        // var obj = source_arr[1];
        // console.log("获取第一个对象" + obj);
        var out_arr = [];	//创建一个数组
        for (var i = 1; i <= 47; i++) {
          out_arr[i - 1] = source_arr[i];
        }
        console.log("转换输出：" + out_arr);
        that.setData({
          majorColumns: out_arr,
        })
      },
      fail: function (res) {
        //console.log('11云函数')
        wx.cloud.callFunction({
          name: 'getAllMajor',
          success: res => {
            console.log('云函数' + res.result.data[0]['1'])
            wx.setStorage({
              key: 'majors',
              data: res.result.data[0]
            })
            that.setData({
              majors: res.result.data[0]
            })
            //that.data.majors = res.result.data[0]
            var source_arr = that.data.majors;
            console.log("原始数据是对象数组：" + source_arr);
            console.log("原始数据是对象数组1：" + that.data.majors);
            // var obj = source_arr[1];
            // console.log("获取第一个对象" + obj);
            var out_arr = [];	//创建一个数组
            for (var i = 1; i <= 47; i++) {
              out_arr[i - 1] = source_arr[i];
            }
            console.log("转换输出：" + out_arr);
            that.setData({
              majorColumns: out_arr,
            })
          }
        })
      }
    })
    console.log('缓存:' + Page.data.colleges)
  },
  
  studentModify: function (e){
    console.log('调用studentModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    console.log(e.detail.value.item)
    console.log(app.globalData.status)
    
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id:id,//传递id
        item:e.detail.value.item,//传递item
      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + e.detail.value.item);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        }),
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  stuSexModify: function (e) {
    console.log('调用stuSexModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    console.log(Page.data.radio)
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: Page.data.radio,//传递item

      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + Page.data.radio);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  stuCollegeModify: function (e) {
    console.log('调用stuSexModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: Page.data.college,//传递item

      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + Page.data.college);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid); 
        console.log('调用modify云函数失败')
      }
    })
  },
  stuMajorModify: function (e) {
    console.log('调用stuMajorModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: Page.data.major,//传递item

      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + Page.data.college);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  teacherModify: function (e) {
    console.log('调用studentModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    console.log(e.detail.value.item)
    console.log(app.globalData.status)

    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: e.detail.value.item,//传递item
      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + e.detail.value.item);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        }),
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })

      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  tchSexModify: function (e) {
    console.log('调用tchSexModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    console.log(Page.data.radio)
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: Page.data.radio,//传递item

      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + Page.data.radio);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  tchCollegeModify: function (e) {
    console.log('调用tchCollegeModify===')
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var id = Page.data.id;
    console.log(id)
    console.log("123" + Page.data.radioCollege);
    wx.cloud.callFunction({
      name: 'modify_user',
      data: {
        status: app.globalData.status,
        openID: app.globalData.openid,  //传递openID，以下参数类似
        id: id,//传递id
        item: Page.data.college,//传递item

      },
      success: res => {
        console.log('调用modify云函数成功');
        console.log('openid是：' + app.globalData.openid);
        console.log('item：' + Page.data.college);
        console.log('e：' + e);
        wx.removeStorage({
          key: 'initUser',
          success(res) {
            console.log('清除initUser缓存');

          }
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log('openid是：' + app.globalData.openid);
        console.log('调用modify云函数失败')
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})