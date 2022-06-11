<template>
	<v-main>
		<div class="">
		
		<swiper :options="swiperOption" ref="mySwiper" @swiper="onSwiper"
			@slideChange="onSlideChange(swiper)" >
			<swiper-slide v-for="(slide, i) in pics" style="height: 100vh;">								
			</swiper-slide>		
		</swiper>

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
	export default {
		components: {			
			swiper,
			swiperSlide,
		},
		data() {
			
			return {
				pics: [
					require("../../images/banner1.png"),
					require("../../images/banner2.png"),
					require("../../images/banner3.png"),
					require("../../images/banner4.png")
				],
				swiperOption: {
					loop: true,
					autoplay: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
					slidesPerView: "auto",
					centeredSlides: true,
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
						init: function(swiper) {
							//Swiper初始化了
							// alert('当前的slide序号是'+this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
							/* this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd */											
						},				
					},
					
				},
			}
		},
		created() {

		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
		
		
		},
		methods: {
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

<style >
	
</style>
