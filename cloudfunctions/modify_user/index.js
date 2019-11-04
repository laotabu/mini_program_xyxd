// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  if (event.status == 0) {
    try {
      if(event.id == 'studentID')
      {
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            studentID: event.item
          }
        })
      }
     
      else if (event.id == 'stuName') {
        console.log(event.id)
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            stuName: event.item,
          }
        })
      }
      else if (event.id == 'campus') {
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            campus: event.item,
          }
        })
      }

      else if (event.id == 'college') {
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            college: event.item,
          }
        })
      }
      
      else if (event.id == 'major') {
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            major: event.item,
          }
        })
      }
      else if (event.id == 'stuSex') {
        return await db.collection('student').where({
          openID: event.openID,
        }
        ).update({
          data: {
            stuSex: event.item,
          }
        })
      }
        else{
       
          console.log("参数异常")
        }
    } catch (e) {
      console.log(event.id)
      console.log(event.item)
      console.log(e);
      console.log("云函数modify异常");
    }
  }
   else {
    try {
      if (event.id == 'tchSex') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            tchSex: event.item,
          }
        })
        
      }
      
      else if (event.id == 'teacherID') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            teacherID: event.item,
          }
        })

      }
      else if (event.id == 'tchName') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            tchName: event.item,
          }
        })

      }
      else if (event.id == 'campus') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            campus: event.item,
          }
        })

      }
      else if (event.id == 'college') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            college: event.item,
          }
        })

      }

      else if (event.id == 'introduction') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            introduction: event.item,
          }
        })

      }
      else if (event.id == 'reDirection') {
        return await db.collection('teacher').where({
          openID: event.openID,
        }
        ).update({
          data: {
            reDirection: event.item,
          }
        })

      }
    } catch (e) {
      console.log(e);
      console.log("云函数modify异常");
    }
  }
}