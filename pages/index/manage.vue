<template>
	<view>
		<titlebar backIcon title="经营场所录入" @clickBack="clickBack"></titlebar>
    <view class="input-item-container">
        <view class="input-item-box">
          <view class="input-item-label">
            <text>区域市(州)</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="请选择市(州)"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>区域县(区)</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="请选择县(区)"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>场所名称</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="选择场所名称"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>场所类型</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="选择场所类型"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>联系人</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="联系人姓名"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>联系电话</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="联系电话"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>场所地址</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="输入地址"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>是否有冷冻冷藏产品</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="请选择"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>是否含有冷冻进口产品</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="请选择"/>
          </view>
        </view>
        <view class="input-item-box">
          <view class="input-item-label">
            <text>含有高中风险地区产品</text>
          </view>
          <view class="input-item-input">
            <input type="text" placeholder="请选择"/>
          </view>
        </view>
        <!-- 保留防止被底部遮挡 -->
        <view class="input-item-box last-blank">
          <view class="input-item-label">
          </view>
          <view class="input-item-input">
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
		beforeCreate(){
		  /* const check = this.checkLogin('/pages/index/manage',1,'/pages/tabbar/index',2);
		  if(!check)return; */
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
  .input-item-container{
    .input-item-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 60px;
      padding: 10px 0;
      margin-right: 14px;
      box-sizing: border-box;
      background-color: #fff;
      &:nth-of-type(n+2){//n是从0开始
        margin-top:2px;
      }
      .input-item-label{
        width: 360px;
        margin-left: 14px;
        font-size: 22px;
        height: 30px;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .input-item-input{
        width: 100%;
        margin-right: 14px;
        input{
          height: 30px;
          line-height: 30px;
          text-align: right;
          padding: 0 4px;
        }
      }
    }
    // 附加的样式,即在class 添加一个class ;必须有空格!!!
    & .last-blank{
      background-color: #f5f5f5;
    }
  }
</style>