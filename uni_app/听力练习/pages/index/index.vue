<template>
	<view>
		<view  v-html="html">
			
		</view>
		<button @click="tologin">去登陆</button>
		</view>
	
</template>
<script>
	export default{
		onLoad() {
		},
		data(){
			return{
				word:'',
				words:[],
				html:''
			}
		},
		onShow() {
			if(this.word!==window.innerText0){
				this.html=''
			this.word=window.innerText0
			console.log(window.i)
			this.words[window.i]=window.innerText0
			window.i=window.i+1
			console.log(this.words)
			for(var q=0;q<window.i;q++){
			this.html+="<p id="+q+">"+this.words[q]+"</p>"}}
		},
		methods:{
			tologin(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>
<style>
	
</style>
