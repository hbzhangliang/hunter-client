/**
 * Created by lenovo on 2017/10/16.
 */
import io from './io';
// import axios from 'axios';
import config from './config';
let base = process.env.BASE_API
// let base = config.host
console.log(base)
 // let base2 = '/pagestyle'
export const getApiSublist = (params) => { return io.post(`${base}/api/api-jssdk/funclistbytype`, params) };

export const getWorkBenchData = () => { return io.get(`${base}/config/work-bench?spId=1c5d468652ba4af295f9dd83aa62e152`) };

export const saveData = (params) => { return io.post(`${base}/config/save-workBench`, params) };
// 获取业务图标
export const getAllConfigData = () => { return io.get(`${base}/config/get-groupbiz?spId=1c5d468652ba4af295f9dd83aa62e152&groupId=59eda7f727414e5a7ccea040`) };
// 获取自定义模块
export const getSelfData = () => { return io.get(`${base}/config/opt-config?spId=1c5d468652ba4af295f9dd83aa62e152`) };
//保存自定义模块
export const saveSelfData=(params) => { return io.post(`${base}/config/save-config-element`, params) };
//删除自定义模块
export const delSelfData=(params) => { return io.post(`${base}/config/del-config-element`,params)};

//redis for search
export const redisList=(params) => { return io.post(`${base}/redis/get-keys`,params)};
//redis for look its value
export const redisValue=(params) => { return io.post(`${base}/redis/get-value`,params)};
//del redis by its key
export const redisDelKey=(params) => { return io.post(`${base}/redis/del-key`,params)};


//获取开放服务数据
export const getOpenContent=(params) => { return io.post(`${base}/openserver/get-content`,params)};
//获取开放服务数据列表
export const getOpenContentList=(params) => { return io.post(`${base}/openserver/list`,params)};
//保存开放服务数据
export const saveOpenContent=(params) => { return io.post(`${base}/openserver/save-content`,params)};
//删除开放服务数据
export const delOpenContent=(params) => { return io.post(`${base}/openserver/del-content`,params)};
//开放服务数据排序
export const sortOpenServicetList=(params) => { return io.post(`${base}/openserver/changeSeq-content`,params)};
//启用或禁用接口
export const changeServiceStatus=(params) => { return io.post(`${base}/openserver/changeStatus-content`,params)};


//数据统计相关的接口  终端统计 包含了 机型统计，OS统计，分辨率，版本号统计等等
export const terminalSts=(params) => { return io.post(`${base}/data/terminal`,params)};

export const bizDataSts=(params) => { return io.post(`${base}/data/biz-data`,params)};

export const bizInfoSts=(params) => { return io.post(`${base}/data/biz-info`,params)};

export const sdkDataSts=(params) => { return io.post(`${base}/data/sdk-data`,params)};

export const sdkInfoSts=(params) => { return io.post(`${base}/data/sdk-info`,params)};


export const eventDataSts=(params) => { return io.post(`${base}/data/event-data`,params)};

export const eventInfoSts=(params) => { return io.post(`${base}/data/event-info`,params)};

export const eventStsSts=(params) => { return io.post(`${base}/data/event-sts`,params)};

// 用户权限配置相关接口  系统管理
export const userList=(params) => { return io.post(`${base}/sys/user-list`,params)};
export const getUser=(params) => { return io.post(`${base}/sys/get-user`,params)};
export const saveUser=(params) => { return io.post(`${base}/sys/save-user`,params)};
export const delUser=(params) => { return io.post(`${base}/sys/del-user`,params)};

export const roleList=(params) => { return io.post(`${base}/sys/role-list`,params)};
export const getRole=(params) => { return io.post(`${base}/sys/get-role`,params)};
export const saveRole=(params) => { return io.post(`${base}/sys/save-role`,params)};
export const delRole=(params) => { return io.post(`${base}/sys/del-role`,params)};

export const aclList=(params) => { return io.post(`${base}/sys/acl-list`,params)};
export const getAcl=(params) => { return io.post(`${base}/sys/get-acl`,params)};
export const saveAcl=(params) => { return io.post(`${base}/sys/save-acl`,params)};
export const delAcl=(params) => { return io.post(`${base}/sys/del-acl`,params)};

export const menuList=(params) => { return io.post(`${base}/sys/menu-list`,params)};
export const getMenu=(params) => { return io.post(`${base}/sys/get-menu`,params)};
export const saveMenu=(params) => { return io.post(`${base}/sys/save-menu`,params)};
export const delMenu=(params) => { return io.post(`${base}/sys/del-menu`,params)};
export const menuTree=(params) => { return io.post(`${base}/sys/menu-tree`,params)};


export const dataTree=(params) => { return io.post(`${base}/sys/data-tree`,params)};
export const saveRoleAcl=(params) => { return io.post(`${base}/sys/save-role-acl`,params)};
export const saveUserRoleAcl=(params) => { return io.post(`${base}/sys/save-user-roleacl`,params)};


//企业App 相应配置
export const corpList=(params) => { return io.post(`${base}/corpapp/corp-list`,params)};
export const corpDetail=(params) => { return io.post(`${base}/corp/corp-detail`,params)};

// bizApp列表
export const bizAppList=(params) => { return io.post(`${base}/corpapp/app-list`,params)};
//workbench list
export const bizWorkbenchList=(params) => { return io.post(`${base}/corpapp/biz-workbench-list`,params)};
export const getBizWorkbench=(params) => { return io.post(`${base}/corpapp/get-biz-workbench`,params)};
export const saveBizWorkbench=(params) => { return io.post(`${base}/corpapp/save-biz-workbench`,params)};
export const delBizWorkbench=(params) => { return io.post(`${base}/corpapp/del-biz-workbench`,params)};
export const changePublishBizWorkbench=(params) => { return io.post(`${base}/corpapp/change-publish-workbench`,params)};
//module list
export const bizModuleList=(params) => { return io.post(`${base}/corpapp/biz-module-list`,params)};
export const getBizModule=(params) => { return io.post(`${base}/corpapp/get-biz-module`,params)};
export const saveBizModule=(params) => { return io.post(`${base}/corpapp/save-biz-module`,params)};
export const delBizModule=(params) => { return io.post(`${base}/corpapp/del-biz-module`,params)};
export const changeModuleSeq=(params) => { return io.post(`${base}/corpapp/change-module-seq`,params)};
//biz scroll
export const bizScrollList=(params) => { return io.post(`${base}/corpapp/biz-scroll-list`,params)};
export const getBizScroll=(params) => { return io.post(`${base}/corpapp/get-biz-scroll`,params)};
export const saveBizScroll=(params) => { return io.post(`${base}/corpapp/save-biz-scroll`,params)};
export const delBizScroll=(params) => { return io.post(`${base}/corpapp/del-biz-scroll`,params)};
export const changeScrollSeq=(params) => { return io.post(`${base}/corpapp/change-scroll-seq`,params)};
//biz appConfig
export const bizAppConfigList=(params) => { return io.post(`${base}/corpapp/biz-appconfig-list`,params)};
export const getBizAppConfig=(params) => { return io.post(`${base}/corpapp/get-biz-appconfig`,params)};
export const saveBizAppConfig=(params) => { return io.post(`${base}/corpapp/save-biz-appconfig`,params)};
export const delBizAppConfig=(params) => { return io.post(`${base}/corpapp/del-biz-appconfig`,params)};
export const changeBizAppConfigSeq=(params) => { return io.post(`${base}/corpapp/change-bizappconfig-seq`,params)};

export const bizAppConfigListPlatForm=(params) => { return io.post(`${base}/corpapp/biz-appconfig-list-platform`,params)};
//自定义模块
export const bizTemplateList=(params) => { return io.post(`${base}/corpapp/biz-template-list`,params)};
export const getBizTemplate=(params) => { return io.post(`${base}/corpapp/get-biz-template`,params)};
export const saveBizTemplate=(params) => { return io.post(`${base}/corpapp/save-biz-template`,params)};
export const delBizTemplate=(params) => { return io.post(`${base}/corpapp/del-biz-template`,params)};
export const bizTemplateListAll=(params) => { return io.post(`${base}/corpapp/biz-template-list-all`,params)};

//自定义业务接口
export const bizOptElementList=(params) => { return io.post(`${base}/corpapp/biz-optelement-list`,params)};
export const getBizOptElement=(params) => { return io.post(`${base}/corpapp/get-biz-optelement`,params)};
export const saveBizOptElement=(params) => { return io.post(`${base}/corpapp/save-biz-optelement`,params)};
export const delBizOptElement=(params) => { return io.post(`${base}/corpapp/del-biz-optelement`,params)};

export const changeBizOptElementSeq=(params) => { return io.post(`${base}/corpapp/change-bizoptelement-seq`,params)};

//附件上传接口  仅仅做图片上传
export const fileUpload=(params) => { return io.post(`${base}/attachment/file-upload`,params)};
export const saveModule=(params) => { return io.post(`${base}/corpapp/save-biz-modulevo`,params)};
export const getAppList=(params) => { return io.post(`${base}/corpapp/biz-appconfig-list-platform`,params)};
export const saveModuleSeq=(params) => { return io.post(`${base}/corpapp/pub-workbench`,params)};
export const getAllModule=(params) => { return io.post(`${base}/corpapp/get-workbenchvo-config`,params)};
export const getImgTextList=(params) => { return io.post(`${base}/corpapp/get-content`,params)};

//企业app管理页面接口
// export const appManageGetAppList=(params) => { return io.post(`${base}/corpapp/app-list`,params)};
// export const appManageGetAppList=(params) => { return io.post(`${base}/publish/list`,params)};
export const getCompanyList=(params) => { return io.post(`${base}/corp/corp-app-list`,params)};//企业列表查询
export const getAppManageList=(params) => { return io.post(`${base}/app-manager/list`,params)};//企业app管理列表查询接口
export const companyBindCommonApp=(params) => { return io.post(`${base}/corp/correlation`,params)};//企业绑定通用app

//有界面自动打包页面接口
export const getInitDataBuildConfig=(params) => { return io.post(`${base}/app/load-build-config`,params)};
export const getInitDataIndustry=(params) => { return io.post(`${base}/category/list`,params)};
export const uploadIcon=(params) => { return io.post(`${base}/file/upload`,params)};
export const uploadCropImg=(params) => { return io.post(`${base}/file/image-resize-crop`,params)};
export const getThemeListData=(params) => { return io.post(`${base}/theme/list`,params)};
export const appBuild=(params) => { return io.post(`${base}/app/build`,params)};
//打包构建step1新建app
export const newApp=(params) => { return io.post(`${base}/app-manager/save`,params)};
export const updateApp=(params) => { return io.post(`${base}/app-manager/update`,params)};
export const getCategoryStyle=(params) => { return io.post(`${base}/category/detail`,params)};//获取行业风格详情
//app构建任务列表
export const getTaskList=(params) => { return io.post(`${base}/app/list-job`,params)};//获取任务列表
export const getTaskLog=(params) => { return io.post(`${base}/app/build-log`,params)};//获取当前任务的日志
export const rebuildTask=(params) => { return io.post(`${base}/app/build-job`,params)};//任务的重新构建
export const cancelBuildTask=(params) => { return io.post(`${base}/app/cancel-job`,params)};//任务的重新构建

//通用资源管理
export const fileUploadSec=(params) => { return io.post(`${base}/file/upload`,params)};
export const getThemeDetials=(params) => { return io.post(`${base}/theme/detail`,params)};
export const saveTheme=(params) => { return io.post(`${base}/theme/save`,params)};
export const getInitIndustrySource=(params) => { return io.post(`${base}/category/detail`,params)};
export const delTheme=(params) => { return io.post(`${base}/theme/delete`,params)};//删除主题
export const delIndustry=(params) => { return io.post(`${base}/category/delete`,params)};//删除行业
//新建/编辑保存行业信息
export const saveIndustryConfig=(params) => { return io.post(`${base}/category/save`,params)};

//主题包上传接口
export const uploadTheme=(params) => { return io.post(`${base}/file/upload-theme`,params)};

//app version manage list
export const getAppVersionList=(params) => { return io.post(`${base}/version/list`,params)};

//gery level publish config data init
export const getGeryLevelConfig=(params) => { return io.post(`${base}/gated-launch/query`,params)};

export const checkConfigInitStatus=(params) => {return io.post(`${base}/app-config/check-init-conf-status`,params)};
//app common configuration
export const getAppcommonConfiguration=(params) => { return io.post(`${base}/app-config/common-config-list`,params)};
//保存基础配置项的接口
export const saveAppcommonConfiguration=(params) => { return io.post(`${base}/app-config/common-config-save`,params)};

//获取配置项数据,无数据。只是展示的值
export const getAppCommonConfData=(params) => { return io.post(`${base}/app-config/common-config`,params)};
//底部菜单接口
export const getAppFootConfData=(params) => { return io.post(`${base}/app-config/foot-config-list`,params)};
export const saveAppFootConfData=(params) => { return io.post(`${base}/app-config/foot-config-save`,params)};
//排序接口
export const sortAppConf=(params) => {return io.post(`${base}/app-config/sort`,params)};
//我的配置接口
export const getAppOptConfData=(params) => { return io.post(`${base}/app-config/my-config-list`,params)};
export const saveAppOptConfData=(params) => { return io.post(`${base}/app-config/my-config-save`,params)};
//主题样式
export const getThemeConfData=(params) => { return io.post(`${base}/app-config/theme-style-config-list`,params)};
export const saveThemeConfData=(params) => { return io.post(`${base}/app-config/theme-style-config-save`,params)};

//发布配置
export const publishConf=(params) => { return io.post(`${base}/app-config/publish`,params)};
//复制通用配置到自定义配置
export const copyCommonToOpt=(params) => { return io.post(`${base}/app-config/init-custom-config`,params)};
//恢复初始配置
export const backCommon=(params) => { return io.post(`${base}/app-config/restore-config`,params)};

//对接sso相关接口
//根据token获取成员信息
export const getTokenInfo=(token,params) => { return io.post(`${base}/sso/get-token-info?token=`+token,params)};

export const authServerList=(params) => { return io.post(`${base}/auth/server-list`,params)};
export const authServerGet=(params) => { return io.post(`${base}/auth/get-server`,params)};
export const authServerSave=(params) => { return io.post(`${base}/auth/save-server`,params)};
export const authServerDel=(params) => { return io.post(`${base}/auth/del-server`,params)};

export const authServerAclList=(params) => { return io.post(`${base}/auth/serveracl-list`,params)};
export const authAclList=(params) => { return io.post(`${base}/auth/acl-list`,params)};
export const authAclGet=(params) => { return io.post(`${base}/auth/get-acl`,params)};
export const authAclSave=(params) => { return io.post(`${base}/auth/save-acl`,params)};
export const authAclDel=(params) => { return io.post(`${base}/auth/del-acl`,params)};

export const authAccountList=(params) => { return io.post(`${base}/auth/account-list`,params)};
export const authAccountGet=(params) => { return io.post(`${base}/auth/get-account`,params)};
export const authAccountSave=(params) => { return io.post(`${base}/auth/save-account`,params)};
export const authAccountDel=(params) => { return io.post(`${base}/auth/del-account`,params)};

export const authAddAccountPrivileges=(params) => { return io.post(`${base}/auth/add-account-privilegeItems`,params)};

export const authAclListByAccountId=(params) => { return io.post(`${base}/auth/acllist-accountid`,params)};
export const authAclListByMemberId=(params) => { return io.post(`${base}/auth/acllist-memberid`,params)};
export const authAclListByToken=(params) => { return io.post(`${base}/auth/acllist-bytoken`,params)};

export const authMemberListBySpId=(params) => { return io.post(`${base}/auth/member-list`,params)};

//账号添加成员 账号删除成员
export const authAddAcountMembers=(params) => { return io.post(`${base}/auth/add-account-members`,params)};
export const authDelAccountMember=(params) => { return io.post(`${base}/auth/del-account-member`,params)};
export const authAddMemberAccounts=(params) => { return io.post(`${base}/auth/add-member-accounts`,params)};
export const authListAccountsByMemberId=(params) => { return io.post(`${base}/auth/list-accounts-by-memberId`,params)};

//app管理
export const versionPublish = (params) => {return io.post(`${base}/publish/save`,params)}
export const versionPublishQurery = (params) => {return io.post(`${base}/publish/query`,params)}
export const publishGeryLevelConfig=(params) => { return io.post(`${base}/gated-launch/save`,params)};//灰度设置保存
export const clearGeryLevelConfig=(params) => { return io.post(`${base}/gated-launch/clear`,params)};//灰度设置清空
export const getAppSummaryInfo=(params) => { return io.post(`${base}/app-manager/detail`,params)};//app信息概览
export const changeAppFlag=(params) => { return io.post(`${base}/app-manager/disable`,params)};//app禁用启用
export const appVersionUpdate=(params) => { return io.post(`${base}/version/update`,params)};//app版本编辑
export const appUpdateCorrelation=(params) => { return io.post(`${base}/corp/updateCorrelation`,params)};//app绑定企业的启用停用


//spId and appId statistics
export const appActiveUseSts=(params) => { return io.post(`${base}/data/active-user-count`,params)};//获取某段时间活跃用户
export const appActiveUseListSts=(params) => { return io.post(`${base}/data/active-user-act`,params)};//获取某段时间 用户事件列表
export const appActiveUseStsDay=(params) => { return io.post(`${base}/data/active-user-count-day`,params)};//获取某段时间活跃用户


//查询opencontentLoglist 接口
export const getOpenContentLogList=(params) => { return io.post(`${base}/openserver/getcontentlog-list`,params)};


//上传apk包接口
export const uploadApk=(params) => { return io.post(`${base}/apk/create`,params)};

//回滚接口
export const rollBackVersion=(params) => { return io.post(`${base}/publish/roll-back`,params)};

//品牌机型相关处理
export const brandList=(params) => { return io.post(`${base}/data/brand-list`,params)};
export const brandCreate=(params) => { return io.post(`${base}/data/create-brand`,params)};
export const brandDel=(params) => { return io.post(`${base}/data/del-brand`,params)};
export const brandGet=(params) => { return io.post(`${base}/data/get-brand`,params)};

export const brandAddDeviceType=(params) => { return io.post(`${base}/data/add-brand-type-ref`,params)};
export const brandDelDeviceType=(params) => { return io.post(`${base}/data/del-brand-type-ref`,params)};

export const deviceTypeList=(params) => { return io.post(`${base}/data/phonetype-list`,params)};
export const deviceTypeListNotSts=(params) => { return io.post(`${base}/data/phonetype-list-notSts`,params)};

// 企业日志列表接口 分页
export const logcorpList=(params) => { return io.post(`${base}/logcorp/list`,params)};


//工作台相关接口
export const workBenchList=(params) => { return io.post(`${base}/bizworkbench/list`,params)};
export const workBenchSave=(params) => { return io.post(`${base}/bizworkbench/save`,params)};
export const workBenchGet=(params) => { return io.post(`${base}/bizworkbench/get`,params)};
export const workBenchDel=(params) => { return io.post(`${base}/bizworkbench/del`,params)};

export const blockList=(params) => { return io.post(`${base}/block/list`,params)};
export const blockSave=(params) => { return io.post(`${base}/block/save`,params)};
export const blockGet=(params) => { return io.post(`${base}/block/get`,params)};
export const blockDel=(params) => { return io.post(`${base}/block/del`,params)};

export const moduleList=(params) => { return io.post(`${base}/bizmodule/list`,params)};
export const moduleGet=(params) => { return io.post(`${base}/bizmodule/get`,params)};
export const moduleDel=(params) => { return io.post(`${base}/bizmodule/del`,params)};
export const moduleSave=(params) => { return io.post(`${base}/bizmodule/save`,params)};
export const moduleSaveVo=(params) => { return io.post(`${base}/bizmodule/savevo`,params)};
export const moduleListVo=(params) => { return io.post(`${base}/bizmodule/listvo`,params)};

/**
 * 获取订购中心的数据
 * @param params
 * @returns {*}
 */
export const orderApps=(params) => { return io.post(`${base}/bizmodule/apps`,params)};

export const corpAppGet=(params) => { return io.post(`${base}/bizworkbench/getbenchId`,params)};


export const workbenchPublish=(params) => { return io.post(`${base}/bizworkbench/publish`,params)};


export const columnList=(params) => { return io.post(`${base}/column-manager/listCol`,params)};




/************************内容栏目******************************/

//新增 内容
export const addColumnContent = (params) =>{
    return io.post(`${base}/colContent-manager/saveColContent`,params)
}

export const updateColContent = (params) =>{
    return io.post(`${base}/colContent-manager/updateColContent`,params)
}

//查询内容详情
export const getContentDetail = (params) =>{
    return io.post(`${base}/colContent-manager/getSingelCont`,params)
}

//获取终端列表
export const getTerminalList = (params) => {
    return io.post(`${base}/column-manager/getTerminalList`,params)
}

//获取发布内容

export const getReleaseInfo = (params) => {
    return io.post(`${base}/colContent-manager/getReleaseInfo`,params)
}


//发布内容
export const releaseColContent = (params) => {
    return io.post(`${base}/colContent-manager/releaseColContent`,params)
}

/************************内容栏目******************************/

/**************************栏目*******************************/
//新建栏目
export const  createColumn= (params) => {
	//api/column-manager/saveCol
    return io.post(`${base}/column-manager/saveCol`,params)
}

//栏目列表
export const getListCol = (params) => {
    return io.post(`${base}/column-manager/listCol`,params)
}

//栏目状态修改
export const colModifyStatus = (params) => {
    return io.post(`${base}/column-manager/modifyStatus`,params)
}

//栏目删除
export const deleteCol = (params) => {
    return io.post(`${base}/column-manager/delCol`,params)
}

//栏目内容列表
export const getListColContent = (params) => {
    return io.post(`${base}/colContent-manager/listColContent`,params)
}

//内容状态修改
export const contModifyStatus = (params) => {
    return io.post(`${base}/colContent-manager/modifyStatus`,params)
}

//内容删除
export const deleteColContent = (params) => {
    return io.post(`${base}/colContent-manager/deleteColContent`,params)
}

/**************************栏目*******************************/