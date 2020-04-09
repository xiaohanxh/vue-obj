<template>
	<view class="yiciyuan">
		<view style="height: 30rpx;background-color: #F0F0F0;"></view>
		<view style="height: 20rpx;background-color: #ffffff;"></view>
		<view class="tp">
			<view style="background-image: url(../../static/user_icon_picture.png);background-size: 12%; background-repeat:no-repeat;margin-left: 4%;height: 17%;">
				<view style="margin-left: 15%;padding-top: 3%;">图片<text @click="xq" style="padding-left: 42%;"> {{sss}}张新图片 ></text></view>
			</view>
			<view style="height: 20rpx;background-color: #ffffff;"></view>
			<view style="display:inline;">
<table style="margin-top: 3%;display: inline;">	
	<tr><td rowspan="2">	<image style="width: 357rpx;margin-left: 3%;border-radius:19rpx;" src="../../static/8.jpg" mode="widthFix"></image></td>
        <td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/6.jpg" mode="widthFix"></image></td>
		 <td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/9.jpg" mode="widthFix"></image></td>
		 </tr><tr>
        <td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/7.jpg" mode="widthFix"></image></td>
        <td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/5.jpg" mode="widthFix"></image></td>
		</tr>
</table></view>
		</view>
		<view style="height: 20rpx;background-color: #ffffff;margin-top: 6%;"></view>
		<view class="body">
			<view style="background-image: url(../../static/user_icon_picture.png);background-size: 12%;background-repeat:no-repeat;margin-left: 4%;">
				<view style="margin-left: 15%;padding-top: 3%;padding-bottom: 3%;">小组<text style="padding-left: 42%;"> {{sst}}个新主题 ></text></view>
			</view>
			<view>
				<table>
					<tr>
						<td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/1.jpg" mode="widthFix"></image></td><td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/2.jpg" mode="widthFix"></image></td><td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/3.jpg" mode="widthFix"></image></td><td><image style="width: 175rpx;margin-left: 10%;border-radius:12rpx;" src="../../static/4.jpg" mode="widthFix"></image></td>
					</tr>
					<tr style="text-align: center;">
						<td>123</td><td>123</td><td>123</td><td>123</td>
					</tr>
				</table>
			</view>
			<view>
			</view>
		</view>
		<view style="height: 355rpx;background-color: #F0F0F0;"></view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				sss:877,
				sst:770
			}
		},
		methods:{
			xq(){
				uni.navigateTo({
					url:'../tupian/tupian'
				})
			}
		}
	}
</script>
<style lang="scss">
	.yiciyuan{
		background-color: #F0F0F0;
		width: 750rpx;
		height: 100%;
		.tp{
			background-color: #FFFFFF;
			height: 500rpx;
		}
		.body{
			background-color: #FFFFFF;
		}
	}
</style>
