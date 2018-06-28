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
export default end
