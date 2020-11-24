export default function promiseRequest(options){
  const {url,method,params} = options;
  return new Promise((reslove,reject) =>{
  	uni.request(
      {
        url:url,
        method:method || 'GET',
        dataType:"json",
        data:params,
        header: {
          'content-type':'application/x-www-form-urlencoded',//默认是 application/json
          'accessToken': uni.getStorageSync('accessToken') || '',
          'refreshToken': uni.getStorageSync('refreshToken') || ''
        },
        success(res) {
          //成功的是 .then(data);
          reslove(res.data);//主要是正常返回的都走reslove();此处处理登录超时或token无效，code为401;204之类的处理
        },
        fail(err) {
          //失败的是.catch(err);
          reject(err);
        }
      }
    );
  });
}