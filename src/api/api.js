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


export const accoutCheck = (params) => { return io.post(`${base}/account/check`, params) };
export const accoutCheckInfo = (params) => { return io.post(`${base}/account/check_info`, params) };
export const accountLogout = (params) => { return io.post(`${base}/account/logout`, params) };
export const accoutListAll = (params) => { return io.post(`${base}/account/listall`, params) };
export const accoutInfo= (params) => { return io.post(`${base}/account/account_info`, params) };
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

export const tagTree = (params) => { return io.post(`${base}/tag/tree`, params) };
export const tagGet = (params) => { return io.post(`${base}/tag/get`, params) };
export const tagList = (params) => { return io.post(`${base}/tag/list`, params) };
export const tagListAll = (params) => { return io.post(`${base}/tag/list-all`, params) };
export const tagDel = (params) => { return io.post(`${base}/tag/del`, params) };
export const tagSave = (params) => { return io.post(`${base}/tag/save`, params) };
//字典项管理
export const dictList = (params) => { return io.post(`${base}/dict/list`, params) };
export const dictListChildren = (params) => { return io.post(`${base}/dict/list-children`, params) };
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