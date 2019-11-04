const util = require("../../utils/util.js");
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../static/images/DGUT.png',
      '../../static/images/playground.jpg',
      '../../static/images/lib.jpg',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2500,
    duration: 800,

    hasMore: false, //判断是否还有新闻未展示出来
    pageIndex: 1, //当前页面 
    isPlay:[],   //是否展示图片
    news: [], 
    active: 0,
    isScroll:true,
  },
  initPage:function(){
    var that = this 
  
    wx.cloud.callFunction({
      name: 'getNews',
      data:{
       pageIndex: that.data.pageIndex,
      },
      success: res => {
        for (var i = 0; i < res.result.data.length; i++) {
        res.result.data[i].releaseTime = util.formatDate(res.result.data[i].releaseTime)
         }
        that.setData({
          news: res.result.data,
          hasMore: res.result.hasMore
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /*点击新闻事件*/
  bindNews: function (e) {

    var id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../home/news/news?id=' + id,
    })
  },

  /*点击警告信息事件*/
  bindWarn: function (e) {
    wx.navigateTo({
      url: '../home/warn/warn?id=' + e.target.id
    })
  },

  /*tabar切换*/
  onChange: function (event) {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     wx.hideTabBar();
     this.initPage(); 
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.initPage();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(this.data.hasMore){
      wx.cloud.callFunction({
        name:'getNews',
        data:{
            pageIndex : that.data.pageIndex+1
        },
        success: res=>{
          for (var i = 0; i < res.result.data.length; i++) {
            res.result.data[i].releaseTime = util.formatDate(res.result.data[i].releaseTime)
          }
          
          that.setData({
            news: that.data.news.concat(res.result.data),
            hasMore: res.result.hasMore
          })
        }

      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})