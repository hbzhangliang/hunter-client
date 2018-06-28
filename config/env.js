'use strict';
module.exports = {
  dev: {
    NODE_ENV: '"development"',
    BASE_API: '"/api"',
    REDIRECT_URL:'"http://127.0.0.1:9060"'
  },
  demo: {
    NODE_ENV: '"demo"',
    BASE_API: '"https://mop-d6.ums86.com/api"',
    REDIRECT_URL:'"http://imop.demo61.ums86.com"'
  },
  test: {
    NODE_ENV: '"test"',
    BASE_API: '"https://mop-test61.ums86.com/api"',
    REDIRECT_URL:'"http://imop.test61.ums86.com"'
  },
  production: {
    NODE_ENV: '"production"',
    BASE_API: '"https://mop.ums86.com/api"',
    REDIRECT_URL:'"http://imop.ums86.com"'
  }
};
