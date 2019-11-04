// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return db.collection('news').where({
      _id: event.id
    }).get().then(res => {
      db.collection('news').where({
        _id: event.id
      }).update({
        data: {
          numberOfViewers: _.inc(1)
        }
      });
      return res;
    })
    
  }catch(e){
      return e
    }
}