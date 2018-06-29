import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/modules/endPortManagement/base'
import firstPage from 'endportView/firstPage'

import test from 'endportView/test'

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
              name: 'test',
              component: test
          },
        {
          path: 'firstPage',
          name: 'firstPage',
          component: firstPage
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
