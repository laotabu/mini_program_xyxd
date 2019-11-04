// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  
  var pageIndex = event.pageIndex;   //页码，默认第一页
  var pageSize =  3; // 每一页的数据条数，默认4条
  const countResult = await db.collection('news').count();  //获取记录数
  const total = countResult.total;   //获取记录数
  const totalPage = Math.ceil(total/3);    /*页数*/
  var hasMore ;   //前端提示是否还有数据

  if (pageIndex > totalPage || pageIndex == totalPage){
    hasMore = false 
  }else{
    hasMore = true
  }
  try{
    //返回结果给前端
    return db.collection('news').skip((pageIndex-1)*pageSize).limit(pageSize).field({
      picture: true,
      title : true,
      author: true,
      releaseTime :true,
      }).orderBy('releaseTime','desc').get().then(res => {
        res.hasMore = hasMore;
        return res;
      })
  }catch(e){
      console.log(e);
  }
}