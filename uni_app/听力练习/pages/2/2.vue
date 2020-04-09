<template>
	<view class="audo-video">
		<maskAndContent type="custom" ref="scb">
			<view style="color: #fff;">
				{{innerText0}}
				<button type="default" @click="todcb()">保存到单词本</button>
			</view>
		</maskAndContent>
		<image style="width: 100rpx;height: 100rpx;float: right;" src="../../static/logo.png" mode="widthFix" @click="tologin"></image>
		<view class="col slider-container"><s-slider v-model="vol" :min="0.2" :max="1" :step="0.1" size="220" sizeUnit="rpx" @changing="changevol" @changed="changevol" />
		</view>
		
		<video id="myVideo" :src="url" class="hidden" @timeupdate="timeupdate" ref="video" @loadedmetadata="loadedmetadata" ></video>
		
		<view class="slider-box">
			<text class="mm">{{timer}}</text>
			<slider 
				style="width: 500upx;"
				@change="sliderChange"
				@changing="sliderChanging"
				class="audio-slider" 
				block-size="16" 
				:min="0"
				:max="duration"
				:value="currentTime"
				activeColor="#ff7400"
				@touchstart="lock= true"
				@touchend="lock = false"
				/>
			<text class="ss">{{overTimer}}</text>
		</view>
		
		<button @tap="play">{{playa}}</button>
		<button @tap="tan1">弹出</button>
		<button @tap="setRate()">{{num}}倍</button>
		<button @click="atob()" >{{adaob}}</button>
		<button @click="vis()">隐藏歌词</button>
		<button @click="lastone()">上一句</button>
		<button @click="thenext">下一句</button>
		<button @click="xh()">循环本句</button>
		<button @click="disanswer()">只看答案句</button>
		
		<view id="lyricclass" >
			<view v-html="lyric2" id="0" style="top: 0rpx;">
				
			</view>
		</view>
	</view>
</template>

<script>
	import sSlider from '@/components/simple-slider/simple-slider.vue'
	import maskAndContent from '@/components/QS-maskAndContent/QS-maskAndContent.vue'
	export default {
		components: {sSlider,maskAndContent},
		data() {
			return {
				Lyric:'[00:13.05]---我听见雨滴落在青青草地---[00:19.00]我听见远方下课钟声响起[00:25.06]---可是我没有听见你的声音---[00:30.41]认真呼唤我姓名[00:37.22]爱上你的时候还不懂感情[00:43.32]离别了才觉得刻骨铭心[00:49.35]为什么没有发现遇见了你[00:53.94]是生命最好的事情[00:59.59]也许当时忙着微笑和哭泣[01:05.81]忙着追逐天空中的流星[01:11.56]人理所当然的忘记[01:15.84]是谁风里雨里一直默默守护在原地[01:23.20]原来你是我最想留住的幸运[01:28.67]原来我们和爱情曾经靠得那么近[01:34.84]那为我对抗世界的决定[01:39.79]那陪我淋的雨[01:42.47]一幕幕都是你[01:45.63]一尘不染的真心[01:52.94]可我已失去为你泪流满面的权利[01:59.21]但愿在我看不到的天际[02:03.59]你张开了双翼[02:06.85]遇见你的注定[02:11.40]她会有多幸运[02:26.47]青春是段跌跌撞撞的旅行[02:32.53]拥有着后知后觉的美丽[02:38.61]来不及感谢是你给我勇气[02:42.75]让我能做回我自己[02:48.93]也许当时忙着微笑和哭泣[02:54.98]忙着追逐天空中的流星[03:01.77]人理所当然的忘记[03:05.30]是谁风里雨里一直默默守护在原地[03:13.16]原来你是我最想留住的幸运[03:18.34]原来我们和爱情曾经靠得那么近[03:24.22]那为我对抗世界的决定[03:28.39]那陪我淋的雨[03:31.94]一幕幕都是你[03:34.89]一尘不染的真心[03:38.97]与你相遇好幸运[03:42.34]可我已失去为你泪流满面的权利[03:48.54]但愿在我看不到的天际[03:53.42]你张开了双翼[03:56.23]遇见你的注定[03:59.79]oh[04:04.00]她会有多幸运',
				lyric1:'',
				time: '',
				lyric2:'',
				cuttime:0,
				last:null,
				key:false,
				lock: false, // 锁
				playflag:false, // 1暂停 2播放
				currentTime: 0,  //当前进度
				duration: 100, // 总进度
				videoContext: '',
				url:'../../static/xiao.mp3',
				vol:0.5,
				playa:"播放",
				innerText0:'',
				atb:0,   //0无A-B，1：A-B，2：停止A-B
				time0:9999,
				time9:9999,
				dis:true,
				adaob:'重复A-B',
				pid:0,
				visible:'hidden',
				num:1,   // 倍速
				last1:null,   // 上一句
				xhcs:0,
				next:null ,// xiayiju
				now:null,
				xk:false,
				now1:0,
				answer:[] , // 1是答案，0不是答案
				disan:true   // 只看答案句
			}
		},
		computed:{
			timer() {
				return calcTimer(this.currentTime)
			},
			overTimer() {
				return calcTimer(this.duration)
			}
		},
		onLoad() {
			window.innerText0=''
			window.i=0
			 this.videoContext = uni.createVideoContext('myVideo')
		},
		created() {
		},
		updated() {
		},
		beforeMount() {
			this.Lyric=this.Lyric.split("[")
			var x=this.Lyric.length
				for(var i=0;i<x;i++){
					this.lyric1=this.Lyric[i].split("]")
					var times=this.lyric1[0].split(".")[0].split(":")
					this.time=times[0]*60+times[1]*1
					 if(this.lyric1[1]){
						 if(this.lyric1[1].indexOf("---")!==-1){
							 this.answer[i]=1
							 this.lyric1[1]=this.lyric1[1].replace("---","").replace("---","")
						 }else{
							 this.answer[i]=0
						 }
						 this.lyric2+="<p id="+this.time+" title="+i+">"+this.lyric1[1]+"</p>"
					}
				}
			
		},
		mounted() {
			var pa = document.getElementsByTagName("p")
			for (var i=0;i<pa.length;i++) {
				if(this.answer[pa[i].title]===1){
					pa[i].style.textDecoration='underline'
				}
				pa[i].addEventListener("click",function(e){
					window.innerText0=e.toElement.innerText
					console.log(window.innerText0)
					window.pid=e.toElement.id
					window.pd=true
				})
			}
		},
		methods: {
			// ------循环本句
			xh(){
				if(this.xhcs===0){
				this.xhcs=1
				this.xk=true
				uni.showToast({
					title: '循环一次',
					icon: 'none',
				});
				}else if(this.xhcs===1){
					this.xhcs=5
					this.xk=true
				uni.showToast({
					title: '循环三次',
					icon: 'none',
				});
				}else if(this.xhcs===3){
					this.xhcs=7
					this.xk=true
				uni.showToast({
					title: '循环五次',
					icon: 'none',
				});
				}else if(this.xhcs===-1){
					this.xhcs=0
					uni.showToast({
						title: '停止循环',
						icon: 'none',
					});
					this.xk=false
				}else{
					uni.showToast({
						title: '无限循环',
						icon: 'none',
					});
					this.xhcs=-1
					this.xk=true
				}
				this.now=this.last
				this.next = document.getElementById(this.last).nextElementSibling.id

				
			},
			// ------上一句
			lastone(){
				 this.now1 = document.getElementById(this.last).previousElementSibling.id
				 while(true){
				 if(document.getElementById(this.now1).style.display==='none'){
					this.now1 = document.getElementById(this.now1).previousElementSibling.id
				 }else{
				this.videoContext.seek(this.now1)
				break}}
			},
			// 下一句
			thenext(){
				this.next = document.getElementById(this.last).nextElementSibling.id
				while(true){
				if(document.getElementById(this.next).style.display!=='none'){
					this.videoContext.seek(this.next)
					break
				}else{
					this.next = document.getElementById(this.next).nextElementSibling.id
				}
			}},
			// 隐藏歌词
			vis(){
				document.getElementById("0").style.visibility=this.visible
				if(this.visible==='hidden')
				this.visible='visible'
				else
				this.visible='hidden'
			},
			// 只看答案句
			disanswer(){
				var pa = document.getElementsByTagName("p")
				for (var i=0;i<pa.length;i++) {
					if(this.disan){
						if(this.answer[pa[i].title]===1){
							pa[i].style.display=''
						}else{
							pa[i].style.display='none'
						}
					}else{
						pa[i].style.display=''
					}
					}
					this.disan=!this.disan
			},
			// 弹出
			tan1(){
			this.innerText0=window.innerText0
				this.$refs.scb.show();
			},
			todcb(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			tologin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//音量
			changevol(e){
				this.videoContext.volume= 0
			},
			// 倍速
			setRate() {
				if(this.num===1 || this.num===1.25){
					this.num+=0.25
				}else if(this.num===1.5){
					this.num=2
				}else if(this.num===2){
					this.num=0.5
				}else{
					this.num=1
				}
				this.videoContext.playbackRate(this.num)
			},
			
			// 播放
			play() {
				if(this.playflag){
					this.videoContext.pause()
					this.playflag=false
					this.playa="播放"
				}else{
					// this.audio.currentTime=0
				this.videoContext.play()
					this.playflag=true
					this.playa="暂停"
				}
			},
			
			// 更新进度条
			timeupdate(event) {
			var a =	this.cuttime-this.next
				if(!a){
					if(this.xk){
					if(this.xhcs!==0){
						this.xhcs=this.xhcs-1
					this.videoContext.seek(this.now)}else{
						this.xk=false
					}
					}
				}
				if(window.pd){
				this.videoContext.seek(window.pid)
				window.pd=false}
				this.cuttime = parseInt(this.currentTime)
				var now = null
				if(document.getElementById(this.cuttime) && this.cuttime!==0){
					now = document.getElementById(this.cuttime)
					if(this.key){
					document.getElementById(this.last).style.color="#F1F1F1"}
					if(this.answer[now.title]===1){
						now.style.color="#007AFF"
					}else{
						now.style.color="#000"
					}
					if(now.title>=8)
					document.getElementById("lyricclass").scrollTop=30*(now.title-8)
					if(this.last!==this.cuttime)
					this.last1=this.last
					this.last=this.cuttime
					this.key=true
				}
				// -------------------------------
				if(this.lock) return; // 锁
				var currentTime,duration;
				if(event.detail.detail) {
					currentTime = event.detail.detail.currentTime
					duration = event.detail.detail.duration
				}else {
					currentTime = event.detail.currentTime
					duration = event.detail.duration
				}
				this.currentTime = currentTime
				this.duration = duration
				if(this.cuttime===this.time9){
					if(this.atb===2){
						this.videoContext.seek(this.time0)
					}
				}
			},
			atob(){
				if(this.atb===0){
				this.time0=this.cuttime
				this.atb=1
				this.adaob='A-'
				}else if(this.atb===1){
				this.time9 = this.cuttime
				this.videoContext.seek(this.time0)
				this.atb=2
				this.adaob='A-B'
				}else{
				this.time0=999
				this.time9=999
				this.atb=0
				this.adaob='重复A-B'
				}
			
			},
			
			// 拖动进度条
			sliderChange(data) {
				this.videoContext.seek(data.detail.value)
			},
			
			//拖动中
			sliderChanging(data) {
				this.currentTime = data.detail.value
			},
			
			// 视频加载完成
			loadedmetadata(data) {
				this.duration = data.detail.duration
			}
		}
	}
	
	function calcTimer(timer) {
		if(timer === 0 || typeof timer !== 'number') {
			return '00:00'
		}
		let mm = Math.floor(timer / 60)
		let ss = Math.floor(timer % 60)
		if(mm < 10) {
			mm = '0' + mm
		}
		if(ss < 10) {
			ss = '0' + ss
		}
		return mm + ':' + ss
	}
	
</script>

<style scoped lang="scss">
	#0{
		
		position: relative;
	}
	#lyricclass{
		text-align: center;
		height: 838rpx;
		background-color: #333333;
		color: #F1F1F1;
		overflow:scroll;
			}
	.audo-video {
		padding-bottom: 20upx;
		height: 100%;
		width: 100%;
	}
	.slider-box {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #999;
	}
	
	button {
		display: inline-block;
		width: 100upx;
		background-color: #fff;
		font-size: 24upx;
		color: #000;
		padding: 0;
	}
	.hidden {
		position: fixed;
		z-index: -1;
		width: 1upx;height: 1upx;
	}
	.col {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.slider-container {
		width: 60rpx;
		height: 280rpx;
		justify-content: center;
		box-shadow: 0 0 15rpx 0 rgba(0, 0, 0, 0.2);
		border-radius: 15rpx;
	}
</style>
