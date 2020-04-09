<template>
	<view>
			<button type="primary" @click="openMaskAndContent">布丁布丁！！！</button>
		<maskAndContent type="custom" ref="maskAndContent">
			<view style="color: #fff;">
				<image src="../../static/bg_splash.png" mode="widthFix"></image>
			</view>
		</maskAndContent>
	</view>
</template>

<script>
	import maskAndContent from '@/components/QS-maskAndContent/QS-maskAndContent.vue';
	let qiandao;
	export default {
		components:{ maskAndContent },
		data() {
			return {
				
			}
		},
		onLoad() {
			// uni.showTabBar({
			// 	animation: true
			// })
			
		},
		onReady() {qiandao=this.$refs.maskAndContent},
		methods: {
			openMaskAndContent() {
				qiandao.show();
			}
		}
	}
</script>

<style>
image{
	width: 100%;
	height: 100%;
	}
</style>
