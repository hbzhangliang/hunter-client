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
export const cityDel = (params) => { return io.post(`${base}/city/del`, params) };
export const citySave = (params) => { return io.post(`${base}/city/save`, params) };