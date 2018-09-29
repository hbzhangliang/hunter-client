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
import webSocket from 'endportView/setting/webSocket'

import myTalent from 'endportView/talent/myTalent'
import myCandidate from 'endportView/talent/myCandidate'
import myLinkman from 'endportView/talent/myLinkman'
import myColdcall from 'endportView/talent/myColdcall'
import allTalent from 'endportView/talent/allTalent'
import allCandidate from 'endportView/talent/allCandidate'
import allLinkman from 'endportView/talent/allLinkman'
import allColdcall from 'endportView/talent/allColdcall'
import myTalentFaked from 'endportView/talent/myTalentFaked'
import allTalentFaked from 'endportView/talent/allTalentFaked'
import docTalent from 'endportView/talent/docTalent'

import myCompany from 'endportView/company/myCompany'
import myConCompany from 'endportView/company/myConCompany'
import myDevCompany from 'endportView/company/myDevCompany'
import mySignCompany from 'endportView/company/mySignCompany'
import myTerminalCompany from 'endportView/company/myTerminalCompany'
import shareCompany from 'endportView/company/shareCompany'
import shareConCompany from 'endportView/company/shareConCompany'
import shareDevCompany from 'endportView/company/shareDevCompany'
import shareSignCompany from 'endportView/company/shareSignCompany'
import shareTerminalCompany from 'endportView/company/shareTerminalCompany'
import myCompanyFaked from 'endportView/company/myCompanyFaked'
import allCompanyFaked from 'endportView/company/allCompanyFaked'
import docCompany from 'endportView/company/docCompany'

import myProject from 'endportView/project/myProject'


import errorPage from  'endportView/error'

Vue.use(Router)

// noinspection JSAnnotator
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
              component: errorPage
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
          {
              path:'webSocket',
              name:'webSocket',
              component:webSocket
          },




          //人才相关
          {
              path:'my-talent',
              name:'my-talent',
              component:myTalent
          },
          {
              path:'my-candidate',
              name:'my-candidate',
              component:myCandidate
          },
          {
              path:'my-linkman',
              name:'my-linkman',
              component:myLinkman
          },
          {
              path:'my-coldcall',
              name:'my-coldcall',
              component:myColdcall
          },
          {
              path:'all-talent',
              name:'all-talent',
              component:allTalent
          },
          {
              path:'all-candidate',
              name:'all-candidate',
              component:allCandidate
          },
          {
              path:'all-linkman',
              name:'all-linkman',
              component:allLinkman
          },
          {
              path:'all-coldcall',
              name:'all-coldcall',
              component:allColdcall
          },
          {
              path:'my-talentfaked',
              name:'my-talentfaked',
              component:myTalentFaked
          },
          {
              path:'all-talentfaked',
              name:'all-talentfaked',
              component:allTalentFaked
          },
          {
              path:'talent-doc*',
              name:'talent-doc',
              component:docTalent
          },




          {
              path:'my-company',
              name:'my-company',
              component:myCompany
          },
          {
              path:'my-con-company',
              name:'my-con-company',
              component:myConCompany
          },
          {
              path:'my-dev-company',
              name:'my-dev-company',
              component:myDevCompany
          },
          {
              path:'my-sign-company',
              name:'my-sign-company',
              component:mySignCompany
          },
          {
              path:'my-terminal-company',
              name:'my-terminal-company',
              component:myTerminalCompany
          },

          {
              path:'share-company',
              name:'share-company',
              component:shareCompany
          },
          {
              path:'share-con-company',
              name:'share-con-company',
              component:shareConCompany
          },
          {
              path:'share-dev-company',
              name:'share-dev-company',
              component:shareDevCompany
          },
          {
              path:'share-sign-company',
              name:'share-sign-company',
              component:shareSignCompany
          },
          {
              path:'share-terminal-company',
              name:'share-terminal-company',
              component:shareTerminalCompany
          },
          {
              path:'my-faked-company',
              name:'my-faked-company',
              component:myCompanyFaked
          },
          {
              path:'all-faked-company',
              name:'all-faked-company',
              component:allCompanyFaked
          },
          {
              path:'company-doc*',
              name:'company-doc',
              component:docCompany
          },





          {
              path:'my-project',
              name:'my-project',
              component:myProject
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
