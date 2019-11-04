var news_database = [{
    title: "标题一",
    desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    _from: "文字来源",
    date: "时间",
    etc: "其他信息",
    content: "     由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    postId: 0
  },
  {
    title: "标题二",
    desc: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    _from: "文字来源",
    date: "时间",
    etc: "其他信息",
    content: "     由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
    postId: 1
  },
]
var tutor_list = [{
  id: 1,
  name: "小李子",
  sex: "男",
  study: "C",
  number: 15,
  introduce: "这个老师不仅教的好，而且人很帅！",
  college: "计算机学院",
  collegeId: 1
}, {
  id: 2,
  name: "大罗",
  sex: "男",
  study: "C",
  number: 15,
  introduce: "这个老师不仅教的好，而且人很帅！",
  college: "环境学院",
  collegeId: 2
  }, {
    id: 3,
    name: "老赵",
    sex: "男",
    study: "C",
    number: 15,
    introduce: "这个老师不仅教的好，而且人很帅！",
    college: "计算机学院",
    collegeId: 1
  }, {
    id: 4,
    name: "小新",
    sex: "男",
    study: "C",
    number: 15,
    introduce: "这个老师不仅教的好，而且人很帅！",
    college: "环境学院",
    collegeId: 2
  }
]
var college_list = [{
    id: 1,
    name: "计算机学院",
    tutorList: [{
        id: 1,
        name: "小李子"
      },
      {
        id: 3,
        name: "老赵"
      }
    ]
  },
  {
    id: 2,
    name: "环境学院",
    tutorList: [{
        id: 2,
        name: "大罗"
      },
      {
        id: 4,
        name: "小新"
      }
    ]
  }
]
module.exports = {
  postList: news_database,
  tutorList: tutor_list,
  collegeList: college_list
}