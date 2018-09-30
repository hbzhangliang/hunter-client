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
          {key:"error",label:"页面建设中",router:"base/error"},
          {key:"1-1",label:"第一个页面页面",router:"base/1-1"},
          {key:"1-2",label:"第二个页面页面",router:"base/1-2"},
          {key:"1-3",label:"第三个页面页面",router:"base/1-3"},
          {key:"city",label:"城市设置",router:"base/city"},
          {key:"business",label:"行业设置",router:"base/business"},
          {key:"career",label:"职能设置",router:"base/career"},
          {key:"tag",label:"标签管理",router:"base/tag"},
          {key:"dict",label:"字典项管理",router:"base/dict"},
          {key:"position",label:"职位管理",router:"base/position"},
          {key:"team",label:"团队管理",router:"base/team"},
          {key:"corp",label:"企业管理",router:"base/corp"},
          {key:"account",label:"用户管理",router:"base/account"},
          {key:"calendar",label:"我的日历",router:"base/calendar"},
          {key:"doc",label:"共享文件夹",router:"base/doc"},
          {key:"attachment",label:"附件处理",router:"base/attachment"},
          {key:"webSocket",label:"webSocket",router:"base/webSocket"},

          //人才页面
          {key:"my-talent",label:"所有人才",router:"base/my-talent"},
          {key:"my-candidate",label:"我的候选人",router:"base/my-candidate"},
          {key:"my-linkman",label:"客户联系人",router:"base/my-linkman"},
          {key:"my-coldcall",label:"cold call",router:"base/my-coldcall"},

          {key:"all-talent",label:"所有人才",router:"base/all-talent"},
          {key:"all-candidate",label:"我的候选人",router:"base/all-candidate"},
          {key:"all-linkman",label:"客户联系人",router:"base/all-linkman"},
          {key:"all-coldcall",label:"cold call",router:"base/all-coldcall"},

          {key:"my-talentfaked",label:"我删除的",router:"base/my-talentfaked"},
          {key:"all-talentfaked",label:"所有删除",router:"base/all-talentfaked"},

          {key:"talent-doc6",label:"111",router:"base/talent-doc*"},
          {key:"talent-doc7",label:"222",router:"base/talent-doc*"},
          {key:"talent-doc8",label:"333",router:"base/talent-doc*"},
          {key:"talent-doc9",label:"共享111",router:"base/talent-doc*"},
          {key:"talent-doc10",label:"共享222",router:"base/talent-doc*"},

          //公司
          {key:"my-company",label:"所有公司",router:"base/my-company"},
          {key:"my-con-company",label:"普通公司",router:"base/my-con-company"},
          {key:"my-dev-company",label:"开发中客户",router:"base/my-dev-company"},
          {key:"my-sign-company",label:"已签约客户",router:"base/my-sign-company"},
          {key:"my-terminal-company",label:"终止合作",router:"base/my-terminal-company"},

          {key:"share-company",label:"所有公司",router:"base/share-company"},
          {key:"share-con-company",label:"普通公司",router:"base/share-con-company"},
          {key:"share-dev-company",label:"开发中客户",router:"base/share-dev-company"},
          {key:"share-sign-company",label:"已签约客户",router:"base/share-sign-company"},
          {key:"share-terminal-company",label:"终止合作",router:"base/share-terminal-company"},

          {key:"my-faked-company",label:"我删除的",router:"base/my-faked-company"},
          {key:"all-faked-company",label:"所有删除",router:"base/all-faked-company"},

          {key:"company-doc11",label:"公司001",router:"base/company-doc*"},
          {key:"company-doc12",label:"公司002",router:"base/company-doc*"},
          {key:"company-doc13",label:"公司003",router:"base/company-doc*"},
          {key:"company-doc14",label:"共享公司a",router:"base/company-doc*"},
          {key:"company-doc15",label:"共享公司b",router:"base/company-doc*"},

          //项目页面
          {key:"my-project",label:"所有项目",router:"base/my-project"},
          {key:"my-process-project",label:"进展中的",router:"base/my-process-project"},
          {key:"my-success-project",label:"已成功的",router:"base/my-success-project"},
          {key:"my-pause-project",label:"暂停的",router:"base/my-pause-project"},
          {key:"my-noEffective-project",label:"失效的",router:"base/my-noEffective-project"},
          {key:"my-canceled-project",label:"已取消",router:"base/my-canceled-project"},

          {key:"pt-project",label:"所有项目",router:"base/pt-project"},
          {key:"pt-process-project",label:"进展中的",router:"base/pt-process-project"},
          {key:"pt-success-project",label:"已成功的",router:"base/pt-success-project"},
          {key:"pt-pause-project",label:"暂停的",router:"base/pt-pause-project"},
          {key:"pt-noEffective-project",label:"失效的",router:"base/pt-noEffective-project"},
          {key:"pt-canceled-project",label:"已取消",router:"base/pt-canceled-project"},

          {key:"my-faked-project",label:"我删除的",router:"base/my-faked-project"},
          {key:"all-faked-project",label:"所有删除",router:"base/all-faked-project"},

          {key:"project-doc16",label:"项目001",router:"base/project-doc*"},
          {key:"project-doc17",label:"项目002",router:"base/project-doc*"},
          {key:"project-doc18",label:"项目003",router:"base/project-doc*"},
          {key:"project-doc19",label:"共享项目a",router:"base/project-doc*"},
          {key:"project-doc20",label:"共享项目b",router:"base/project-doc*"},


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


