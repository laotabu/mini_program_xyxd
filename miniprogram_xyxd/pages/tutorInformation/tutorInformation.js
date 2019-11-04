const db = wx.cloud.database();
Page({
  data: {
    TeacherList : [],
    activeName: '',
    active: 1,
    value:''
  }, 
 
  onLoad:function(){ 
    
    var that = this;
    //现获取本地学院信息的缓存
    wx.getStorage({
      key: 'institute',
      success: function (res) {
        for (let i = 0; i < res.data.lenth; i++) {
          var name = 'TeacherList[' + i + '].name';
          var id = 'TeacherList[' + i + '].id';
          var open = 'TeacherList[' + i + '].open';
          that.setData({
            [name]: res.data[i + 1],
            [id]: i,
          })
        }
      },
      //本地无缓存则调用云函数换取学院信息
      fail: function(err){
       wx.cloud.callFunction({
          name:'getAllInstitute',
          success: res => {
            for (let i = 0; i < res.result.data[0].lenth; i++) {
              var name = 'TeacherList[' + i + '].name';
              var id = 'TeacherList[' + i + '].id';
              that.setData({
                [name]: res.result.data[0][i + 1],
                [id]: i,
              })
            }
            wx.setStorage({
              key: 'institute',
              data: res.result.data[0],
            })

          },
          fail: err=>{
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
          }
        })
      }
    })
  },
  /**
 * 收缩核心代码
 */
  kindToggle:function(e) {
    var that = this;
    this.setData({
      activeName: e.detail
    });

    if(typeof e.detail != typeof ""){
    //id 与 TeacherList.id绑定
      const id = e.detail
      const list = this.data.TeacherList
      wx.cloud.callFunction({
        name:'getAllTotorByInstitute',
        data:{
          college: list[id].name.replace(/\s+/g, '')
        },
        success: res => {
          for (let i = 0; i < res.result.data.length; i++) {
            var teacher = 'TeacherList[' + id + '].teachers[' + i + ']';
            that.setData({
              [teacher]: res.result.data[i],
            })
          }
          /*将所选学院的教师信息进行缓存，key是学院的编号*/
          
        },
        fail: err => {
          console.log('获取教师信息失败！');
        }
      })
      /**
       * key和value名称一样时，可以省略
       */
      that.setData({
        ["TeacherList["+id+"]"] : list[id] ,
      })
    }
  },
  //搜索函数
  onSearch: function(e){
    var that = this;
    var value = this.data.value.replace(/\s+/g, '')
    if(value == ""){
      wx.showToast({
        title: '请输入内容后再搜索',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else if (!(/^[1-9]\d*$/.test(value))){
      wx.showToast({
        title: '请输入正确的编号格式',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else{
      //先查找本地缓存
      wx.getStorage({
        key: value,
        success: _ => {
          wx.navigateTo({
            url: './tutorItem/tutorItem?id=' + that.data.value
          })
        },
        fail: _ => {
          var value = that.data.value
          db.collection('teacher').where({
            teacherID: value
          }).get({
            success: res =>{
              if(res.data.length == 0){
                wx.showToast({
                  title: '未查找到该老师信息',
                  icon: 'none',
                })
                setTimeout(function () {
                  wx.hideToast()
                }, 1000)
              }else{
                wx.setStorage({
                  key: res.data[0].teacherID,
                  data: res.data[0]
                }),
                wx.navigateTo({
                  url: './tutorItem/tutorItem?id=' + res.data[0].teacherID
                })
              }
            },
            fail: err =>{
              console.log("出错了")
              console.log(err)
            }
          })
          
        },
        complete: _ =>{
          that.setData({
            value : '',
          })
        }
      })
    }
  },
  //搜索变化函数
  change:function(e){
    this.setData({value:e.detail})
  },
  //取消搜索
  onCancel: function(){
      this.setData({
        value : ''
      })
  },
  goToItem: function (e){
    //此处的Id是教师的编号
    var Id = e.target.dataset.id
    wx.navigateTo({
      url: './tutorItem/tutorItem?id=' +Id
    })
  },
  onChange: function (event){
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
  }
})
