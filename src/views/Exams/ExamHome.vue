<template>
	<v-main>
		<!-- 考试首页面 -->
		<v-app-bar color="white lighten-1" dark flat>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>

			</v-btn>
			<div class="tool_title">考试中心</div>
		</v-app-bar>
		<div class="body_no_top ofs bg">			
			<v-carousel cycle height="10rem" hide-delimiter-background show-arrows-on-hover >
				<v-carousel-item v-for="(p,index) in pics" :key=p >
					<v-img height="10rem" width="100%" :src="p"></v-img>
				</v-carousel-item>
			</v-carousel>
			<div class="i-column i-align-center" >				
					<v-img  src="../../images/btn_exam.png" maxWidth= "8rem" maxHeigh="8rem" class="margint-2" @click = "go('ExamList')"></v-img>
					<v-img  src="../../images/btn_exercise.png" maxWidth= "8rem" maxHeigh="8rem" class="margint-3" @click = "go('ExerciseList')"></v-img>									
			</div>		
		</div>
	</v-main>
</template>

<script>
	
	export default {
		
		data() {
			return {
				pics: [
					require("../../images/exambg.png"),
					
				],
				datas: []
			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			go(url) {
				this.$router.push(url);
			},
		}
	}
</script>

<style scoped>
	.v-toolbar__title {
		margin: 0 auto;
	}


	.tool_title {
		font-size: 1.125rem;
		width: 100%;
		font-weight: 500;
		color: #2A2C2C;
		text-align: center;
		margin-right: 2rem;
	}

	.bg {
		
		
		background-size: cover;
		background-image: url(../../images/bg1.png);
		background-repeat: no-repeat;
		padding-top: 1rem;
	}
</style>
