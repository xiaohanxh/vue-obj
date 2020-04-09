<template>
	<view class="fanzu">
		<maskAndContent type="custom" ref="qiandao">
			<view class="qd" style="color: #fff;">
				<view style="background-image: url(../../static/mine_bg_checked_in.png);height: 820rpx;background-size: 100%;width: 125%;margin-left: 10%;">
					<view class="guozi">
					今天被金闪闪的王之宝库击中了，竟然获得了60个菓子！！ 
					</view>
					<view>
						<button type="default" @click="closeqiandao()">确定</button>
					</view>
				</view>
			</view>
		</maskAndContent>
		<maskAndContent type="custom" ref="denglu">
			<view class="login" style="background-color: #FFFFFF;" >
				<view class="logina" style="background-image:url(../../static/login_dialog_bg.png);" >登陆同步追番记录</view>————————————选择登陆方式————————————
				<image src="../../static/user_login_sina.png" mode="widthFix" @click="web()"></image>
				<image src="../../static/user_login_qq.png" mode="widthFix" @click="qq()"></image>
			</view>
		</maskAndContent>
		<maskAndContent 
		type="twoDimensionSwiper" 
		:imageArray="img" 
		ref="guozi"
		 everyTimeCountSwiperHeight
		 :dataSet="dataSet"></maskAndContent>
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
		<hj-dragabledrawer :options="options" ref="dragBox" @open="afterOpen" @close="afterClose">
		<div class="aside">
		<view class="content" style="width: 100%; height: 30%; background-image: url(../../static/user_default_banner_bg.jpg);" >
			<image src="../../static/global_avatar.png" mode="widthFix" @click="opendenglu()"></image><br>{{user.username}}
			<view @click="openguozi()" style="background-color: rgba(255,255,255,0.2);height:45rpx ;width: 38%;margin-top: 20rpx;margin-left: 24%;padding-top: 18rpx;padding-bottom: 22rpx;border-radius: 19rpx;padding-right: 3%;">
			<image style="width: 45rpx;margin: 0;padding: 0;padding-right: 20rpx;" src="../../static/ep_icon_coin_white.png" mode="widthFix"> <text style="padding-bottom: 20rpx;">6666.6&nbsp;&nbsp;&nbsp;?</text></image>
		</view>
		</view>
		<div class="body" >
			<div><image src="../../static/mine_icon_user_message.png" mode="widthFix"></image>消息</div>
			<div><image src="../../static/global_header_btn_order_normal.png" mode="widthFix"></image>订单</div>
		</div>
		<div class="footer">
			<image class="footer1" src="../../static/mine_icon_setting.png" mode="widthFix"></image>设置
			<image class="footer2" :src="qdsrc" mode="widthFix"  @click="openqiandao()"></image>
		</div></div>
		</hj-dragabledrawer>
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
	<view style="display: inline;align-items: center;">
	<table><tr><td><input class="sousuo" v-model="sousuo"/></td><td><a :href="sou" style="text-decoration: none;background-color:#F0AD4E;border-radius: 19rpx;" >搜索</a></td></tr></table>
	</view>
		<swiper indicator-dots circular>
			<swiper-item  v-for="(item,i) in bilibili.movie"  :key='i' @click="tomian(bilibili.movie[i])">
					<image :src="item.pic" ></image>
			</swiper-item>
		</swiper>
		<view>
			<image style="width: 45%;height: 90rpx;margin-top: 15rpx;margin-left: 20rpx;" src="../../static/icon_anime_tab_category.png" ></image><image src="../../static/icon_anime_tab_time.png" style="margin-left: 20rpx;width: 45%;height: 90rpx;margin-top: 15rpx;"></image>
		</view>
			<view style="background-image:url(../../static/board_pic_count_bg.png);height: 80rpx;font-size: 50rpx;color: #FFFFFF;width: 100%;"><center>·独创·</center></view>
		<view class="vid_list">
			<view class="vid_item"  v-for="(item,i) in bilibili.dance" :key='i' @click="tomian(bilibili.dance[i])">
				<image :src="item.pic" mode="aspectFill"></image>
				<view class="tit">
					<text>{{item.title}}</text>
				</view><view class="tit_up">
					<text>up主：{{item.owner.name}}</text>
				</view>
			</view>
			<view class="vid_item" v-for="(item,i) in bilibili.music" :key='i' @click="tomian(bilibili.music[i])">
				<image :src="item.pic" mode="aspectFill"></image>
				<view class="tit">
					<text>{{item.title}}</text>
				</view><view class="tit_up">
					<text>up主：{{item.owner.name}}</text>
				</view>
			</view>
			<view class="vid_item" v-for="(item,i) in bilibili.life" :key='i' @click="tomian(bilibili.life[i])" >
				<image :src="item.pic" mode="aspectFill"></image>
				<view class="tit">
					<text>{{item.title}}</text>
				</view><view class="tit_up">
					<text>up主：{{item.owner.name}}</text>
				</view>
			</view>
		</view>
		<view class="isOver" v-if="bk">-------<image src="../../static/font/ghost(1).png" mode=""></image>就算一直拉一直拉，也不会出现更多了------</view>
		</view>
</template>
<script> 
	import Vue from 'vue'
	import maskAndContent from '@/components/QS-maskAndContent/QS-maskAndContent.vue'
    import hjDragabledrawer from '../../components/hj-dragabledrawer/hj-dragabledrawer.vue' //这里修改下插件的相对路径
    let dragBox;
	export default {
		components:{maskAndContent},
		onNavigationBarButtonTap(e) {
		   this.open();  
			uni.hideTabBar()
		},
		data() {
			return {
			bilibili: {},
			user:{
			username:'登陆同步追番记录',
			userid:666666
			},
			bk:false,
			 options: {
				visible: false,
				rightMode: false,
				autoClose: true,
				width: 80
			},
			dataSet: {
					previous_margin: '0',
					next_margin: '0',
					indicator_dots: true,
					indicator_active_color: '#FF5218'
			},				
			img: [
					[
						'../../static/bg_intro_second.png',
						'../../static/bg_intro_third.png'
					]
				],
			topsrc:'../../static/global_avatar.png',
			sousuo:'',
			sou:'',
			qdsrc:'../../static/mine_icon_checkin_2.png'
			}
		},
		onLoad() {
			this.get()
			// uni.showTabBar({animation: true})	
		},
		onReady() {
            dragBox = this.$refs.dragBox;
        },
		onReachBottom(){
			this.gets()
		},
		onPullDownRefresh() {
			this.get(()=>{
				uni.stopPullDownRefresh()
			})
			this.bk=false
		},
		updated() {
			Vue.prototype.$user=this.user
			this.sou='http://www.dilidili3.com/public/api.php?app=search&q='+this.sousuo
		},
	 	methods: {
			openqiandao() {
				this.$refs.qiandao.show();
				this.qdsrc='../../static/mine_icon_checked_in.png'
			},
			closeqiandao() {
				this.$refs.qiandao.hide();
			},
			opendenglu(){
				// this.$refs.denglu.show()
				uni.navigateTo({
					url:'../mine/mine'
				})
			},
			
			openguozi(){
				this.$refs.guozi.show()
			},
			//---------------------------
			web(){
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
				});
			},
			qq(){
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
				});
			},
			// ---------------------------
			open() {
				dragBox.open()
			},
			hello() {
				uni.showToast({
					title: 'hello',
					icon: 'none',
				});
			},
			close(){
				dragBox.close()
			},
			afterOpen() {
				// uni.showToast({
				//     title: 'open',
				//     icon: 'none',
				// });
			},
			afterClose() {
				// uni.showToast({
				//     title: 'close',
				//     icon: 'none',
				// });
				uni.showTabBar()
			},
			// ---------------------------------------------------
			async get (stopre) {
				const res = await this.$myRequest({
								url: 'https://www.bilibili.com/index/ding.json'
							})
				const sou = await this.$myRequest({
								url: 'https://www.bilibili.com/widget/getSearchDefaultWords#'
							})
				this.sousuo=sou.data[0].show
				this.bilibili = res.data
				stopre && stopre()
			},
			async gets () {
				if(!this.bk){
				const res = await this.$myRequest({
								url: 'https://www.bilibili.com/index/ding.json'
							})
				this.bilibili.life =res.data.life
				this.bk=true
				}
			},
			tomian(data){
				data=JSON.stringify(data)
				uni.navigateTo({
					url:'../mainneirong/mainneirong?data='+data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sousuo{
		font-size: 34rpx;
		width: 600rpx;
		border-radius:5px;
		outline:none;
		border-top-style: groove;
		border-right-style: groove;
		border-bottom-style: groove;
		border-left-style: groove;
		border:1px solid #ffaa00;
	}
.fanzu{
	background-color:#F0F0F0;
	.qd{
		text-align: center;
		.guozi{
			display: inline-block;
			font-size: 30rpx;
			color: #000000;
			padding-top: 90%;
		}
		button{
			font-size: 35rpx;
			color: #FFFFFF;
			background-color: #72CAEE;
			width: 70%;
			margin-top: 16%;
		}
	}
	.login{
		margin-left: 3%;
		margin-top: 23%;
		color: #808080;
		text-align: center;
		width: 145%;
		font-size: 18rpx;
		border-radius: 8rpx; 
		.logina{
			color: #333333;
			font-size: 28rpx;
			padding: 10% 0;
		}
		image{
			width: 42%;
			margin:5% 2%;
		}
	}
}
	.aside{
		text-align: center;
		width: 100%;
		height: 100%;
		.content{
			display: inline-block;
			color:#FFFFFF;
			image{
				width: 30%;
				border-radius: 999rpx; 
				margin: 5% auto;
			}
		}
		.body{
			width: 100%;
			div{
				margin-right: 70%;
				font-size: 40rpx;
				padding-top: 7%;
			}
			image{
				width: 30%;
				height: 30%;
			}
		}
		.footer{
			.footer1{
				width: 10%;
				margin-right: 2%;
			}
			.footer2{
				width: 40%;
				margin-left: 20%;
				margin-top: 105%;
			}
		}
	}
	// -----------------------------------
	swiper{
		padding-top: 3%;
		width: 750rpx;
		height: 380rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
.toptext{
	width: 3%;
	height: 3%;
}
.vid_list{
	padding: 0 15rpx;
	padding-top: 15rpx;
	display: flex;
	flex-wrap: wrap ;
	justify-content: space-between;
	.vid_item{
		background-color: #FFFFFF;
		margin-top: 10rpx;
		width: 355rpx;
		image{
			width: 100%;
			height: 200rpx;
		}
		.tit{
			font-size: 28rpx;
			background-color: #FFFFFF;
		}
		.tit_up{
			font-size: 20rpx;
			color: #C0C0C0;
			background-color: #FFFFFF;
		}
	}
}
.isOver{
	margin-left: 55rpx;
	font-size: 30rpx;
	image{
		width: 50rpx;
		height: 40rpx;
	}
}
</style>
