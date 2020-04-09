<template>
	<view>
		<view class="vid">
			<image :src="pic"></image>
		</view>
	<view class="title" >
			<text>{{title}}</text>
	</view>
		<view class="xinxi">
			<image :src="upface"></image>
		<view></view>up:{{up}}
		</view>
		{{jianjie}}
		{{biaoqian}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jianjie: '',
				up: '',
				title: '',
				upface: '',
				biaoqian: '',
				pic: ''
			}
		},
		onLoad(data) {
		data =	JSON.parse(data.data)
		this.jianjie=data.desc
		this.up=data.owner.name
		this.title=data.title
		this.upface=data.owner.face
		this.biaoian=data.dynamic
		this.pic=data.pic
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.vid{
	padding-top: 3%;
	width: 750rpx;
	height: 380rpx;
	image{
		height: 100%;
		width: 100%;
	}
}
.xinxi{
	padding-top: 3%;
	width: 750rpx;
	height: 400rpx;
	image{
		width: 25%;
		height: 50%;
		border-radius:900px;
	}
}
.title{
	text-align:center;
	margin-top: 1%;
}
</style>
