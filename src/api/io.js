/**
 * Created by lenovo on 2017/10/16.
 */
import axios from 'axios'
const io = axios.create(
  {
    withCredentials: true,
      timeout: 5000
   // headers: {'Content-Type': 'application/json;charset=utf-8'}
  })
io.interceptors.request.use((config) => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, (error) => {
  return Promise.reject(error)
})
io.interceptors.response.use((response) => {
  // console.log(response, 'res')
  response.headers['content-type'] = 'application/json;charset=UTF-8'
  if (response.data.resCode === '0' || response.data.code === 200){
    console.log(response.data)
    return response.data.data
  }else{
    return Promise.reject(response.data)
  }
}, (error) => {
  // 400 参数错误
  // 401 未登录
  try {
    switch (error.response.status) {
      case 401: {
        // let hostname = window.location.hostname
        // let hostArr = hostname.split('.')
        // hostArr.splice(0, 1)
        // let domain = hostArr.join('.')
        // let loginUrl = domain === 'test61.ums86.com' ? 'http://open-client.test61.ums86.com/#/login' : '/client/index/index.html#/login'
        setTimeout(() => { window.location.href = '#/firstPage' }, 2000)
        return Promise.reject(error.response.data.errmsg || error.response.data.message)
      }
      default:
        return Promise.reject(error.response.data.errmsg || error.response.data.message)
    }
  } catch (e) {
    if(e.name=='TypeError') {
        return Promise.reject(new Error('抱歉！操作超时，请重新登录'))
    }
    else{
        return Promise.reject(new Error('服务器无响应').message)
    }
  }
})

export default io
