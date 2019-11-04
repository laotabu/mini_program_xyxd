// miniprogram_xyxd/pages/temporaryInput/userInput/userInput.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: null,
    openid: null,
    colleges: null,
    name: null,
    sex: null,
    campus: null,
    sexColumns: ['男', '女'],
    campusColumns: ['松山湖校区', '莞城校区'],
    // collegeColumns: ["马克思主义学院 ", "机械工程学院", "电子工程与智能化学院 ", "计算机科学与技术学院 ", "生态环境与建筑工程学院 ", "经济与管理学院 ", "文学与传媒学院", "教育学院(师范学院) ", "化学工程与能源技术学院 ", "粤台产业科技学院 ", "粤港机器人学院 ", "国际学院 ", "网络空间安全学院", "材料科学与工程学院"],
    collegeColumns: null,
    majorColumns: null,
    show: false,
    show_campus: false,
    show_college: false,
    show_major: false,
  },
  submit(event) {
    console.log(event);
    var that = this;
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var person = {
      name: event.detail.value.name,
      id: event.detail.value.id,
      // major: event.detail.value.major,
      introduction: event.detail.value.introduction,
      sex: this.data.sex,
      campus: this.data.campus,
      college: this.data.college,
      status: Page.data.status,

    }
    // 直接使用person
    console.log(person);
    console.log(person.status);
    console.log(this.data.openid);
    if (this.data.status == 0) {
      wx.cloud.callFunction({
        name: 'userSubmit',
        data: {
          status: person.status,
          openID: this.data.openid, //传递openID，以下参数类似
          campus: person.campus,
          major: this.data.major,
          stuName: person.name,
          stuSex: person.sex,
          studentID: person.id,
          college: person.college,

        },
        success: res => {
          console.log('调用userSubmit云函数成功');
          console.log('openid是：' + this.data.openid);
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: res => {
          console.log('openid是：' + this.data.openid);
          console.log('调用userSubmit云函数失败')
        }
      })
    } else {

      wx.cloud.callFunction({
        name: 'userSubmit',
        data: {
          status: person.status,
          openID: this.data.openid, //传递openID，以下参数类似
          campus: person.campus,
          reDirection: event.detail.value.major,
          tchName: person.name,
          tchSex: person.sex,
          teacherID: person.id,
          college: person.college,
          introduction: person.introduction,
        },
        success: res => {
          console.log('调用userSubmit云函数成功');
          console.log('openid是：' + this.data.openid);
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: res => {
          console.log('openid是：' + this.data.openid);
          console.log('调用userSubmit云函数失败')
        }
      })
    }

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
        major: event.detail.value
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
    var that = this
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    wx.getStorage({
      key: 'colleges',
      success: function(res) {
        // 测试，可以删掉 
        //var lenth = that.data.majors['lenth']
        var lenth = res.data['lenth']
        for (var i = 1; i <= lenth; i++) {
          console.log(res.data[i])
        }
        that.setData({
          status: options.status,
          colleges: res.data
        })
        var source_arr = that.data.colleges;
        console.log("原始数据是对象数组：" + source_arr);
        console.log("原始数据是对象数组1：" + that.data.colleges);
        // var obj = source_arr[1];
        // console.log("获取第一个对象" + obj);
        var out_arr = [];	//创建一个数组
        for (var i = 1;i <= 14;i++) {
          out_arr[i-1] = source_arr[i];
        }
        console.log("转换输出：" + out_arr);
        that.setData({
          collegeColumns: out_arr,
        })
      },
      fail: function(res) {
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
          status: options.status,
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    //that.data.status = options.status
    wx.getStorage({
      key: 'majors',
      success: function(res) {
        that.setData({
          majors: res.data
        })
      }
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.data.openid = res.data.openid
        console.log('缓存' + that.data.openid)
      }
    })


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