<template>
	<view>
		<titlebar backIcon title="账号登录" @clickBack="clickBack"></titlebar>
    <view class="container">
      <view class="container-box">
        <view class="container-item">
          <input type="text" v-model="formData.username" placeholder="输入登录账号" />
        </view>
        <view class="container-item">
          <input type="password" v-model="formData.password" placeholder="输入登录密码" />
        </view>
        <view class="container-item" @click="userLogin">
          <view class="item-btn" hover-class="item-btn-hover">
            <text>{{btnText}}</text>
          </view>
        </view>
        <view class="container-item">
          <view class="item-forget" hover-class="item-forget-hover" @click="forgetPassword">
            <text>忘记密码</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-tips" v-if="msg.length > 0">
    	<text>{{msg}}</text>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        backType : 3,
        backPage : '',
        msg : '',
        btnText : '登录认证',
        formData : {
          username : '',
          password : ''
        }
      }
		},
		onLoad(params) {
      const {backpage,backtype} = params;
      if(backpage){
        this.backType = backtype;
        this.backPage = backpage;
      }
    },
		methods: {
      clickBack(){
        this.switchTab('/pages/tabbar/my');
      },
      userLogin(){
        if(this.formData.username.length <= 0){
          this.msg = '请输入登录账号';
          return;
        }
        if(this.formData.password.length <= 0){
          this.msg = '请输入登录密码';
          return;
        }
        this.msg = '';
        this.btnText = '正在登录……';
        this.$api.userLogin(this.baseApi + 'login',{username:this.formData.username,password:this.formData.password,type:1}).then(result =>{
          const {code,msg,data} = result;
          if(code === 200){
            this.btnText = '登录成功';
            this.$store.dispatch('setDataToken',{accessToken:data.accessToken,refreshToken:data.refreshToken});
            uni.$emit('loginInfo',{username : this.formData.username});
            this.$store.dispatch('set_userinfo',{username : this.formData.username});
            //未登录跳转到登录页面
            if(this.backType !== 3){
              if(this.backType == 1){
                uni.navigateTo({
                  url:this.backPage
                });
              }else{
                uni.switchTab({
                  url:this.backPage
                });
              }
            }else{
              setTimeout(()=>{
                this.clickBack();
              },300);
            }
          }else{
            this.msg = msg;
            this.btnText = '登录认证';
          }
        }).catch(err =>{
          console.info(err);
          this.btnText = '登录认证';
        });
      },
      forgetPassword(){
        this.msg = '请联系管理员帮你重置密码';
        setTimeout(()=>{
          this.msg = '';
        },2500);
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
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        &:nth-child(n+2){
          //margin-top: 10px;
        }
        input{
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          height: 36px;
          line-height: 36px;
          padding: 0 4px;
          font-size: 14px;
        }
        .item-btn{
          width: 100%;
          background-color:$mk-base-color;
          height:38px;
          line-height:38px;
          border-radius:4px;
          display: flex;
          justify-content:center;
          align-items:center;
          font-size:16px;
        }
        .item-btn-hover{
          background-color:$mk-hover;
        }
        .item-forget{
          width: 100%;
          height:38px;
          line-height:38px;
          display:flex;
          justify-content:flex-end;
          font-size:16px;
        }
        .item-forget-hover{
          color:$mk-base-color;
        }
      }
    }
  }
  .bottom-tips{
  	   height:40px;
  	   line-height: 40px;
  	   width: 100%;
  	   text-align: center;
  	   color: $mk-warn;
  	   display: flex;
  	   justify-content: center;
  	   position:fixed;
  	   bottom:0px;
       left: 0;
       right: 0;
  	   z-index: 10;
  }
</style>