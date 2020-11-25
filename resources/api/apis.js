//负责维护url,其他尽管调用即可
import request from './request.js';
const baseApi = 'http://192.168.3.108:901/';
function ajaxReq(url,params,method){
	return request({url : baseApi + url,params : params,method : method});
}
//获取标签栏的数据,用法 this.$api.userLogin('login',{username:'admin',password:'1'}).then(data =>{}).catch(err =>{});
export const userLogin = (url,params) =>{
	return ajaxReq(url,params,"POST");
};
//示例代码
export const edit = (url,params) =>{
	return ajaxReq(url,params,"POST");
};