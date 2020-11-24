<template>
	<view class="empty">
    <uni-icons type="search" size="16" color="#999"></uni-icons>
		<view class="empty-text">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default{
		name:'empty',
    props:{
      text : {
        type : String,
        default : '此地空空如也'
      }
    }
	}
</script>

<style lang="scss">
	.empty{
		position:fixed;
    display:flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items:center;
		background-color: #fff;
		.empty-text{
			font-size: 14px;
			color: #999;
		}
	}
</style>