'use strict';
module.exports = {
  dev: {
    NODE_ENV: '"development"',
    BASE_API: '"api"'
  },
  demo: {
    NODE_ENV: '"demo"',
    BASE_API: '"https://mop-d6.ums86.com/api"'
  },
  test: {
    NODE_ENV: '"test"',
    BASE_API: '"https://mop-test61.ums86.com/api"'
  },
  production: {
    NODE_ENV: '"production"',
    BASE_API: '"http://180.76.119.95:8081/api"'
  }
};
