//app.js

App({
 
  onLaunch: function () {
    if (!wx.cloud) {
    console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    },
  globalData: {
    //userInfo: null,
    //status: null, // 身份
    //id : null,// 学工号
    //college: null, // 院系
    //isFinish : true // 是否选导结束
    //inputInformation: true
  }

})