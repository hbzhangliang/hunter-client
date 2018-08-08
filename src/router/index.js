import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/modules/hunter/base'
import firstPage from 'endportView/firstPage'
import test from 'endportView/test'
import test2 from 'endportView/test2'

import city from 'endportView/setting/city'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      name: 'base',
      component: Base,
      children:[
          {
              path: '1-1',
              name: '1-1',
              component: test
          },
          {
              path: '1-2',
              name: '1-2',
              component: test2
          },
          {
              path: 'main',
              name: 'main',
              component: firstPage
          },
        {
          path: 'firstPage',
          name: 'firstPage',
          component: firstPage
        },
          {
              path:'city',
              name:'city',
              component:city
          },
        {
          path: '*',
          redirect: '/base/firstPage'
        }
      ]
    },

    //common
    {
      path: '*',
      redirect: '/base/firstPage'
    }
  ]
})
