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
