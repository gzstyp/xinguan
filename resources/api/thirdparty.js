//调用第三方接口
import request from './request.js';
function ajaxReq(url,params,method){
	return request({url : baseApi + url,params : params,method : method});
}
//获取标签栏的数据,用法 this.$api.thirdparty('http://apis.fwtai.com/login',{username:'admin',password:'1'}).then(data =>{}).catch(err =>{});
export const thirdparty = (url,params) =>{
	return ajaxReq(url,params,"POST");
};