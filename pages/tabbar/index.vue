<template>
	<view>
		<titlebar title="首页"></titlebar>
    <view class="container">
      <view class="container-box">
        <view class="container-item" @click="manage"><text>经营场所录入</text></view>
        <view class="container-item" @click="environment"><text>环境监测录入</text></view>
        <view class="container-item" @click="employee"><text>从业人员录入</text></view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {},
		methods: {
      /*经营场所*/
      manage(){
        this.navigateTo('/pages/index/manage');
      },
      /*地点环境监测*/
      environment(){
        this.navigateTo('/pages/index/environment');
      },
      /*从业人员监测*/
      employee(){
        this.navigateTo('/pages/index/employee');
      }
		}
	}
</script>

<style lang="scss">
  page{
    width: 100% !important;
    height: 100% !important;
    display: flex;
    align-items: center;
    justify-content:center;
  }
  .container {
    justify-content:center;
    align-items: center;
    display: flex;
    width:100vw;
    .container-box {
      width: 100%;
      height: 100%;
      .container-item{
        width: 60%;
        margin: 0px auto;
        padding: 12px 18px;
        border-radius: 5px;
        background-color: $mk-base-color;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content:center;
        align-items:Center;
        &:nth-child(n+2){
          margin-top: 10px;
        }
      }
    }
  }
</style>