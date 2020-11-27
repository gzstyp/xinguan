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
        backType : 3,//跳转页面方式[1 : redirectTo 2 : switchTab]
        backPage : '',
        parentType : 3,//跳转页面方式[1 : redirectTo 2 : switchTab]
        parentPage : '',//backPage的上一级页面路径
        msg : '',
        btnText : '登录认证',
        formData : {
          username : '',
          password : ''
        }
      }
		},
		onLoad(params) {
      const {backpage,backtype,parentType,parentPage} = params;
      if(backpage){
        this.backType = backtype;
        this.backPage = backpage;
        this.parentType = parentType;
        this.parentPage = parentPage;
      }
    },
		methods: {
      clickBack(){
        if(this.backType == 3){
          this.switchTab('/pages/tabbar/my');
        }else{
          if(this.parentType == 1){
            uni.navigateTo({
              url:this.parentPage
            });
          }else{
            uni.switchTab({
              url:this.parentPage
            });
          }
        }
      },
      //登录按钮返回Skip
      loginBack(){
        if(this.backType == 1){
          uni.navigateTo({
            url:this.backPage
          });
        }else{
          uni.switchTab({
            url:this.backPage
          });
        }
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
        this.$api.userLogin('login',{username:this.formData.username,password:this.formData.password,type:1}).then(result =>{
          const {code,msg,data} = result;
          if(code == 200){
            this.btnText = '登录成功';
            this.$store.dispatch('setDataToken',{accessToken:data.accessToken,refreshToken:data.refreshToken});
            uni.$emit('loginInfo',{username : this.formData.username});
            this.$store.dispatch('set_userinfo',{username : this.formData.username});
            //未登录跳转到登录页面
            if(this.backType != 3){//说明不是从账号'登录按钮'跳转来的
              this.loginBack();
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
          this.msg = '连接服务器失败,请检查网络!';
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
  page {
    width: 100% !important;
    height: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .container {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100vw;
    .container-box {
      width: 100%;
      height: 100%;
      .container-item {
        width: 70%;
        margin: 0px auto;
        border-radius: 5px;
        font-size: 16px;
        &:nth-child(n+2) { //索引从0开始
          margin-top: 8px;
        }
        input {
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          height: 38px;
          line-height: 38px;
          padding: 0 4px;
          font-size: 14px;
        }
        .item-btn {
          width: 100%;
          background-color: $mk-base-color;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
        }
        .item-btn-hover {
          background-color: $mk-hover;
        }
        .item-forget {
          width: 100%;
          height: 38px;
          line-height: 38px;
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
        }
        .item-forget-hover {
          color: $mk-base-color;
        }
      }
    }
  }
  .bottom-tips {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    color: $mk-warn;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
</style>