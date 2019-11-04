// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 if(event.options == "adminAdd")
 {
   try {
     return await db.collection('result_dgut').add({
       data: {
         teacherID: event.teacherID,
         tchName: event.tchName,
        
         studentID: event.studentID,
         studentName: event.stuName,
       }
     })
   } catch (e) {
     console.log(e);
     console.log("云函数adminUpdate异常");
   }
 } 
 else  if (event.options == "adminDelete") {
   console.log("teacherID:"+event.teacherID)
   console.log("event.studentID:" + event.studentID)
    try {
            return await db.collection('result_dgut').where({
        teacherID:event.teacherID,
      }).where({
        studentID: event.studentID,
      })
      .remove()
    } catch (e) {
      console.log(e);
      console.log("云函数adminUpdate中的adminDelete异常");
    }
  }
  
 else if (event.options == "adminModify") {
   console.log("teacherID:" + event.teacherID)
   console.log("event.studentID:" + event.studentID)
   try {
     return await db.collection('result_dgut').where({
       teacherID: event.teacherID,
     }).where({
       studentID: event.studentID,
     }).update({
       data:{
        teacherID:event.teacherID,
        studentID:event.studentID2,
        studentName:event.studentName,
       }
     })
   } catch (e) {
     console.log(e);
     console.log("云函数adminUpdate中的adminDelete异常");
   }
 }


}