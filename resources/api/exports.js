const requireApi = require.context('.',false,/.js$/);
let module = {};
requireApi.keys().forEach((key,index) =>{
	if(key === './exports.js' || key === './request.js')return;
	Object.assign(module,requireApi(key));
});
export default module;