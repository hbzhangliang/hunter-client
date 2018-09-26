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


export const healthcheck = (params) => { return io.post(`${base}/health`, params) };
export const wsTest = (params) => { return io.post(`${base}/ws/1`, params) };
export const wsTest2 = (params) => { return io.post(`${base}/ws/2`, params) };

//账号接口
export const accountCheck = (params) => { return io.post(`${base}/account/check`, params) };
export const accountCheckInfo = (params) => { return io.post(`${base}/account/check_info`, params) };
export const accountLogout = (params) => { return io.post(`${base}/account/logout`, params) };
export const accountInfo= (params) => { return io.post(`${base}/account/account_info`, params) };

export const accountGet = (params) => { return io.post(`${base}/account/get`, params) };
export const accountList = (params) => { return io.post(`${base}/account/list`, params) };
export const accountListAll = (params) => { return io.post(`${base}/account/list-all`, params) };
export const accountDel = (params) => { return io.post(`${base}/account/del`, params) };
export const accountSave = (params) => { return io.post(`${base}/account/save`, params) };
//账号视图操作
export const vAccountGet = (params) => { return io.post(`${base}/vaccount/get`, params) };
export const vAccountList = (params) => { return io.post(`${base}/vaccount/list`, params) };
export const vAccountListAll = (params) => { return io.post(`${base}/vaccount/list-all`, params) };
//城市配置
export const cityMap = (params) => { return io.post(`${base}/city/map`, params) };
export const cityTree = (params) => { return io.post(`${base}/city/tree`, params) };
export const cityGet = (params) => { return io.post(`${base}/city/get`, params) };
export const cityList = (params) => { return io.post(`${base}/city/list`, params) };
export const cityListAll = (params) => { return io.post(`${base}/city/list-all`, params) };
export const cityDel = (params) => { return io.post(`${base}/city/del`, params) };
export const citySave = (params) => { return io.post(`${base}/city/save`, params) };
export const cityImport = (params) => { return io.post(`${base}/city/import`, params) };
//行业配置
export const businessTree = (params) => { return io.post(`${base}/business/tree`, params) };
export const businessGet = (params) => { return io.post(`${base}/business/get`, params) };
export const businessList = (params) => { return io.post(`${base}/business/list`, params) };
export const businessListAll = (params) => { return io.post(`${base}/business/list-all`, params) };
export const businessDel = (params) => { return io.post(`${base}/business/del`, params) };
export const businessSave = (params) => { return io.post(`${base}/business/save`, params) };
export const businessImport = (params) => { return io.post(`${base}/business/import`, params) };
// 职能配置
export const careerTree = (params) => { return io.post(`${base}/career/tree`, params) };
export const careerGet = (params) => { return io.post(`${base}/career/get`, params) };
export const careerList = (params) => { return io.post(`${base}/career/list`, params) };
export const careerListAll = (params) => { return io.post(`${base}/career/list-all`, params) };
export const careerDel = (params) => { return io.post(`${base}/career/del`, params) };
export const careerSave = (params) => { return io.post(`${base}/career/save`, params) };
export const careerImport = (params) => { return io.post(`${base}/career/import`, params) };
//标签组和标签操作
export const tagGroupTree = (params) => { return io.post(`${base}/tag_group/tree`, params) };
export const tagGroupGet = (params) => { return io.post(`${base}/tag_group/get`, params) };
export const tagGroupList = (params) => { return io.post(`${base}/tag_group/list`, params) };
export const tagGroupListAll = (params) => { return io.post(`${base}/tag_group/list-all`, params) };
export const tagGroupDel = (params) => { return io.post(`${base}/tag_group/del`, params) };
export const tagGroupSave = (params) => { return io.post(`${base}/tag_group/save`, params) };

export const tagTreeByCode = (params) => { return io.post(`${base}/tag/tree-bycode`, params) };
export const tagTree = (params) => { return io.post(`${base}/tag/tree`, params) };
export const tagGet = (params) => { return io.post(`${base}/tag/get`, params) };
export const tagList = (params) => { return io.post(`${base}/tag/list`, params) };
export const tagListAll = (params) => { return io.post(`${base}/tag/list-all`, params) };
export const tagDel = (params) => { return io.post(`${base}/tag/del`, params) };
export const tagSave = (params) => { return io.post(`${base}/tag/save`, params) };
//字典项管理
export const dictList = (params) => { return io.post(`${base}/dict/list`, params) };
export const dictListChildren = (params) => { return io.post(`${base}/dict/list-children`, params) };
export const dictListChildrenByCode = (params) => { return io.post(`${base}/dict/list-children-bycode`, params) };
export const dictListChildrenByCodes = (params) => { return io.post(`${base}/dict/list-children-bycodes`, params) };
export const dictListAll = (params) => { return io.post(`${base}/dict/list-all`, params) };
export const dictSave = (params) => { return io.post(`${base}/dict/save`, params) };
export const dictGet = (params) => { return io.post(`${base}/dict/get`, params) };
export const dictDel = (params) => { return io.post(`${base}/dict/del`, params) };
//职位配置
export const positionList = (params) => { return io.post(`${base}/position/list`, params) };
export const positionListAll = (params) => { return io.post(`${base}/position/list-all`, params) };
export const positionSave = (params) => { return io.post(`${base}/position/save`, params) };
export const positionGet = (params) => { return io.post(`${base}/position/get`, params) };
export const positionDel = (params) => { return io.post(`${base}/position/del`, params) };
//团队管理
export const teamList = (params) => { return io.post(`${base}/team/list`, params) };
export const teamListAll = (params) => { return io.post(`${base}/team/list-all`, params) };
export const teamSave = (params) => { return io.post(`${base}/team/save`, params) };
export const teamGet = (params) => { return io.post(`${base}/team/get`, params) };
export const teamDel = (params) => { return io.post(`${base}/team/del`, params) };
export const teamTree = (params) => { return io.post(`${base}/team/tree`, params) };
//企业管理
export const corpGet = (params) => { return io.post(`${base}/corp/get`, params) };
export const corpSave = (params) => { return io.post(`${base}/corp/save`, params) };

//共享文件夹
export const docList = (params) => { return io.post(`${base}/doc/list`, params) };
export const docListAll = (params) => { return io.post(`${base}/doc/list-all`, params) };
export const docSave = (params) => { return io.post(`${base}/doc/save`, params) };
export const docGet = (params) => { return io.post(`${base}/doc/get`, params) };
export const docDel = (params) => { return io.post(`${base}/doc/del`, params) };
export const docTree = (params) => { return io.post(`${base}/doc/tree`, params) };
export const docAllTree = (params) => { return io.post(`${base}/doc/all-tree`, params) };
export const docShareTree = (params) => { return io.post(`${base}/doc/share-tree`, params) };
export const docListOwner = (params) => { return io.post(`${base}/doc/list-self`, params) };
export const docListShare = (params) => { return io.post(`${base}/doc/list-share`, params) };
export const docListOwnerFront = (params) => { return io.post(`${base}/doc/list-owner`, params) };


export const docShareList = (params) => { return io.post(`${base}/doc-share/list`, params) };
export const docShareListAll = (params) => { return io.post(`${base}/doc-share/list-all`, params) };
export const docShareSave = (params) => { return io.post(`${base}/doc-share/save`, params) };
export const docShareGet = (params) => { return io.post(`${base}/doc-share/get`, params) };
export const docShareDel = (params) => { return io.post(`${base}/doc-share/del`, params) };

//附件上传处理
export const attachmentUpload = (params) => { return io.post(`${base}/attachment/upload`, params) };
export const attachmentListAll = (params) => { return io.post(`${base}/attachment/list-all`, params) };
export const attachmentSave = (params) => { return io.post(`${base}/attachment/save`, params) };
export const attachmentGet = (params) => { return io.post(`${base}/attachment/get`, params) };
export const attachmentDel = (params) => { return io.post(`${base}/attachment/del`, params) };

//talent 操作
export const talentGetVo = (params) => { return io.post(`${base}/talent/get-vo`, params) };
export const talentGet = (params) => { return io.post(`${base}/talent/get`, params) };
export const talentList = (params) => { return io.post(`${base}/talent/list`, params) };
export const talentListPage = (params) => { return io.post(`${base}/talent/list-all-page`, params) };
export const talentListAll = (params) => { return io.post(`${base}/talent/list-all`, params) };
export const talentDel = (params) => { return io.post(`${base}/talent/del`, params) };
export const talentAdminDel = (params) => { return io.post(`${base}/talent/admin-del`, params) };
export const talentSave = (params) => { return io.post(`${base}/talent/save`, params) };
export const talentShareList = (params) => { return io.post(`${base}/talent/list-share`, params) };

//获取所有的树结构
export const utilTree = (params) => { return io.post(`${base}/util/tree`, params) };


//talentDoc
export const talentDocList = (params) => { return io.post(`${base}/talent-doc/list`, params) };
export const talentDocListAll = (params) => { return io.post(`${base}/talent-doc/list-all`, params) };
export const talentDocSave = (params) => { return io.post(`${base}/talent-doc/save`, params) };
export const talentDocGet = (params) => { return io.post(`${base}/talent-doc/get`, params) };
export const talentDocDel = (params) => { return io.post(`${base}/talent-doc/del`, params) };
export const talentDocAddShare = (params) => { return io.post(`${base}/talent-doc/add-share`, params) };
export const talentDocsByTalentId = (params) => { return io.post(`${base}/talent-doc/docs-bytalent`, params) };

//vtalentDoc
export const vtalentDocList = (params) => { return io.post(`${base}/vtalentdoc/list`, params) };
export const vtalentDocGet = (params) => { return io.post(`${base}/vtalentdoc/get`, params) };


//company
export const companyGetVo = (params) => { return io.post(`${base}/company/get-vo`, params) };
export const companyGet = (params) => { return io.post(`${base}/company/get`, params) };
export const companyList = (params) => { return io.post(`${base}/company/list`, params) };
export const companyListPage = (params) => { return io.post(`${base}/company/list-all-page`, params) };
export const companyListAll = (params) => { return io.post(`${base}/company/list-all`, params) };
export const companyDel = (params) => { return io.post(`${base}/company/del`, params) };
export const tcompanyAdminDel = (params) => { return io.post(`${base}/company/admin-del`, params) };
export const companySave = (params) => { return io.post(`${base}/company/save`, params) };
export const companyShareList = (params) => { return io.post(`${base}/talent/list-share`, params) };