<template>
	<view>
    <titlebar backIcon title="帮助中心" @clickBack="clickBack"></titlebar>
		<empty v-if="describe.length <= 0"></empty>
    <view class="htmlContainer">
      {{describe}}
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        describe : '先登录工作人员账号进行疫情数据的录入'
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
  .htmlContainer{
    padding: 8px;
  }
</style>