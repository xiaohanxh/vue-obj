<template>
	<view>
		<view v-for="(item,i) in src" :key=i>
		<image :src="item" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:[]
			}
		},
		onLoad() {
			for(var i=0;i<=20;i++){
			this.src[i]='https://gitee.com/xhqy/xhqy/blob/master/'+(i+1)+'.jpg'}
			
			console.log(this.src)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
