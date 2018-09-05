import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/modules/hunter/base'
import firstPage from 'endportView/firstPage'
import test from 'endportView/test'
import test2 from 'endportView/test2'

import city from 'endportView/setting/city'
import business from 'endportView/setting/business'
import career from 'endportView/setting/career'
import tag from 'endportView/setting/tag'
import dict from 'endportView/setting/dict'
import position from 'endportView/setting/position'
import team from 'endportView/setting/team'
import corp from 'endportView/setting/corp'
import account from 'endportView/setting/account'
import doc from 'endportView/setting/doc'
import calendar from 'endportView/setting/calendar'
import attachment from 'endportView/setting/attachment'


import allTalent from 'endportView/talent/allTalent'


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
              path:'business',
              name:'business',
              component:business
          },
          {
              path:'career',
              name:'career',
              component:career
          },
          {
              path:'tag',
              name:'tag',
              component:tag
          },
          {
              path:'dict',
              name:'dict',
              component:dict
          },
          {
              path:'position',
              name:'position',
              component:position
          },
          {
              path:'team',
              name:'team',
              component:team
          },
          {
              path:'corp',
              name:'corp',
              component:corp
          },
          {
              path:'account',
              name:'account',
              component:account
          },
          {
              path:'calendar',
              name:'calendar',
              component:calendar
          },
          {
              path:'doc',
              name:'doc',
              component:doc
          },
          {
              path:'attachment',
              name:'attachment',
              component:attachment
          },



          //人才相关
          {
              path:'all-talent',
              name:'all-talent',
              component:allTalent
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
