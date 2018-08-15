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

//城市配置
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