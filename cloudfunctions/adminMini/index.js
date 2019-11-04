// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.options == "selectingDgutStu") {
    var lenth = event.information.length;
    console.log(lenth)
    try {
      for (var i = 0; i < lenth; i++){ 
            await db.collection('selecting_dgut_stu').add({
             data: {
               openID: event.information[i].openID,
               studentID: event.information[i].studentID,
               college: event.information[i].college,
               selectTeacher: [],
               uploadTime: null,
             },
              
           }) 
      }     
    } catch (e) {
      console.log(e);
      console.log("云函数miniCreateStuAndTch异常");
    }
  } 
  if (event.options == "selectingDgutTch") {
    var lenth = event.information.length;
    try {

      for (var i = 0; i < lenth; i++) { 
      await db.collection('selecting_dgut_tch').add({
        data: {
          openID: event.information[i].openID,
          teacherID: event.information[i].teacherID,
          college: event.information[i].college,
          selectedStudent: [],
        }
      })
      }
    } catch (e) {
      console.log(e);
      console.log("云函数miniCreateStuAndTch异常");
    }
  } 
  if (event.options == "modifyResultDisplay"){

    console.log("event.resultDisplay:" + event.resultDisplay)
    try {
      return await db.collection('control').doc('123456').update({
        data: {
          resultDisplay: event.resultDisplay,
        }
      })
    } catch (e) {
      console.log(e);
      console.log("云函数adminMini中的modifyResultDisplay异常");

    }
  }
  if (event.options == "modifyInputInformation") {

    console.log("event.inputInformation:" + event.inputInformation)
    try {
      return await db.collection('control').doc('123456').update({
        data: {
          inputInformation: event.inputInformation,
        }
      })
    } catch (e) {
      console.log(e);
      console.log("云函数adminMini中的modifyinputInformation异常");

    }
  }
}