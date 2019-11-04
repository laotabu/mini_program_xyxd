// pages/choseTutor/choseTutor.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "tutorRank":[
        {id: 1, name:'第一导师',unique: 'unique_1',checked:false,tid:0}, 
        {id: 2, name:'第二导师',unique: 'unique_2',checked:false,tid:0},
        {id: 3, name:'第三导师',unique: 'unique_3',checked:false,tid:0},
        {id: 4, name:'第四导师',unique: 'unique_4',checked:false,tid:0},
        {id: 5, name:'第五导师',unique: 'unique_5',checked:false,tid:0},
    ],  
    "teacher":[],
    loading:true,
    activeIndex:0,   /*该列是否被选中 */
    index:0,   /*正在选择调度导师在数组中的下标 */
    tRank:0,   /*正在选择的导师顺位*/
    tchids:[], /* 被选老师的学号 */
    id:null,  /*用户的学号 */
    stuName:null,      /*用户姓名 */
    college:null,  /* 用户学院 */
    result:[{rank:1, id:'',name:''},{rank:2, id:'',name:''},{rank:3, id:'',name:''},{rank:4, id:'',name:''},{rank:5, id:'',name:''}],    /* 结果集合数组*/
    checked:false,/*选中状态 */
    empty:true,  /*未选择任何导师 */
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.college)
    var that = this
    wx.getStorage({
      key: 'allTutor',
      success: function(res) {
        console.log('缓存')
        var list = res.data
        for (var i = 0; i < list.length; i++) {
          /* var object = new Object()
           object.reDirection = list[i].reDirection
           object.tchName = list[i].tchName
           object.teacherID = list[i].teacherID*/
          var str1 = "teacher[" + i + "].reDirection"
          var str2 = "teacher[" + i + "].tchName"
          var str3 = "teacher[" + i + "].teacherID"
          var str4 = "teacher[" + i + "].image_url"
          var str5 = "teacher[" + i + "].checked"
          that.setData({
            [str1]: list[i].reDirection,
            [str2]: list[i].tchName,
            [str3]: list[i].teacherID,
            [str4]: "images/t3.jpg",
            [str5]: false
          })
        }
      },
      fail: function(){
        wx.cloud.callFunction({
          name: 'getAllTotorByInstitute',
          data: {
            college: app.globalData.college
          },
          success: res => {
            console.log('云函数')
            wx.setStorage({
              key: 'allTutor',
              data: res.result.data, 
            })
            //console.log(res.result.data)
            /** 赋值操作 */
            var list = res.result.data
            for (var i = 0; i < list.length; i++) {
              /* var object = new Object()
               object.reDirection = list[i].reDirection
               object.tchName = list[i].tchName
               object.teacherID = list[i].teacherID*/
              var str1 = "teacher[" + i + "].reDirection"
              var str2 = "teacher[" + i + "].tchName"
              var str3 = "teacher[" + i + "].teacherID"
              var str4 = "teacher[" + i + "].image_url"
              var str5 = "teacher[" + i + "].checked"
              that.setData({
                [str1]: list[i].reDirection,
                [str2]: list[i].tchName,
                [str3]: list[i].teacherID,
                [str4]: "images/t3.jpg",
                [str5]: false
              })
            }
            //console.log(this.data.teacher)    
          },
          fail: res => {
            console.log('您不在服务范围，调回首页')
          }
        })
      }
    })
    
  },
  /**选中左栏的下标 */
  selectRank:function(e){
    var sub = e.currentTarget.dataset.index;
    this.setData({
      activeIndex:sub,
    })
  },
   /**checkbox的选择 */
  checkboxChange:function(e){
      var that = this;
      var rank = this.data.activeIndex;   /*导师顺位 */
      var id = e.detail.value[0];         /**导师的编号 */
      that.data.result[rank].id = id;

      /**按取消/选中的处理 */
      for(var i in this.data.teacher){
        /**按了取消 */
        if(id==null){
          for(var j in this.data.teacher){
            if (this.data.teacher[j].teacherID == this.data.tutorRank[rank].tid){
              this.data.teacher[j].checked = false;
              break;
            }
          }
          this.data.result[rank].name = '';
          this.data.result[rank].id = '';
          this.data.tutorRank[rank].checked = false;
          this.data.tutorRank[rank].tid = 0;
          break;
        }
        /**若导师被选中，则必须取消选中状态再重新选择 */
        if (id == this.data.teacher[i].teacherID){
          if(this.data.tutorRank[rank].checked){
            for(var t in this.data.teacher){
              if(this.data.teacher[t].id == this.data.tutorRank[rank].tid){
                this.data.teacher[t].checked = false;
                break;
              }
            }
          }
          this.data.result[rank].name = this.data.teacher[i].tchName;
          this.data.result[rank].id = id;
          this.data.tutorRank[rank].checked = true;
          this.data.tutorRank[rank].tid = id;
          this.data.teacher[i].checked = true;
          if(rank < 4){   /**左边栏自动下降一位 */
            rank += 1;
          }
          break;
        } 
      }
      /**判断是否还未开始选择 */
      for(var i in this.data.tutorRank){
          if(this.data.tutorRank[i].checked){
            this.data.empty = false;
            break;
          }
      }
      /*让页面重新渲染数据 */
      that.setData({
        result:this.data.result ,  
        activeIndex:rank,
        tutorRank:this.data.tutorRank,
        teacher:this.data.teacher,
        empty: this.data.empty,
    });
  },

  submitData:function(e){
    var that = this;
    if(!this.data.empty){
      wx.showModal({
        title: '提示',
        content: '是否确认提交',
        showCancel:true,                  //是否显示取消按钮，默认是 false
        success: function(res) {
          if (res.confirm) {
              //console.log('用户点击确定'), //将数据传回后台
              console.log(that.data.result); //传输的数据展示
              that.sendData(),           //发送数据到后台
              wx.showToast({            //暂时放在这里，以向前端展示效果
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                url:'./checkUser/checkUser',
              })
          } else if (res.cancel) {
              console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先选择导师后再提交',
        showCancel:false,
        success:function(res){
          return;
        }
      })
    }
  },
  sendData:function(){
    var that = this
    
    //var time = new Date()
    for (var i = 0; i < 5; i++){
      that.data.tchids.push(that.data.result[i].id)
    }
    //console.log(app.globalData.id)
    //console.log(that.data.result[].id)
    //console.log(new Date())
    wx.cloud.callFunction({
      name: 'select_tutor_stu',
      data: {
        selectTeacher: that.data.tchids,
        studentID: app.globalData.userID
    
        //uploadTime: time
      },
      success: res => {
        console.log('云函数调用成功')
        wx.removeStorage({
          key: 'temporary_results',
          success(res) {
            console.log('清除temporary_results缓存');

          }
        })
      },
      fail: res => {
        console.log('您不在服务范围，调回首页')
      }
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
    //console.log(1)
    var that = this
    //console.log(that.data.tchids)
    if (that.data.tchids.length != 0) {

      wx.cloud.callFunction({
        name: 'select_tutor_tch',
        data: {
          selectTeacher: that.data.tchids,
          studentID: app.globalData.userID
        },
        success: res => {
          console.log('调用成功')
        },
        fail: res => {
          console.log('调用失败')
        }
      })
    } else {
      console.log('222')
    }
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

  }
})