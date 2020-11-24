//负责维护url,其他尽管调用即可
import request from './request.js';
function ajaxReq(url,params,method){
	return request({url : url,params : params,method : method});
}
//获取标签栏的数据,用法 this.$api.userLogin('http://127.0.0.1:901/login',{username:'admin',password:'1'}).then(data =>{}).catch(err =>{});
export const userLogin = (url,params) =>{
	return ajaxReq(url,params,"POST");
};