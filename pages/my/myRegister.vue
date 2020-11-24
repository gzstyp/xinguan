<template>
	<view>
    <titlebar backIcon title="我的登记" @clickBack="clickBack"></titlebar>
		<empty :text="text"></empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        text : uni.getStorageSync('USERINFO') ? '此地空空如也' : '请先登录再查看'
      };
		},
    methods:{
      clickBack(){
        this.switchTab('/pages/tabbar/my');
      }
    }
	}
</script>

<style lang="scss">
</style>