<template>
	<view>
		<view class="login">
			<input type="text" v-model="user.Username"/>
			<input type="password" v-model="user.Password"/>
			<input type="text" v-model="user.email" v-if="register0" />
			<button @click="login">登录</button>
			<button @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					Username:'',
					Password:'',
					email:''
				},
				register0:false
			};
		},
		methods:{
			login(){
				if(!this.register0){
				console.log(this.user)
				uni.showToast({
					title: '登陆成功',
					icon: 'none',
				});
				setTimeout(()=>{
					uni.switchTab({
						url:'../2/2'
					})
				},1500)}else{
					this.register0=false
				}
			},
			register(){
				if(!this.register0){
					this.register0=true
				}else{
					uni.showToast({
						title: '注册成功',
						icon: 'none',
					});
					this.register0=false
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
