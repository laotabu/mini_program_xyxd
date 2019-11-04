// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 if(event.status == 0){ // 学生获取临时结果
   return db.collection('selecting_dgut_stu').field({
     selectTeacher: true
   }).where({
     studentID: event.studentID
     }).orderBy('uploadTime', 'desc').limit(1).get()
 } else if (event.status == 1){ // 老师获取临时结果
   return db.collection('selecting_dgut_tch')
     .aggregate()
     .unwind('$selectedStudent')
     .end()
 }else { // 管理员处理临时结果
   return db.collection('selecting_dgut_tch').field({
     selectedStudent: true,
     teacherID: true
   }).get()
 }
}