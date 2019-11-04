var app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatDate = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

// 暂时以2019年算起,且每年按365天来估算，每月按30天来估算
const changeToSecondsBy2019 = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  //console.log(year-2019)
  return (year - 2019) * 365 * 24 * 3600 + month * 30 * 24 * 3600 + day * 24 * 3600 +  hour * 3600 + minute * 60 + second
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  changeToSecondsBy2019: changeToSecondsBy2019
  //'对外方法名': '本地方法名'

}
