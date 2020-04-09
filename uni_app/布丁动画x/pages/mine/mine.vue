<template>
	<view class="mine">
		<view style="background-image: url(../../static/10.jpg);height: 422rpx;background-size: 100%;background-repeat: no-repeat;text-align: center;" class="top">
			<image style="width: 20%;margin-top: 8%;" src="../../static/icon_guide_pudding_girl.png" mode="widthFix"></image><br><text style="background-color: #DD524D; padding: 0 4%;  color: #F8F8F8;border-radius: 9999rpx;">{{this.$user.username}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.mine{
	width: 750rpx;
}
</style>
