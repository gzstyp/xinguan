<template>
	<view>
    <titlebar title="我的"></titlebar>
    <view class="my-header">
      <view class="my-header-background">
        <image src="/static/logo.png" mode="aspectFill"></image>
      </view>
      <view class="my-header-logo">
        <view class="my-header_logo_box">
          <image src="/static/logo.png" mode="aspectFill"></image>
        </view>
        <text class="my-header_name">{{person.username}}</text>
      </view>
      <!-- 关注-->
      <view class="my-header-info">
        <view class="my-header-info_box">
          <text class="my-header-info-title">已完成</text>
          <text>0</text>
        </view>
      </view>
    </view>
    <view class="my-content">
      <view class="my-content_list" @click="login">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="person" size="16" color="#666"></uni-icons>
          <text>{{loginTips}}</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
      <view class="my-content_list" @click="myArticle">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="list" size="16" color="#666"></uni-icons>
          <text>我的登记</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
      <view class="my-content_list" @click="help">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>帮助中心</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#666"></uni-icons>
      </view>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';
	export default {
		data() {
			return {
        loginTips : '账号登录',
        person : {
          username : '未登录'
        }
      }
		},
    computed:{
      ...mapState(['userinfo'])//取值:{{userinfo.xxx}} 或 this.userinfo;
    },
    //注意:onLoad 是在页面有效,created在组件里有效
    onLoad() {
        this.showInfo();//这个调用和下面的onShow()要一起使用,不能删除!!!
    },
    onShow(){
      this.showInfo();//这个调用和上面的onLoad()要一起使用,不能删除!!!
    },
    //注意:onLoad 是在页面有效,created在组件里有效
    created() {
      //全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
      uni.$on('loginInfo',(userinfo)=>{
        this.person = userinfo;
        this.loginTips = '切换账号';
      });
    },
    methods : {
      showInfo(){
        if(this.userinfo.username){
          this.person.username = this.userinfo.username;
          this.loginTips = '切换账号';
        }
        const exist = uni.getStorageSync('USERINFO');//处理是否已退出注销
        if(!exist){
          this.person.username = '未登录';
          this.loginTips = '账号登录';
        }
      },
      login(){
        uni.navigateTo({
          url:'/pages/my/login'
        });
      },
      //我的登记
      myArticle(){
        uni.navigateTo({
          url:'/pages/my/myRegister'
        });
      },
      //帮助中心
      help(){
        uni.navigateTo({
          url:'/pages/my/help'
        });
      }
    }
	}
</script>

<style lang="scss">
  page{
    background-color: #f5f5f5;
  }
  .my-header{
    position: relative;
    padding-bottom: 15px;
    //上部分的虚幻背景,模糊感觉,高度仅在父容器的高度
    .my-header-background{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(8px);/* 模糊 */
      opacity: 0.3;/* 透明度 */
      image{
        width: 100%;
        height: 100%;
      }
    }
    //头像+作者名字的样式
    .my-header-logo{
      display: flex;
      flex-direction: column;/* 垂直排列 */
      align-items: center;
      padding-top: 30px;
      //头像,图片一般要给一个容器包裹,给定宽高度，防止被挤压然后image宽高度100%
      .my-header_logo_box{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        image{
          height: 100%;
          width: 100%;
        }
      }
      .my-header_name{
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .my-header-info{
      margin-top: 14px;
      //让3个文字和数字水平排列
      display: flex;
      //让文字和数字上下垂直排列
      .my-header-info_box{
        display: flex;
        flex-direction: column;/* 上下垂直排列 */
        justify-content: center;/* 左右居中 */
        align-items: center;/* 上下居中 */
        width: 100%;
        font-size: 12px;
        color: #999;
        //让文字变粗且换个颜色
        .my-header-info-title{
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .my-content{
    /* 列表的左边一个图标和文字,右边一个箭头图标 */
    .my-content_list{
      display:flex;
      justify-content:space-between;/*使子元素左右对齐，子元素两端对齐*/
      padding:15px;
      margin-top: 10px;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      .my-content-list-title{
        display: flex;
        align-items: center;/* 垂直方向排列,即让内容垂直居中对齐 */
        /* 和左边的文字有点距离 */
        .icons{
          margin-right:6px;
        }
      }
    }
  }
</style>