// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  //var index = event.selectTeacher.length
  //for (var i = 0; i< index; i++){
    //console.log(event.selectTeacher[i])
 
    return await db.collection('selecting_dgut_tch').where({
      teacherID: _.in(event.selectTeacher)  
    }).update({
      data: {
        selectedStudent: _.push(event.studentID)
      }
    })
  //}
}