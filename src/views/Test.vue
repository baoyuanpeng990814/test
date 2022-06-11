<template>
	<div class="recommendPage">
		<swiper :options="swiperOption" ref="mySwiper" @swiper="onSwiper" @slideChange="onSlideChange(swiper)"  @reachEnd="onSlideReach()" @slideChangeTransitionEnd="onSlideChangeTransitionEnd(swiper)">
			<swiper-slide v-for="(item,index) in videoList" :key="index">
				<div style="height: 100vh;" id="videoContest">
					<video ref="videoItem" class="item_video" :src="item" controls controlsList="nodownload"
						oncontextmenu="false" disablepictureinpicture :autoplay="index==ind">
						您的浏览器不支持 video 标签。
					</video>
				</div>
			</swiper-slide>

		</swiper>
	</div>
</template>

<script>
	// 引入插件
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import "swiper/css/swiper.css";

	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				autoplayVideo: true,
				ind: 0,
				
				videoList: [ ],
				swiperOption: {
					loop: false,
					autoplay: false,
					direction: 'vertical',
					// 显示分页
					pagination: {
						el: ".swiper-pagination",
						clickable: true //允许分页点击跳转
					},
					// 设置点击箭头
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev"
					},
					
					on: {
						
						init: function(swiper){
						      //Swiper初始化了
						     // alert('当前的slide序号是'+this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
						      /* this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd */
							  
						      
						 }, 
						
					},
				},
				


			};
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		mounted() {
			// current swiper instance
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了

			// this.swiper.slideTo(3, 1000, false);
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			onSwiper(swiper) {
				console.log("swiper");
			},
			onSlideChange(e) {
				console.log("执行暂停播放" , e.activeIndex ,e.previousIndex)				
				this.$refs.videoItem[e.previousIndex].pause();
				
			},
			onSlideReach() {
				//console.log("执行暂停播放" + this.ind)				
				//this.$refs.videoItem[this.ind].pause();
				//console.log('最后到达暂无更多');
			},
			onPlay(){
				this.$refs.videoItem[this.ind].play();
			},
			onSlideChangeTransitionEnd: function(e) {
			//	console.log(this.activeIndex,"1111111111"); //切换结束时，告诉我现在是第几个slide
				//this.ind = this.activeIndex;
			//	console.log(this.$refs.videoItem ,"当前播放",e.activeIndex)
				this.$refs.videoItem[e.activeIndex].play();
			//	console.log(this.ind,"ind",this.videoList)
				
				
			},
		},
		watch:{
			'ind'(val){
				console.log('watch' + val);
				
			}
		}

	};
</script>
<style scoped>
	.recommendPage .swiper-container {
		position: relative;
		width: 100%;
		height: 100vh;
		background: #000000;

	}

	.recommendPage .swiper-container .swiper-slide {
		width: 100%;

		background: #000000;
		color: #000;
		font-size: 16px;
		text-align: center;

	}

	.video_bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: fixed;
		height: 0rem;
		color: #cacaca;
	}

	.video_bar_title {

		line-height: 3rem;
	}

	.item_video {
		width: 100vw;
		height: 100vh;
	}

	#videoContest>video::-webkit-media-controls-fullscreen-button {
		display: none !important;
	}
</style>
