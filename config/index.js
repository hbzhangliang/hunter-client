// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    // env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',   // 打包出来后<link>或者<script>链接资源的路径
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    // env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
       // target: 'http://180.76.119.95:8060', // 设置你调用的接口域名和端口号 别忘了加http
        target:'http://127.0.0.1:8060',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
      // '/column': {
      //     //target: 'http://10.0.0.197:9006/', // 设置你调用的接口域名和端口号 别忘了加http
      //     target: 'http://10.0.10.206:9006/',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/column': '/'
      //     }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
