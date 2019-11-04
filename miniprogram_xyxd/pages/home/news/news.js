Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    //id: 0,
    news : null,
    isPlay : true, //图片展示 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var that = this;
    var util = require("../../../utils/util.js");
    wx.getStorage({
      key: id,
      success: function(res) {
        var date = util.formatDate(res.data.releaseTime);
        if (res.data.picture == ''){
          that.setData({
            isPlay:false
          })
        }
        that.setData({
          ["news.content"]: res.data.content,
          ["news.title"]: res.data.title,
          ["news.date"]: date,
          ["news.picture"]: res.data.picture,
          ["news.viewers"]: res.data.numberOfViewers
        })
      },
      fail : function(res){
        wx.cloud.callFunction({
            name:"getTheNews",
            data:{
              id : id,
            },
            success: res=>{
              var date = util.formatDate(res.result.data[0].releaseTime);
              res.result.data[0].numberOfViewers += 1;
              if (res.result.data[0].picture == ''){
                that.setData({
                  isPlay : false 
                })
              }
              that.setData({
                ["news.content"]: res.result.data[0].content,
                ["news.title"]: res.result.data[0].title,
                ["news.date"]: date,
                ["news.picture"]: res.result.data[0].picture,
                ["news.viewers"]: res.result.data[0].numberOfViewers
              })
              wx.setStorage({
                key: id,
                data: res.result.data[0],
              })
            },
            fail: err=>{
                console.log(err)
            }
        })
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