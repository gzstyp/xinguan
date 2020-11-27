<template>
	<view>
		<titlebar backIcon title="环境监测录入" @clickBack="clickBack"></titlebar>
    <view class="content-container">
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">市(州)</view>
          <input type="text" placeholder="请选择市(州)"/>
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">县(区)</view>
          <input type="text" placeholder="请选择县(区)"/>
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">从业场所名称</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">从业场所类型</view>
          <input type="text" />
        </view>
      </view>
      <!-- 若从业场所类型为冷库请选择类型 -->
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">冷库类型</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">工种</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">冷链从业人员</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">样本类型</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">采样日期</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">检测日期</view>
          <input type="text" />
        </view>
      </view>
      <view class="content-list-box">
        <view class="content-list-item">
          <view class="item-label">检测结果</view>
          <input type="text" />
        </view>
      </view>
    </view>
    <view class="botton-backtrack" hover-class="botton-backtrack-hover">
    	<text>提交</text>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
    beforeCreate() {
      const check = this.checkLogin('/pages/index/environment',1,'/pages/tabbar/index',2);
      if(!check)return;
    },
		methods: {
      clickBack(){
        this.switchTab('/pages/tabbar/index');
      }
		}
	}
</script>

<style lang="scss">
  page{
    background-color: #f5f5f5;
  }
  .content-container{
    margin-bottom: 40px;/* 底部按钮的高度 */
    .content-list-box{
      &:nth-of-type(n+2) {//n是从0开始
        margin-top:2px;
      }
      display:flex;
      justify-content:space-between;/*使子元素左右对齐，子元素两端对齐*/
      padding:8px;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      .content-list-item{
        display: flex;
        align-items: center;/* 让子元素垂直排列 */
        /* 和左边的文字有点距离 */
        .item-label{
          margin-right:6px;
          width: 150px;
        }
        input{
          //border-bottom:1px solid #c7c7c7;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  /* 按钮 */
  .botton-backtrack{
  	   height:40px;
  	   line-height: 40px;
  	   width: 100%;
  	   text-align: center;
  	   background: $mk-base-color;
  	   color: #ffffff;
  	   display: flex;
  	   justify-content: center;
  	   position:fixed;
  	   bottom:0px;
  	   z-index: 10;
  }
  .botton-backtrack-hover{
       background: $mk-hover;
  }
</style>