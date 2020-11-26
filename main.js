import Vue from 'vue';
import App from './App';
// vuex
import store from './store/index.js';
import exports from './resources/api/exports.js';
Vue.prototype.$api = exports;

import release from './resources/db/release.js';
Vue.prototype.$db = release;

Vue.config.productionTip = false;
App.mpType = 'app';
// 检查是否已登录，参数 backpage : 登录后返回的页面; backtype : 打开页面的类型[1 : redirectTo 2 : switchTab];
// 用法 const check = this.checkLogin('/pages/tabbar/follow/follow',2);if(!check)return; uni.redirectTo({url:pageOptions.backpage});uni.switchTab({url:pageOptions.backpage});
Vue.prototype.checkLogin = function(backpage, backtype){
	var userInfo  = uni.getStorageSync('USERINFO');
	if(userInfo === null || userInfo === ''){
		uni.redirectTo({url:'/pages/my/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return userInfo;
};
//直接跳转到指定tab底部标签,用法:this.switchTab('/pages/tabbar/my/my');
Vue.prototype.switchTab = function(url){
  uni.switchTab({
    url:url
  });
};
//用法:this.navigateTo('/pages/tabbar/my/my');
Vue.prototype.navigateTo = function(url){
  uni.navigateTo({
    url:url
  });
};
const app = new Vue({
  store,
    ...App
});
app.$mount();