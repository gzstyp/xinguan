<template>
	<view class="follow">
    <titlebar title="核酸日报表"></titlebar>
    <!-- 切换导航栏 -->
    <view class="follow-tab">
      <view class="follow-tab-box">
        <!-- 其中active是类名 -->
        <view class="follow-tab-item" :class="{active:activeIndex ===0}" @click="tab(0)">应检尽检</view>
        <view class="follow-tab-item" :class="{active:activeIndex ===1}" @click="tab(1)">愿检尽检</view>
        <view class="follow-tab-item" :class="{active:activeIndex ===2}" @click="tab(2)">核酸总计</view>
      </view>
    </view>
    <view class="follow-list">
      <swiper class="follow-list-swiper" :current="activeIndex" @change="change">
        <swiper-item>
          <view class="swiper-box">
            <view class="swiper-box-item" v-for="item in listYingJian" :key="item.kid" @click="openDialog(item.name,item.kid)">
              <view class="box-item-title">
                <uni-icons type="compose" size="30" color="#000"></uni-icons>
                <text>{{item.name}}</text>
              </view>
              <view class="box-item-detail" v-for="child in item.childData" :key="child.kid">
                <view class="detail-item">
                  <text>{{child.value}}</text>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-box">
            <view class="swiper-box-item" v-for="item in listYuanJian" :key="item.kid" @click="openDialog(item.name,item.kid)">
              <view class="box-item-title">
                <uni-icons type="compose" size="30" color="#000"></uni-icons>
                <text>{{item.name}}</text>
              </view>
              <view class="box-item-detail" v-for="child in item.childData" :key="child.kid">
                <view class="detail-item">
                  <text>{{child.value}}</text>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="total-container">

            <view class="total-box" v-for="item in totalItems" :key="item.kid">
              <view class="total-item">
                <view class="total-item-list">
                  <view class="total-list-head">{{item.itemName}}</view>

                  <view class="total-list-content" v-for="(sub,index) in item.listItems" :key="index">
                    <view>{{sub.item}}</view>
                    <view>{{sub.value}}(人)</view>
                  </view>

                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 如何触发呢???先指定一个组件节点,即 ref="dialog" ,通过 ref可以获取组件节点的信息,可以对它进行一些操作 -->
    <uni-popup ref="dialog" type="bottom" :maskClick="false"><!-- maskClick是蒙版点击是否关闭弹窗 -->
      <view class="popup-wrap">
        <view class="popup-header">
          <text class="popup-header_item" @click="close">取消</text>
          <text class="popup-header_item header-title">{{dialogTitle}}</text>
          <text class="popup-header_item" @click="submit">提交</text>
        </view>
        <view class="popup-content">
          <view class="dialog-box">
            <view class="dialog-box-item">
              <view class="box-item-label">已采样人数</view>
              <view class="box-item-input"><input type="text" placeholder="人数"/></view>
            </view>
            <view class="dialog-box-item">
              <view class="box-item-label">已检测人数</view>
              <view class="box-item-input"><input type="text" placeholder="人数"/></view>
            </view>
            <view class="dialog-box-item">
              <view class="box-item-label">检测阳性人数</view>
              <view class="box-item-input"><input type="text" placeholder="人数"/></view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
        activeIndex : 0,
        listYingJian : [
          {
            kid : "10001",
            name : "密切接触者"
          },
          {
            kid : "10002",
            name : "境外入境人员"
          },
          {
            kid : "10003",
            name : "中高风险地区来黔人员"
          },
          {
            kid : "10004",
            name : "发热门诊就诊患者"
          },
          {
            kid : "10005",
            name : "新住院病人"
          },
          {
            kid : "10006",
            name : "陪护人员"
          },
          {
            kid : "10007",
            name : "医疗机构工作人员"
          },
          {
            kid : "10008",
            name : "口岸检疫和边防检查人员",
            childData : [
              {
                kid : '102401',
                value : '已采样人数(105)'
              },
              {
                kid : '102402',
                value : '已检测人数(96)'
              },
              {
                kid : '102403',
                value : '检测阳性人数(0)'
              },
            ]

          },
          {
            kid : "10009",
            name : "监所工作人员"
          },
          {
            kid : "10010",
            name : "社会福利养老机构工作人员"
          },
          {
            kid : "10011",
            name : "外省返黔师生"
          },
          {
            kid : "10012",
            name : "其他人群"
          }
        ],
        listYuanJian : [
          {
            kid : "20001",
            name : "机关事业单位人员",
            childData : [
              {
                kid : '102401',
                value : '已采样人数(511)'
              },
              {
                kid : '102402',
                value : '已检测人数(408)'
              },
              {
                kid : '102403',
                value : '检测阳性人数(1)'
              },
            ]
          },
          {
            kid : "20002",
            name : "企业人员"
          },
          {
            kid : "20003",
            name : "服务行业人员"
          },
          {
            kid : "20004",
            name : "其他人员",
            childData : [
              {
                kid : '102401',
                value : '已采样人数(105)'
              },
              {
                kid : '102402',
                value : '已检测人数(96)'
              },
              {
                kid : '102403',
                value : '检测阳性人数(0)'
              },
            ]
          }
        ],
        articleShow : false,//默认不让其显示,等第1次加载玩没有数据时才显示
        commentsValue : '',
        dialogTitle : '',
        totalItems : [
          {
            kid : '1000201',
            itemName : "\"应检尽检\"人群合计",
            listItems : [
              {
                item : "已采样人数",
                value : "1023"
              },
              {
                item : "已检测人数",
                value : "1020"
              },
              {
                item : "检测阳性人数",
                value : "1"
              }
            ]
          },
          {
            kid : '1000202',
            itemName : "\"愿检尽检\"人群合计",
            listItems : [
              {
                item : "已采样人数",
                value : "3501"
              },
              {
                item : "已检测人数",
                value : "3500"
              },
              {
                item : "检测阳性人数",
                value : "0"
              }
            ]
          },
          {
            kid : '1000203',
            itemName : "核酸总计",
            listItems : [
              {
                item : "已采样人数",
                value : "4500"
              },
              {
                item : "已检测人数",
                value : "4002"
              },
              {
                item : "检测阳性人数",
                value : "1"
              }
            ]
          }
        ]
			}
		},
    onLoad(){
      //全局的自定义事件,刷新页面数据,它只能在已打开的页面才触发!!!
      uni.$on('update_article',()=>{
        this.gerFollow();
      });
      //全局的自定义事件,在其它页面或组件关注作者操作时重新获取数据,它只能在已打开的页面才触发!!!
      uni.$on('update_author',()=>{
        this.getAuthor();
      });
      this.gerFollow();
      this.getAuthor();
    },
		methods: {
      change(e){
        this.activeIndex = e.detail.current;
      },
      tab : function(index){
        this.activeIndex = index;
      },
      gerFollow(){},
      getAuthor(){},
      //打开窗口
      openDialog(title,kid){
        this.dialogTitle = title;
        //dialog是名,即上面的 ref="dialog"
        this.$refs.dialog.open();
      },
      //关闭弹窗
      close(){
        //dialog是名,即上面的 ref="dialog"
        this.$refs.dialog.close();
      },
      submit(){
      }
		}
	}
</script>

<style lang="scss">
  page{
    height: 100%;
    display: flex;
  }
  .follow{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;//让页面撑起来???
    width: 100%;//这个也可以让页面撑起来
    box-sizing: border-box;/* 若高度是100%没有看到下边框的话,加上这个就可以 */
    .follow-tab{
      height: 44px;
      line-height: 44px;
      padding: 10px 15px;
      border-bottom: 1px solid #f5f5f5;
      .follow-tab-box{
        display: flex;
        height: 100%;//因为外层已指定高度,所以给100%高度
        width: 100%;//因为外层已指定高度,所以给100%宽度
        border-radius: 5px;
        border: 1px solid $mk-base-color;
        .follow-tab-item{
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 20px;
          width: 100%;
          &:nth-of-type(n+1){
            border-right: 1px solid $mk-base-color;
          }
          &:last-child{
            border-right: none;
          }
          /* 附加,用法：follow-tab-item active */
          &.active{
            color: #f07373;
          }
        }
      }
    }
    .follow-list{
      height: 100%;
      .follow-list-swiper{
        padding: 0 15px;
        height: 100%;
        .swiper-item{
          height: 100%;
        }
        .swiper-box{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          height: 120px;
          .swiper-box-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4px 2px;
            border-radius: 6px;
            border: 1px solid #dadada;
            height: 124px;
            width: 48.5%;
            font-size: 20px;
            background-color: #f8f8f8;
            box-shadow: 2px 10px 8px rgba(0, 0, 0, 0.2);
            margin-top:14px;
            .box-item-title{
              color: #000;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .box-item-detail{
              display: flex;
              flex-direction: column;
              align-items:center;
              font-size: 18px;
              width: 100%;
              height: 100%;
              .detail-item{
                display: flex;
                flex-direction: column;
                width: 150px;
                color: #5d5d5d;
              }
            }
          }
        }
      }
    }
  }

  .total-container{
    flex-direction: column;
    display: flex;
    padding-top: 10px;
    .total-box{
      display: flex;
      justify-content: center;
      width: 100%;
      height: 200px;
      &:nth-of-type(n+1){
        margin-top: 30px;
      }
      .total-item{
        align-items: center;
        justify-content: center;
        border: 1px solid #dadada;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        padding: 8px;
        .total-item-list{
          flex-direction: column;
          .total-list-head{
            width: 100%;
            justify-content: center;
            display: flex;
            font-size: 22px;
            height: 30px;
            color: $mk-base-color;
          }
          .total-list-content{
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #bcbcbc;
            font-size: 20px;
            height: 30px;
            padding: 10px 0;
            color: #999;
          }
        }
      }
    }
  }

  .popup-wrap {
  		background-color: #fff;
  		.popup-header {
  			display: flex;
  			justify-content: space-between;/*子元素两端对齐，项目之间的间隔都相等*/
  			font-size: 20px;
  			color: #666;
  			border-bottom: 1px #F5F5F5 solid;
  			.popup-header_item {
  				height: 50px;
  				line-height: 50px;
  				padding: 0 15px;
          &.header-title{
            color: #F00;
          }
  			}
  		}
  		.popup-content {
  			width: 100%;
  			padding: 15px;
  			box-sizing: border-box;
        height: 250px;
        .dialog-box{
          width: 100%;
          .dialog-box-item{
            display: flex;
            height: 48px;
            line-height: 48px;
            justify-content: space-between;
            font-size: 18px;
            border-bottom: 1px solid #bcbcbc;
            .box-item-label{
              width: 40%;
            }
            .box-item-input{
              width: 60%;
              input{
                height: 48px;
                line-height: 48px;
                padding: 0 4px;
                text-align: right;
              }
            }
          }
        }
  		}
  	}
</style>