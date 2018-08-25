/**
 * Created by lenovo on 2017/10/16.
 */
const end = {}
end.arrSplice = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]; // splice返回当前数组中移除的函数
  return arr;
}
end.arrSort = (key) => {  // 数组对象根据key值排序
  return function (a, b) {
    var value1 = a[key];
    var value2 = b[key];
    return value1 - value2;
  }
}
end.changeTheme=(type)=>{
    var href="static/themes/"+type+"/style.css";
    $("#cssLink").attr("href",href);
}
end.setCookie=(objName,objValue,objHours)=>{
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
end.getCookie=(objName)=>{
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
}
end.removeCookie=(objName)=>{
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = objName + "=a; expires=" + date.toGMTString();
}


// 时间操作
end.getDate_YMDHMS=(timeStamp)=>{
    var now=new Date(timeStamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
end.getDate_YMDHM=(timeStamp)=>{
    var now=new Date(timeStamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 5);
}
end.getDate_YMD=(timeStamp)=>{
    var now=new Date(timeStamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) ;
}
end.getDate_HM=(timeStamp)=>{
    var now=new Date(timeStamp)
    return now.toTimeString().substr(0, 5);
}



export default end
