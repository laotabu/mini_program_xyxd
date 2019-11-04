const app = getApp();
Page({

    data:{ 
        //userInfo: null,  
        //status: null, //身份
        id: null,    //学工号
        college: null, //院系
        isFinish:null,     //是否已结束选课
        //disable:false ,       //选导按钮的有效性
        status : null,
        //user : {}
      active: 2, //页面选中的下标 
    },
    goTutor: function () {
        wx.navigateTo({
          url: '../chooseTutor',
        })
      },
    /**
   * 生命周期函数--监听页面加载
   */
    goModify:function(){
      wx.navigateTo({
        url: '../../modify/modify',
      })
    },
 
    onLoad: function (options) {
      
     var that = this
      that.setData({
        id: app.globalData.userID,
        college: app.globalData.college,
        status: app.globalData.status,
        isFinish: app.globalData.resultDisplay
     })
      //console.log(that.data.isFinish)
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
      /*app.globalData.id = this.data.id
      app.globalData.college = this.data.college
      //app.globalData.id = this.data.id
      console.log(app.globalData.id)*/
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
  /*tabar切换*/
  onChange: function (event) {
    var n = event.detail;
    if (n == 0) {
      wx.switchTab({
        url: '../../home/home'  
      })
    } else if (n == 1) {
      wx.switchTab({
        url: '../../tutorInformation/tutorInformation'
      })
    } else if (n == 2) {
      wx.switchTab({
        url: '../../chooseTutor/checkUser/checkUser'
      })
    } else if (n == 3) {
      wx.switchTab({
        url: '../../myInformation/myInformation'
      })
    }
  }
})