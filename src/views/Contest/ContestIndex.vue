<template>
	<v-main>

		<!-- 我的比赛首页 -->

		<v-toolbar color="white">
			<v-btn @click="goBack()" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<v-spacer></v-spacer>
			<div class="">竞赛中心</div>

			<v-spacer></v-spacer>

			<v-btn @click="menu=true" class="ag" icon color="#28BBCE">
				成绩排名
			</v-btn>
			<!--  -->
		</v-toolbar>
		<div style="overflow: hidden;">
			<div style="margin: 0 0.7rem 2rem;">
				<!-- 轮播 -->
				<div style="">
					<!-- 循环多一个空白页 -->
					<swiper :options="swiperOption" ref="mySwiper" @swiper="onSwiper"
						@slideChange="onSlideChange(swiper)" v-if="rotateDetail.length">
						<swiper-slide v-for="(slide, i) in rotateDetail" :key = "slide.id" v-if="slide.rotateRemark == 1">							
							<img :src="slide.picturesUrl" style="height: 10rem; object-fit: cover;">
						</swiper-slide>
						
					</swiper>

				</div>
				<!-- 比赛 -->
				<div class="i-row margint-1" style="width: calc(100vw - 2rem); margin-bottom: 0.5rem;">
					<v-img src="../../images/btn_contest1.png" width="calc(50vw - 1rem)">
						<div class="contest_btn1" @click="go('final')">立即参加</div>
					</v-img>
					<div class="i-column" style="margin-left: 0.6rem;">
						<v-img src="../../images/btn_contest2.png" width="calc(50vw - 1rem)">
							<div class="contest_btn2" @click="go('intrudes')">参与训练</div>
						</v-img>
						<v-img src="../../images/btn_contest3.png" width="calc(50vw - 1rem)">
							<div class="contest_btn3" @click="go('servicesort')">参加竞赛</div>
						</v-img>
					</div>
				</div>

				<v-img src="../../images/banner_rank.png" @click="go('ranklist')"></v-img>

				<div class="i-row i-between margint-1">
					<div class="font-40403F-1">赛事报导</div>
					<div class="font-2CC9C1-0-9">更多> </div>
				</div>
				<div class="i-column" v-for="(news, ind) in newsList" :key="news.id">
					<div class="contest_item" >
						<div class="i-column marginl-1">
							<div class="font-303232-1">{{news.userName}}</div>
							<div class="font-6B6B6B-09 margint-0-5">{{news.organizationName}}</div>
							<div class="contest_item_title ">育儿嫂</div>
						</div>
						<div class="i-column marginr-1 i-align-center">
							<div class="contest_item_right">58分</div>
							<div class="contest_item_right_btn" @click="goNewsDetail(news.competitionNewId)">查看详情</div>
						</div>
					</div>
					<div class="contest_item">
						<div class="i-column marginl-1">
							<div class="font-303232-1">王雅芬</div>
							<div class="font-6B6B6B-09 margint-0-5">秦皇岛市文安家政公司</div>
							<div class="contest_item_title ">育儿嫂</div>
						</div>
						<div class="i-column marginr-1 i-align-center">
							<div class="contest_item_right">58分</div>
							<div class="contest_item_right_btn">查看详情</div>
						</div>
					</div>
				</div>
				
				<!-- <div @click="go('examResult')"> 成绩</div>
				<div @click="go('serviceSort')"> 分类</div>
				<div @click="go('rankResult')"> 排名</div>
				<div @click="go('expertList')"> 专家</div>
				<div @click="go('chooseLevel')"> 选择关卡</div>				
				<div @click="go('preliminariesRank')"> 预选赛排行</div>
				<div @click="go('video')"> 视频</div>
				<div @click="go('videoscorelist')"> 视频打分</div> -->
			</div>
		</div>




	</v-main>
</template>

<script>
	// 引入插件
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import "swiper/css/swiper.css";
	import OrganizationList from '../../components/OrganizationList.vue'
	export default {
		components: {
			OrganizationList,
			swiper,
			swiperSlide,
		},
		data() {
			return {
				showOd: false,
				valid: false,
				data: [],
				query: {
					page : 1,
					rows : 5,
				},
				rotateDetail: {
					userCover: null
				},
				rules: {},
				newsList: [],
				pics: [
					require("../../images/banner1.png"),
					require("../../images/banner2.png"),
					require("../../images/banner3.png"),
					require("../../images/banner4.png")
				],
				uploadUrl: this.$serverURL + "common/uploadCover",
				swiperOption: {
					loop: true,
					autoplay: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
					slidesPerView: "auto",
					centeredSlides: true,
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
			}
		},
		created() {
			this.getUserInfo();
			this.getrotateList();
			this.geNewsList();
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},


		},
		methods: {
			showOLPanel() {
				if (this.datadetail.organizationName == '') {
					this.showOd = true
				}


			},
			// 根据服务分类到相应的竞赛列表 param ：
			goNewsDetail(id) {
				//this.$router.push("score");			
				this.$router.push({
					name: "ContestNews",
					params: {					
						id : id,
					},
				});
			},
			getrotateList(){
				this.$store.dispatch("rotateList",this.query).then((res) => {
					if (res.data.state == 200) {
						this.rotateDetail = res.data.data;
						console.log(this.rotateDetail)
					} else {
				
					}
				}).catch((res) => {
				
				})
			},
			geNewsList(){
				this.$store.dispatch("competitionNewsList",this.query).then((res) => {
					if (res.data.state == 200) {
						this.newsList = res.data.data;
						console.log(this.newsList)
					} else {
				
					}
				}).catch((res) => {
				
				})
			},
			getUserInfo() {
				this.$store.dispatch("getUserInfo", this.$store.getters.userinfo.userId).then((res) => {
					if (res.data.state == 200) {
						this.datadetail = res.data.data
						this.datadetail.sex = this.datadetail.sex == "男" ? 1 : 2
						this.datadetail.entryTime = this.datadetail.entryTime.split("T")[0]

					} else {

					}
				}).catch((res) => {

				})
			},
			
			go(url) {
				this.$router.push(url);

			},
			goBack() {
				this.$router.go(-1)
			},
			onSwiper(swiper) {
				
			},
			onSlideChange(e) {
				


			},

		}
	}
</script>

<style scoped>
	/* 对swiper 组件的样式进行封装样式类的修改，作用于当前页面，别的页面不进行调用 style表情添加 scoped*/
	.contest_top {
		width: 100%;
		height: 8rem;
		display: flex;
		flex-direction: column;
		background-color: dodgerblue;

	}

	.contest_top_msg {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 1rem;
	}

	.contest_item {
		width: 100%;
		height: 8.625rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		box-shadow: 1px 1px 4px 0px rgba(40, 187, 206, 0.3);
		margin-top: 1rem;
	}

	.contest_item_right {
		width: 3.375rem;
		height: 4.875rem;
		background: url(../../images/bg_reward.png);
		text-align: center;
		color: white;
		font-weight: bold;
		font-size: 0.9rem;
		background-size: 100%;
		padding: 1.1rem;
		line-height: 0.9rem;
	}

	.contest_item_title {
		width: 3.625rem;
		height: 1.5rem;
		background: #DCF4F7;
		border-radius: 0.25rem;
		text-align: center;
		font-size: 0.8rem;
		line-height: 1.5rem;
		color: #28BBCE;
		margin-top: 0.8rem;
	}

	.contest_item_right_btn {
		width: 5.5rem;
		height: 2.125rem;
		margin-top: 0.25rem;
		border: 1px solid #28BBCE;
		border-radius: 0.25rem;
		line-height: 2.125rem;
		color: #28BBCE;
		text-align: center;
	}

	.contest_btn1 {
		width: 5.25rem;
		height: 1.75rem;
		background-image: url(../../images/bg_btn.png);
		text-align: center;
		line-height: 1.75rem;
		color: white;
		margin-top: calc(34vw - 1rem);
		background-size: 100%;
		margin-left: 2vw;
		font-size: 0.9rem;
	}

	.contest_btn2 {
		width: 3.75rem;
		height: 1.125rem;
		background: #F8A128;
		border-radius: 0.5rem;
		text-align: center;
		line-height: 1.125rem;
		color: white;
		background-size: 100%;
		margin-left: 2vw;
		font-size: 0.7rem;
		margin-top: calc(18vw - 1rem);
	}

	.contest_btn3 {
		width: 3.75rem;
		height: 1.125rem;
		background: #3584F4;
		border-radius: 0.5rem;
		text-align: center;
		line-height: 1.125rem;
		color: white;
		background-size: 100%;
		margin-left: 2vw;
		font-size: 0.7rem;
		margin-top: calc(18vw - 1rem);
	}

	.swiper-container {
		width: 100%;
		height: 10rem;
		overflow: visible !important;
	}

	.swiper-container .swiper-wrapper .swiper-slide {
		width: 100%;
		border-radius: 0.5rem;
	}

	.swiper-container .swiper-wrapper .swiper-slide img {
		width: 100%;
		height: 10rem;
		border-radius: 0.5rem;
	}

	.swiper-container .swiper-wrapper .swiper-slide-prev {
		margin-top: 0.5rem;
		height: 9rem !important;
		
	}

	.swiper-container .swiper-wrapper .swiper-slide-prev img {
		height: 9rem !important;
	}

	.swiper-container .swiper-wrapper .swiper-slide-next {
		margin-top: 0.5rem;
		height: 9rem !important;
	}

	.swiper-container .swiper-wrapper .swiper-slide-next img {
		height: 9rem !important;
	}

	.swiper-container .swiper-wrapper .swiper-slide-active {
		width: 100%;
	}

	.swiper-pagination {
		bottom: -30px !important;

	}

	.swiper-pagination .swiper-pagination-bullet {
		width: 12px;
		height: 12px;
		background: #ff1e1e;
	}

	.swiper-pagination .swiper-pagination-bullet-active {
		width: 21px;
		height: 12px;
		background: #e75230;
		border-radius: 6px;
	}
</style>
