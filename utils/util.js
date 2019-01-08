// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join(split || '')
}

// 两位数自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 两位数以内的数字自动补零
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 计算变化多少天后的日期
function DateAddDay(d, days) {
  // console.log('2222', new Date(d.setDate(d.getDate() + days)));
  var d = new Date(d);
  return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {
  var d = new Date(d);
  // var oToday = d.getTime()
  console.log('d数据', d, d.getDay())
  return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
  var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
  return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

// 时间戳转换为日期格式
function getDate(val, str) {
  if (!val) return
  var d = new Date()
  d.setTime(val)
  var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
  let y = d.getFullYear()
  let m = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1) // 获取当前月份的日期，不足10补0
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate() // 获取当前几号，不足10补0
  let commonTime = ''
  if (str) {
    commonTime = hour + ':' + minute
  } else {
    commonTime = y + '-' + m + '-' + day + '      ' + hour + ':' + minute
  }
  return commonTime
}
// 时间戳转换为月日
function getMonthday(val) {
  if (!val) return
  var d = new Date()
  d.setTime(val)
  let m = (d.getMonth() + 1) // 获取当前月份的日期，不足10补0
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate() // 获取当前几号，不足10补0
  let commonTime = m + '月' + day + '日'
  return commonTime
}
// 时间戳转换为星期
function getWeekday(val) {
  if (!val) return
  var d = new Date()
  d.setTime(val)
  let y = d.getFullYear()
  let m = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1) // 获取当前月份的日期，不足10补0
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate() // 获取当前几号，不足10补0
  let commonTime = y + '-' + m + '-' + day
  commonTime = new Date(commonTime)
  let week = ''
  switch (commonTime.getDay()) {
    case 0:
      week = '周日'
      break;
    case 1:
      week = '周一'
      break;
    case 2:
      week = '周二'
      break;
    case 3:
      week = '周三'
      break;
    case 4:
      week = '周四'
      break;
    case 5:
      week = '周五'
      break;
    case 6:
      week = '周六'
      break;
    default:
      break;
  }
  return week
}
function getWeek(val) {
  let week = ''
  switch (val) {
    case 1:
      week = '周一'
      break;
    case 2:
      week = '周二'
      break;
    case 3:
      week = '周三'
      break;
    case 4:
      week = '周四'
      break;
    case 5:
      week = '周五'
      break;
    case 6:
      week = '周六'
      break;
    case 7:
      week = '周日'
      break;
    default:
      break;
  }
  return week
}
function getWeekArry(week){
  var weekUl = "";
  var weekdata = {};
  var weekdataArry=[];
  if(week){
  for (var x = 0; x < week.length; x++) {
    var str = "";
    if (week[x].week == 7) {
      str = "周日";
    } else if (week[x].week == 1) {
      str = "周一";
    } else if (week[x].week == 2) {
      str = "周二";
    } else if (week[x].week == 3) {
      str = "周三";
    } else if (week[x].week == 4) {
      str = "周四";
    } else if (week[x].week == 5) {
      str = "周五";
    } else if (week[x].week == 6) {
      str = "周六";
    }

    var beginTimeArry = week[x].beginTime.split(':');
    var endTimeArry = week[x].endTime.split(':');
    var beginTime = beginTimeArry[0] + ":" + beginTimeArry[1];
    var endTime = endTimeArry[0] + ":" + endTimeArry[1];
    // var time = week[x].beginTime + '-' + week[x].endTime;
    var time = beginTime + '-' + endTime;
    if (weekdata[time]) {
      var timeweek = weekdata[time];
      weekdata[time] = timeweek + '、' + str;
    } else {
      weekdata[time] = str;
    }
    }
  }
  if(weekdata){
    for(var i in weekdata){
      var weekObj={};
      weekObj.weekStr = weekdata[i];
      weekObj.weekTime = i;
      weekdataArry.push(weekObj);
    }
  }
  return weekdataArry;
}
// 时间戳转换为时分
function getHourMinutes(val) {
  if (!val) return
  var d = new Date()
  d.setTime(val)
  var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  let commonTime = hour + ':' + minute
  return commonTime
}
// 获取每一个月的太难书
function getMonDay(year, month) {
  var date = new Date()
  if (year) {
    year = year
  } else {
    year = date.getFullYear()
  }
  var d = new Date(year, month, 0)
  return d.getDate()
}
// 获取下一月的月份
function getNextMonth() {
  var year = new Date().getFullYear() //获取当前日期的年份
  var month = new Date().getMonth() + 1 //获取当前日期的月份
  var day = new Date().getDate() //获取当前日期的日
  var days = new Date(year, month, 0)
  days = days.getDate() //获取当前日期中的月的天数
  var year2 = year
  var month2 = parseInt(month) + 1
  if (month2 == 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  var t2 = {
    year: year2,
    month: month2
  }
  return t2
}

function isApiResponseOk(response) {
  return response && response.errorCode === 0
}

// 获取某一天的起始时间和结束时间
function getTime(date) {
  var formate1 = date + ' 00:00:00'
  var formate2 = date + ' 23:59:59'
  var startTime = new Date(formate1).getTime()
  var endTime = new Date(formate2).getTime()
  var dateFormate = {
    startTime: startTime,
    endTime: endTime
  }
  return dateFormate
}
function calDate(endTimeStr) {
  let newTime = new Date().getTime();
  let endTime = new Date(endTimeStr).getTime();
  let obj = null;
  // 如果活动未结束，对时间进行处理
  if (endTime - newTime > 0) {
    let time = (endTime - newTime) / 1000;
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    obj = {
      day: timeFormat(day),
      hou: timeFormat(hou),
    }
  }
  return obj;
};

function timeFormat(param) {//小于10的格式化函数
  return param < 10 ? '0' + param : param;
};

// ymd 参数 进行格式化 事件   例如：2019-1-1 转换为 2019/01/01  格式
// function formatTime2(ymd) {
//  var ymdstr = '';
//   if (ymd) {
//     var ymdArry = ymd.split('-');
//     ymdstr = ymdArry[0].trim() + '/' + ymdArry[1].trim() + '/' + ymdArry[2].trim();
//     ymdstr = ymdstr.substring(0,10)
//   }
//   return ymdstr;
// }

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  DateAddDay: DateAddDay,
  FirstDayInThisWeek: FirstDayInThisWeek,
  type: Type,
  addZero: formatNumber,
  getDate: getDate,
  getMonDay: getMonDay,
  getNextMonth: getNextMonth,
  isApiResponseOk: isApiResponseOk,
  getWeekday: getWeekday,
  getWeek: getWeek,
  getHourMinutes: getHourMinutes,
  getMonthday: getMonthday,
  getTime: getTime,
  getWeekArry: getWeekArry,
  calDate: calDate,
  // formatTime2: formatTime2
}