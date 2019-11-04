// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


const db = cloud.database()
//const _ = db.command()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('teacher').field({
    tchName: true,
    teacherID: true,
    reDirection: true

  }).where({
    college: event.college
  }).get()
}