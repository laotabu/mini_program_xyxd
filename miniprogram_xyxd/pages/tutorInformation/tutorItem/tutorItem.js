const db = wx.cloud.database();
Page({
  data: { 
    tutor:null,
  
  },
  onLoad: function(option) {
    var that = this;
    var tid = option.id;
    var id = 'tutor.id' ;
    var name = 'tutor.name';
    var college = 'tutor.college';
    var study = 'tutor.study';
    var introduction = 'tutor.instroduction';
    var number = 'tutor.number';
    wx.getStorage({
      key: tid,
      success: function(res) {
         that.setData({
           [id] : tid,
           [name] : res.data.tchName,
           [college] : res.data.college,
           [study] : res.data.reDirection,
           [introduction]: res.data.introduction,
           [number] : 15

         })
      },
      fail: function(err){
        db.collection('teacher').where({
          teacherID:tid
        }).get({
          success: res=>{
            that.setData({
              [id]: tid,
              [name]: res.data[0].tchName,
              [college]: res.data[0].college,
              [study]: res.data[0].reDirection,
              [introduction]: res.data[0].introduction,
              [number]: 15
            })
            wx.setStorage({
              key: tid,
              data: res.data[0],
            })
          },
          fail: err=>{
            console.log('fail');
            wx.showToast({
              icon: 'none',
              title: '教师详细信息获取失败'
            })
          }
        })
      }
    })
  }
})