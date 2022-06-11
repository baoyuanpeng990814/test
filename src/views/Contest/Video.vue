<template>
	<div class="recommendPage">
		<v-app-bar
			style="background-color: transparent; position: fixed; z-index: 999; box-shadow: 0px 0px 0px 0px transparent;">
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title" style="color: white;"></div>
			<v-spacer></v-spacer>

			<v-spacer></v-spacer>
		</v-app-bar>
		<swiper :options="swiperOption" ref="mySwiper" @swiper="onSwiper" @slideChange="onSlideChange(swiper)"
			@reachEnd="onSlideReach()" @slideChangeTransitionEnd="onSlideChangeTransitionEnd(swiper)"
			@touchStart="touchStart()">

			<swiper-slide v-for="(item,index) in videoList" :key="index">
				<div style="height: 100vh;  " id="videoContest">

					<video ref="videoItem" class="item_video" :src="item" controlsList="nodownload" controls
						oncontextmenu="false" disablepictureinpicture :autoplay="index==ind" preload="auto">
						您的浏览器不支持 video 标签。
					</video>
					<div class="video_user_control">
						<v-avatar size="3.25rem">
							<v-img width="3.25rem" height="3.25rem" src="../../images/pic_tx.png"></v-img>
						</v-avatar
						<!-- 点赞 -->
						<div class="i-column margint-1">
							<v-img width="1.75rem" height="1.55rem" src="../../images/icon/icon_like.png"></v-img>
							<div class="font-white-0-8 margint-0-5">12</div>
						</div>
						<!-- 评论 -->
						<div class="i-column margint-1">
							<v-img width="1.75rem" height="1.75rem" src="../../images/icon/icon_msg5.png"
								@click="drawer=true"></v-img>
							<div class="font-white-0-8 margint-0-5">12</div>
						</div>
						<div class="i-column margint-1">
							<div class="video_user_control_score">分数</div>
							<div class="font-white-0-8 margint-0-5">12</div>
						</div>


					</div>
				</div>
			</swiper-slide>

		</swiper>
		<!-- 评论信息列表弹窗 -->
		<v-navigation-drawer v-model="drawer" v-show="drawer" absolute light   bottom>
			<div style="width: 100%; height: 2rem; background-color: #FFFFFF; position: absolute; z-index: 99;">
				<div class="drawer_title">
					评论 4898
				</div>
			</div>
			
			<div></div>
			<span>
				<div class="i-column margint-1">
					<!-- 评论列表 -->
					<div class="comment_item">
						<div class="i-row i-align-center">

							<v-avatar size="40" tile style="margin-right: 1rem;">
								<img src="../../images/pic_tx.png" />
							</v-avatar>
							<div class="chip">
								选手
							</div>
							
							<div class="chip">
								选手
							</div><div class="chip">
								选手
							</div>
							<img src="../../images/icon/icon_life.png"
								style="margin-left: auto; width: 1.2rem; height: 1.2rem; object-fit: contain;" />
						</div>
						<div :class="show?'comment_abstract2':'comment_abstract'">
							张航:1988年11月生。现任中国科学技术
							大学教授,博士生导师,国家杰出青年科学
							基金获得者。2000年6月在中国科学技术
							大学获得博士学位,现任中国科学技。
						</div>
						<div @click="unfold()" class="unfold_abstract">
							<span v-if="!show">展开</span>
							<span v-else>闭合</span>
						</div>
					</div>
					
					
					<div class="comment_item">
						<div class="i-row i-align-center">
					
							<v-avatar size="40" tile>
								<img src="../../images/pic_tx.png" />
							</v-avatar>
					
							<v-chip small label color="#DFF8FB" text-color="#28BBCE"
								style="margin-right: 0.5rem; margin-left: 1rem;">
								专家
							</v-chip>
							<v-chip small label color="#FCF3E1" text-color="#E4A01C">
								98分
							</v-chip>
							<img src="../../images/icon/icon_life.png"
								style="margin-left: auto; width: 1.2rem; height: 1.2rem; object-fit: contain;" />
					
						</div>
						<div :class="show?'comment_abstract2':'comment_abstract'">
							张航:1988年11月生。现任中国科学技术
							大学教授,博士生导师,国家杰出青年科学
							基金获得者。2000年6月在中国科学技术
							大学获得博士学位,现任中国科学技。
					
						</div>
						<div @click="unfold()" class="unfold_abstract">
							<span v-if="!show">展开</span>
							<span v-else>闭合</span>
						</div>
					</div>
					
					
					
					<div class="comment_item">
						<div class="i-row i-align-center">
					
							<v-avatar size="40" tile>
								<img src="../../images/pic_tx.png" />
							</v-avatar>
					
							<v-chip small label color="#DFF8FB" text-color="#28BBCE"
								style="margin-right: 0.5rem; margin-left: 1rem;">
								专家
							</v-chip>
							<v-chip small label color="#FCF3E1" text-color="#E4A01C">
								98分
							</v-chip>
							<img src="../../images/icon/icon_life.png"
								style="margin-left: auto; width: 1.2rem; height: 1.2rem; object-fit: contain;" />
					
						</div>
						<div :class="show?'comment_abstract2':'comment_abstract'">
							张航:1988年11月生。现任中国科学技术
							大学教授,博士生导师,国家杰出青年科学
							基金获得者。2000年6月在中国科学技术
							大学获得博士学位,现任中国科学技。
					
						</div>
						<div @click="unfold()" class="unfold_abstract">
							<span v-if="!show">展开</span>
							<span v-else>闭合</span>
						</div>
					</div>
				</div>

			</span>
		</v-navigation-drawer>
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
				drawer: false, // 评论菜单
				show: true,

				videoList: [
					
					"https://tb-video.bdstatic.com/tieba-smallvideo-transcode-cae/7784795_50a00677ebf7f370e874d848c358773b_0_cae.mp4?vt=1&pt=3&ver=&cr=3&cd=3&sid=&ft=2&tbau=2021-09-30_edca5abfb2a50c70a8f39328b00a03ba9598cdb7a931a3ca6e292c53783927d6&ptid=",
					"https://tb-video.bdstatic.com/tieba-smallvideo-transcode-cae/13179427_6f5d95e7fc0ec57079644415edaacd11_0_cae.mp4?vt=1&pt=3&ver=&cr=3&cd=3&sid=&ft=20&tbau=2021-09-30_d14fb99193d2e7f3b034c5b39f5a1d3f5e219ffee3f035facc5abf3f9c277358&ptid=",
					"https://tb-video.bdstatic.com/tieba-smallvideo-transcode-cae/4653975_63c5fed037f91d858f482688279246bf_6dbbe7a112d5_0_cae.mp4?vt=1&pt=3&ver=&cr=2&cd=3&sid=&ft=8&tbau=2021-09-30_069e05e5ad50717803393d94b34ba4a9191da05c4ca99bbf6bec9110fb49e767&ptid=",
					"https://tb-video.bdstatic.com/tieba-smallvideo-transcode-crf/6432769_0d5571dd2437521d1aba9ffeb36dd9ae_1089ced2d0eb_0.mp4?vt=1&pt=3&ver=&cr=2&cd=0&sid=&ft=8&tbau=2021-09-30_22923b2c1129f62f48610a7b588f0a1ab5859afc495425418621d8950f16c3ff&ptid=7556903752"
				],
				swiperOption: {
					loop: false,
					autoplay: false,
					direction: 'vertical',
					preventClicksPropagation: true,
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
						init: function(swiper) {
							//Swiper初始化了
							// alert('当前的slide序号是'+this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
							/* this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd */
							console.log("初始化", this.ind)

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
				//console.log("执行暂停播放", e.activeIndex, e.previousIndex)
				this.$refs.videoItem[e.previousIndex].pause();

			},
			onSlideReach() {
				//console.log("执行暂停播放" + this.ind)				
				//this.$refs.videoItem[this.ind].pause();
				//console.log('最后到达暂无更多');
			},
			onPlay() {
				this.$refs.videoItem[this.ind].play();
			},
			onSlideChangeTransitionEnd: function(e) {


				//console.log(this.$refs ,"当前播放", e)
				this.$refs.videoItem[e.activeIndex].play();




			},
			onClose() {
				console.log("11111111111111111")
			},

			touchStart: function(swiper, event) {
				if (this.drawer) {
					this.drawer = false
				}

			},
			unfold() {

				this.show = !this.show

			},

		},
		watch: {
			'ind'(val) {
				console.log('watch' + val);

			}
		}

	};
</script>
<style scoped="scoped">
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

	.video_user_control {
		background-color: transparent;
		position: absolute;
		z-index: 999;
		bottom: 10%;
		right: 1rem;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.video_user_control_score {
		width: 2.375rem;
		height: 2.375rem;
		border-radius: 50%;
		background-color: rgba(28, 26, 26, 0.4);
		text-align: center;
		align-items: center;
		color: white;
		font-size: 0.8rem;
		line-height: 2.375rem;
	}

	.drawer_title {
		width: 6rem;
		height: 1.5rem;
		text-align: center;
		background-color: #afe7ff;
		font-family: PingFang SC;
		font-weight: 500;
		color: #121E2C;
		border-radius: 0 0 0.5rem 0.5rem;
		margin: 0 auto;
		
	}

	.comment_item {
		display: flex;
		flex-direction: column;
		width: 100vw;
		padding: 1rem;
	}

	.comment_abstract {
		width: calc(100vw - 7rem);
		float: left;
		font-size: 0.85rem;
		line-height: 1rem;
		height: 3rem;
		overflow: hidden;
		padding: 0;
		margin-left: 4rem;
		color: #2A2928;
	}

	.comment_abstract2 {
		width: calc(100vw - 7rem);
		float: left;
		font-size: 0.85rem;
		line-height: 1rem;
		padding: 0;
		margin-left: 4rem;
		color: #2A2928;

	}

	.unfold_abstract {
		width: calc(100vw - 7rem);
		font-size: 1rem;
		padding: 0;
		margin-left: 4rem;
		text-align: end;
		color: #28BBCE;
		border-bottom: 1px solid #F2F2F2;
	}
	 .chip{
		 background-color: #FD814429;		 
		 color: #FD8144;
		 font-size: 0.8rem;
		 line-height: 1.5rem;
		 border-radius: 0.25rem;
		 padding: 0 0.6rem;
		 margin-right: 0.5rem;
	 }   
</style>
