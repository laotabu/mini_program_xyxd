// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  //console.log(event.openid)
  if (event.status === "0") {
    return db.collection('student').where({
      openID: event.openid
    }).get()
  } else {
    return db.collection('teacher').where({
      openID: event.openid
    }).get()
  }
}