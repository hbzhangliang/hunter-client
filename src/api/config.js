/**
 * Created by lenovo on 2017/10/16.
 */
export default process.env.NODE_ENV === 'development' ? {
  // 开发环境
  host: '/api' // 使用代理
} : {
  // 发布环境
  // host: 'http://10.0.0.197:9006' // 上海

    //本地调试环境
     host:'http://127.0.0.1:8060'  //本地环境调试
    // host: 'https://mop-test61.ums86.com/api'
    //正式环境
    //host: 'https://mop.ums86.com/api'
}
