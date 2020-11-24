<template>
	<view class="titlebar">
		<view class="titlebar-fixed">
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<view class="titlebar-content" :style="{height:navBarHeight + 'px',width:windowWidth+'px'}">
				<!-- 返回箭头 -->
			<view v-if="backIcon" class="titlebar-content-search-icons" @click="back">
			<uni-icons type="back" size="24" color="#fff"></uni-icons>
        </view>
        <!-- 标题 -->
        <view class="titlebar-search">
          <view class="titlebar-search_text">{{title}}</view>
        </view>
			</view>
		</view>
		<view :style="{height:statusBarHeight + navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
    props : {
      backIcon : {
        type : Boolean,
        default : false
      },
      title : {
        type : String,
        default : ''
      }
    },
		data() {
			return {
				statusBarHeight : 20,//默认状态栏的高度
				navBarHeight : 45,//在html中是45px的高度
				windowWidth : 375,
        val : ''
			};
		},
    watch:{
      //监听实时输入的内容,todo,重点!!!
      value(newValue){
        this.val = newValue;
      }
    },
		created() {
			//同步方法,获取手机系统系统
			const info = uni.getSystemInfoSync();
			/* 设置状态栏的高度 */
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			//(胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight);
			//this.windowWidth = menuButtonInfo.left;//胶囊的宽度
			// #endif
		},
    methods : {
      back(){
        this.$emit('clickBack');
      }
    }
	}
</script>

<style lang="scss">
	.titlebar{
		.titlebar-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width:100%;
			background-color: $mk-base-color;
			.titlebar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;//解决微信小程序状态栏
				box-sizing: border-box;/* 让子元素仅在本容器内显示,即在盒内显示 */
				.titlebar-search{
					display: flex;
          background-color: $mk-base-color;
					width: 100%;
					height: 30px;
					.titlebar-search_icon{
						margin-right: 10px;
						margin-top: 2px;
					}
					.titlebar-search_text{
            width: 100%;
						font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            box-sizing: border-box;
            display: -webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1;
            text-overflow: ellipsis;
            overflow: hidden;
					}
				}
			}
		}
	}
</style>