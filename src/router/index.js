import Vue from 'vue'
import Router from 'vue-router'
import styleConfig from 'endportView/endportCenter/styleConfig'
import pageConfig from 'endportView/endportCenter/pageConfig'

import Base from '@/modules/endPortManagement/base'
import AppManage from 'endportView/appManage/appManage'
import firstPage from 'endportView/firstPage'
import demo from 'endportView/learnDemo/index'
import optConfigElement from 'endportView/learnDemo/optConfigElement'
import redisServer from 'endportView/appOpenServer/redisServer'
import openServerItem from 'endportView/appOpenServer/OpenServerItem'
import openContentMng from 'endportView/endportCenter/OpenContentConfig'
import dataTerminal from 'endportView/statistics/terminal'
import bizData from 'endportView/statistics/bizData'
import bizInfo from 'endportView/statistics/bizInfo'
import sdkData from 'endportView/statistics/sdkData'
import sdkInfo from 'endportView/statistics/sdkInfo'
import eventData from 'endportView/statistics/eventData'
import eventInfo from 'endportView/statistics/eventInfo'
import eventSts from 'endportView/statistics/eventSts'
import userCompose from 'endportView/statistics/userCompose'
import coreUser from 'endportView/sysMng/coreUser'
import coreRole from 'endportView/sysMng/coreRole'
import coreAcl from 'endportView/sysMng/coreAcl'
import mngAcl from 'endportView/sysMng/mngAcl'
import coreMenu from 'endportView/sysMng/coreMenu'
import auth1 from 'endportView/authMng/auth1'
import auth2 from 'endportView/authMng/auth2'
import auth3 from 'endportView/authMng/auth3'
import auth4 from 'endportView/authMng/auth4'
import auth5 from 'endportView/authMng/auth5'
import auth6 from 'endportView/authMng/auth6'
import corpTerminal from 'endportView/corpAppMng/corpTerminal'
import corpApplist from 'endportView/corpAppMng/corpApplist'
import corpWorkbenchList from 'endportView/corpAppMng/corpWorkbenchList'
import corpWorkbenchConf from 'endportView/corpAppMng/corpWorkbenchConf'
import corpTemplate from 'endportView/workBench/corpTemplate'
import corpFileUpload from 'endportView/corpAppMng/corpFileUpload'

import createContent from 'endportView/contentColumn/creatContent'
import editContent from 'endportView/contentColumn/editContent'
import mobilePreview from 'endportView/contentColumn/mobilePreview'
import createColumn from 'endportView/contentColumn/createColumn'
import updateColumn from 'endportView/contentColumn/updateColumn'
import columnList from 'endportView/contentColumn/columnList'
import columnListApp from 'endportView/contentColumn/columnListApp'
import contentList from 'endportView/contentColumn/contentList'
import columnContentList from 'endportView/contentColumn/columnContentList'

import PackagePage from 'endportView/corpAppMng/packagePage'
import NewTheme from 'endportView/commonSourceManage/newTheme'
import NewIndustryDefaultConfig from 'endportView/commonSourceManage/newIndustryDefaultConfig'
import VersionManage from 'endportView/appManage/versionManage'
import GrayLevelPublic from 'endportView/appManage/grayLevelPublic'
import AppVersionPublish from 'endportView/appManage/appVersionPublish'
import CompanyList from 'endportView/companyManage/companyList'
import CompanyAppManage from 'endportView/companyManage/companyAppManage'
//structureApp
import StructureApp from 'endportView/structure/structureApp'
import ReStructureApp from 'endportView/structure/reStructureApp'
//taskManage
import TaskManage from 'endportView/endportCenter/taskManage'
//appManageList
import AppManageList from 'endportView/appManage/appManageList'
//appManageSummary
import AppManageSummary from 'endportView/appManage/appManageSummary'
//appConfig
import AppConfig from 'endportView/appManage/appConfig'
//footerMenu
import FooterMenu from 'endportView/appManage/footerMenu'
//ModifyConfiguration
import ModifyConfiguration from 'endportView/appManage/modifyConfiguration'
//themeStyle
import ThemeStyle from 'endportView/appManage/themeStyle'
//mySetting
import MySetting from 'endportView/appManage/mySetting'
//WorkbenchConfig
// import WorkbenchConfig from 'endportView/workBench/workbenchList'
// import WorkbenchConfig2 from 'endportView/appManage/workBench/workBenchList'

import WorkbenchConfig from 'endportView/appManage/workBench/workBenchConfig'

import WorkbenchConfig2 from 'endportView/appManage/workBench/workBenchList'

// import WorkbenchConfig3 from 'endportView/appManage/workBench/workBenchConfig'


import moduleList  from 'endportView/workBench/moduleList'

//appDataStatics
import AppDataStatics from 'endportView/appManage/appDataStatics'
//commonSource
import TemplateLibrary from 'endportView/commonSourceManage/templateLibrary'
import NewTemplate from 'endportView/commonSourceManage/newTemplate'
import ThemeTemplateLibrary from 'endportView/commonSourceManage/themeTemplateLibrary'
import IndustryList from 'endportView/commonSourceManage/industryList'

import deviceMng from 'endportView/statistics/deviceMng'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      name: 'base',
      component: Base,
      children:[
          {
              path: 'corp_workBench',
              name: 'corp_workBench',
              component: WorkbenchConfig2
          },
          {
              path: 'corp_workBenchConfig',
              name: 'corp_workBenchConfig',
              component: WorkbenchConfig
          },
        // {
        //     path: 'corp_workBench',
        //     name: 'corp_workBench',
        //     component: WorkbenchConfig2
        // },
        {
          path: 'firstPage',
          name: 'firstPage',
          component: firstPage
        },
        {
          path: 'styleConfig',
          name: 'styleConfig',
          component: styleConfig
        },
        {
          path: 'pageConfig',
          name: 'pageConfig',
          component: pageConfig
        },
        {
          path: 'optConfigElement',
          name: 'optConfigElement',
          component: optConfigElement
        },
        {
          path: 'openContent',
          name: 'openContent',
          component: openContentMng
        },
        {
          path: 'demo',
          name: 'demo',
          component: demo
        },
        {
          path: 'redisServer',
          name: 'redisServer',
          component: redisServer
        },
        {
          path: 'data_terminal',
          name: 'data_terminal',
          component: dataTerminal
        },
        {
          path: 'biz_data',
          name: 'biz_data',
          component: bizData
        },
        {
          path: 'biz_info',
          name: 'biz_info',
          component: bizInfo
        },
        {
          path: 'sdk_data',
          name: 'sdk_data',
          component: sdkData
        },
        {
          path: 'sdk_info',
          name: 'sdk_info',
          component: sdkInfo
        },
        {
          path: 'event_data',
          name: 'event_data',
          component: eventData
        },
        {
          path: 'event_info',
          name: 'event_info',
          component: eventInfo
        },
        {
          path: 'event_sts',
          name: 'event_sts',
          component: eventSts
        },
        {
          path: 'user_compose',
          name: 'user_compose',
          component: userCompose
        },
        {
          path: 'core_user',
          name: 'core_user',
          component: coreUser
        },
        {
          path: 'core_role',
          name: 'core_role',
          component: coreRole
        },
        {
          path: 'core_acl',
          name: 'core_acl',
          component: coreAcl
        },
        {
          path: 'mng_acl',
          name: 'mng_acl',
          component: mngAcl
        },
        {
          path: 'core_menu',
          name: 'core_menu',
          component: coreMenu
        },

          {
              path: 'device_mng',
              name: 'device_mng',
              component: deviceMng
          },

        {
          path: 'auth_1',
          name: 'auth_1',
          component: auth1
        },
        {
          path: 'auth_2',
          name: 'auth_2',
          component: auth2
        },
        {
          path: 'auth_3',
          name: 'auth_3',
          component: auth3
        },
        {
          path: 'auth_4',
          name: 'auth_4',
          component: auth4
        },
        {
          path: 'auth_5',
          name: 'auth_5',
          component: auth5
        },
        {
          path: 'auth_6',
          name: 'auth_6',
          component: auth6
        },

        {
          path: 'corp_terminal',
          name: 'corp_terminal',
          component: corpTerminal
        },
        {
          path: 'corp_applist',
          name: 'corp_applist',
          component: corpApplist
        },
        {
          path: 'corp_workbenchlist',
          name: 'corp_workbenchlist',
          component: corpWorkbenchList
        },
        {
          path: 'corp_workbenchconf',
          name: 'corp_workbenchconf',
          component: corpWorkbenchConf
        },
        {
          path: 'companyAppManage',
          name: 'companyAppManage',
          component: CompanyAppManage
        },
        {
          path: 'packagePage',
          name: 'packagePage',
          component: PackagePage
        },
        {
          path: 'corp_template',
          name: 'corp_template',
          component: corpTemplate
        }, {
          path: 'corp_fileupload',
          name: 'corp_fileupload',
          component: corpFileUpload
        }, {
          path: 'newTheme',
          name: 'newTheme',
          component: NewTheme
        }, {
          path: 'newIndustryDefaultConfig',
          name: 'newIndustryDefaultConfig',
          component: NewIndustryDefaultConfig
        },
        // structureApp
        {
          path: 'structureApp',
          name: 'structureApp',
          component: StructureApp
        },
        //taskManage
        {
          path:'taskManage',
          name:'taskManage',
          component:TaskManage
        },
        {
          path:'companyList',
          name:'companyList',
          component:CompanyList
        },
        {
          path:'appManageList',
          name:'appManageList',
          component:AppManageList
        },
        {
          path:'templateLibrary',
          name:'templateLibrary',
          component:TemplateLibrary
        },
        {
          path:'newTemplate',
          name:'newTemplate',
          component:NewTemplate
        },
        {
          path:'themeTemplateLibrary',
          name:'themeTemplateLibrary',
          component:ThemeTemplateLibrary
        },
        {
          path: 'industryList',
          name: 'industryList',
          component: IndustryList
        },
        {
          path: 'createContent',
          name: 'createContent',
          component: createContent
        },
        {
            path: 'editContent',
            name: 'editContent',
            component: editContent
        },
        {
          path: 'mobilePreview',
          name: 'mobilePreview',
          component: mobilePreview
        },
        {
          path: 'createColumn',
          name: 'createColumn',
          component: createColumn
        },
        {
          path: 'updateColumn',
          name: 'updateColumn',
          component: updateColumn
        },
        {
          path: 'columnList',
          name: 'columnList',
          component: columnList
        },
        {
          path: 'columnListApp',
          name: 'columnListApp',
          component: columnListApp
        },
        {
          path: 'contentList',
          name: 'contentList',
          component: contentList
        },
         {
          path: 'columnContentList',
          name: 'columnContentList',
          component: columnContentList
        },
        {
          path: '*',
          redirect: '/base/firstPage'
        }
      ]
    },

    {
      path:'/appManage',
      name:'appManage',
      component:AppManage,
      children:[
        {
          path:'appManageSummary',
          name:'appManageSummary',
          component:AppManageSummary
        },{
          path: 'versionManage',
          name: 'versionManage',
          component: VersionManage
        },{
          path: 'grayLevelPublic',
          name: 'grayLevelPublic',
          component: GrayLevelPublic
        },{
          path: 'appVersionPublish',
          name: 'appVersionPublish',
          component: AppVersionPublish
        },
        {
          path:'appConfig',
          name:'appConfig',
          component:AppConfig,
          children:[
            {
              path:'modifyConfiguration',
              name:'modifyConfiguration',
              component:ModifyConfiguration
            },
            {
              path:'workbenchConfig',
              name:'workbenchConfig',
              component:WorkbenchConfig
            },
            {
                path:'moduleList',
                name:'moduleList',
                component:moduleList
            },
            {
              path:'footerMenu',
              name:'footerMenu',
              component:FooterMenu
            },
            {
              path:'themeStyle',
              name:'themeStyle',
              component:ThemeStyle
            },
            {
              path:'mySetting',
              name:'mySetting',
              component:MySetting
            },
          ]
        },
        {
          path: 'reStructureApp',
          name: 'reStructureApp',
          component: ReStructureApp
        },
        {
          path: 'appDataStatics',
          name: 'appDataStatics',
          component: AppDataStatics
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
