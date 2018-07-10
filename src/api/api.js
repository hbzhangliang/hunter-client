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


export const index = (params) => { return io.post(`${base}/index`, params) };
export const wsTest = (params) => { return io.post(`${base}/ws/1`, params) };
export const wsTest2 = (params) => { return io.post(`${base}/ws/2`, params) };
