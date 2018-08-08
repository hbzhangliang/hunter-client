// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/index'
import store from '../../vuex/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters'

import VueContextMenu from 'vue-contextmenu'

Vue.config.productionTip = false
import $ from 'jquery'
import VueCookie from 'vue-cookie'
window.jQuery = $;
window.$ = $;
$(function () {
    require('../../../static/qr/jquery-qrcode.js')
});
Vue.prototype.echarts = require('echarts')
Vue.use(ElementUI,VueCookie)

Vue.use(VueContextMenu)

/* eslint-disable no-new */
Object.keys(filters).forEach(function (key,index) {
  console.log(key)
  Vue.filter(key,filters[key])
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.filter('dateFromat', function (value) {
  if (!value) return ''
  value = new Date(value).Format("yyyy/MM/dd")
  return value;
})
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

