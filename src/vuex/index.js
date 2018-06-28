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
    memberName:null
  },
  mutations,
  actions,
  getters,
  plugins:[createPersistedState()]
})


