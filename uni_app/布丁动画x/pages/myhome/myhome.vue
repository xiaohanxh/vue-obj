<template>
	<view>
		<view @click="phone">联系电话： 158-9143-0190 ( 点击拨打 )</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber: '15891430190'
				})
			}
		}
	}
</script>

<style>

</style>
