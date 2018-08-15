/**
 * Created by lenovo on 2017/9/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';
import getters from './getter';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  // 应用初始状态
  // namespaced: true,
  state: {
    workIconType: [],  // 所有业务图标
    endDictGroupData: '',  // 获取所有业务配置
    endSelfModuleData: '',
    spId:'',//17101413335140026521
    companyInfo:null,
    appId:'',
    configEditStatus : false,//用户设置企业自定义面板编辑状态 true:禁用 false:启用
    commonApp:false,//spId&commonApp联合管理app管理页面左侧菜单栏的显示
    appSummaryInfo:{
      icon:''
    },
    memberId:null,
    memberName:null,
    //start
      leftMenuCollapse:false,
      //所有的菜单项
      menus:[
          {key:"main",label:"主页",router:"base/firstPage"},
          {key:"1-1",label:"第一个页面页面",router:"base/1-1"},
          {key:"1-2",label:"第二个页面页面",router:"base/1-2"},
          {key:"1-3",label:"第三个页面页面",router:"base/1-3"},
          {key:"city",label:"城市设置",router:"base/city"},
          {key:"business",label:"行业设置",router:"base/business"},
          {key:"career",label:"职能设置",router:"base/career"},
          {key:"calendar",label:"我的日历",router:"base/calendar"}
          ],
      //选择到tab中的数据
      options:[{key:"main",label:"主页",router:"base/firstPage"}],
      editableTabsValue:"main",//当前编辑项
      activeMenuContent:"menu_user",
      userInfo:null
  },
  mutations,
  actions,
  getters,
  plugins:[createPersistedState()]
})


