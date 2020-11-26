<template>
	<view>
		<titlebar title="首页"></titlebar>
    <view class="container">
      <view class="container-box">
        <view class="container-item" @click="manage">经营场所录入</view>
        <view class="container-item" @click="environment">环境监测录入</view>
        <view class="container-item" @click="employee">从业人员录入</view>
        <view class="container-item" @click="openSqlite">openSqlite</view>
        <view class="container-item" @click="createTable">createTable</view>
        <view class="container-item" @click="add">add</view>
        <view class="container-item" @click="query">query</view>
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
      },
      openSqlite(){
        this.$db.openSqlite().then(data =>{
          console.info(data);
        }).catch(err =>{
        console.info(err);
        });
      },
      createTable(){
        this.$db.createTable().then(data =>{
          console.info(data);
        }).catch(err =>{
          console.info(err);
        });
      },
      add(){
        const params = {
          id : 6,
          name : '田卓智',
          gender : 1,//1男2女3未知
          avatar : 'http://www.yinlz.com/images/img11.png'
        };
        this.$db.add(params).then(data =>{
          console.info(data);
        }).catch(err =>{
          console.info(err);
        });
      },
      query(){
        const params = {

          gender : 1
        };
        this.$db.query({}).then(data =>{
          console.info(data);
        }).catch(err =>{
          console.info(err);
        });
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