// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  //console.log(event)
  for (var i = 0; i < event.arr.length;i++){
   await db.collection('selecting_dgut_tch').where({
    teacherID: event.arr[i].teacherID
  }).update({
    data: {
      selectedStudent: event.arr[i].selectedStudent
    }
  })
  }
}