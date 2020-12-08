<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
  /* 和左边的文字有点距离 */
  input{
    font-size: 20px;
  }

  /* 按钮 */
  .botton-backtrack{
    font-size: 18px;
  	height: 50px;
  	line-height: 50px;
  	width: 100%;
  	text-align: center;
  	background: #15B8F2;
  	color: #ffffff;
  	display: flex;
  	justify-content: center;
  	position:fixed;
  	bottom: 0;
    left: 0;
    right: 0;
  	z-index: 10;
  }
  .botton-backtrack-hover{
    background:#179cef;
  }
</style>