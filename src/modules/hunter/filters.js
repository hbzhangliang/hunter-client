/**
 * Created by chunmingdeng on 2018/3/22.
 */
export function formatTime (value,fmt) {
  var fmt = fmt?fmt:'yyyy-MM-dd hh:mm:ss'
  var date = new Date(value)
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  if(date=='Invalid Date'){
    return value;
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export function numberFormat(value,fmt) {
  var str = value.toString(),
    strArr = str.split('').reverse(),
    tempArr=[]
  for(var i=0;i<strArr.length;i++){
      if(i%3==0&&i!=0){
        tempArr.push(strArr[i]+',');
        continue;
      }
      tempArr.push(strArr[i]);
  }
  return tempArr.reverse().join('');
}