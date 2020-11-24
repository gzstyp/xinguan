<template>
	<view>
		<titlebar title="首页"></titlebar>
    <view class="container">
      <view class="container-box">
        <view class="container-item" @click="manage">经营场所录入</view>
        <view class="container-item" @click="environment">环境监测录入</view>
        <view class="container-item" @click="employee">从业人员录入</view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
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
    align-items: center !important;
    justify-content:center !important;
    background-color: #fff;
  }
  .container {
    justify-content:center;
    align-items: center;
    display: flex;
    .container-box {
      width: 100%;
      .container-item{
        padding: 12px 22px;
        border-radius: 5px;
        background-color: $mk-base-color;
        font-size: 16px;
        font-weight: bold;
        &:nth-child(n+2){
          margin-top: 10px;
        }
      }
    }
  }
</style>