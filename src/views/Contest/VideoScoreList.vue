<template>
	<v-main>
		<div class="body_video_list">
			<v-app-bar style="background-color: transparent; box-shadow: 0px 0px 0px 0px;">
				<v-btn @click="goBack" icon>
					<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>				
				</v-btn>
				<div class="tool_title" style="color: white; ">专家打分</div>						
			</v-app-bar>
			<header class="i-column" >
				<div class="video_list">
					<div class="video_list_number">1</div>
					<!-- <v-img src="../../images/Login.png" width="5.75rem" height="4.25rem"></v-img> -->
					<img class="video_list_img" src="../../images/Login.png" @click="go('video')"/>
					<div class="video_list_grade">打分</div>
				</div>
				<div class="video_list">
					<div class="video_list_number">1</div>
					<!-- <v-img src="../../images/Login.png" width="5.75rem" height="4.25rem"></v-img> -->
					<img class="video_list_img" src="../../images/Login.png"/>
					<div class="video_list_grade">打分</div>
				</div>
				<div class="video_list">
					<div class="video_list_number">1</div>
					<!-- <v-img src="../../images/Login.png" width="5.75rem" height="4.25rem"></v-img> -->
					<img class="video_list_img" src="../../images/Login.png"/>
					<div class="video_list_grade">打分</div>
				</div>
				<div class="video_list">
					<div class="video_list_number">1</div>
					<!-- <v-img src="../../images/Login.png" width="5.75rem" height="4.25rem"></v-img> -->
					<img class="video_list_img" src="../../images/Login.png"/>
					<div class="video_list_grade">打分</div>
				</div>
				<div class="video_list">
					<div class="video_list_number">1</div>
					<!-- <v-img src="../../images/Login.png" width="5.75rem" height="4.25rem"></v-img> -->
					<img class="video_list_img" src="../../images/Login.png"/>
					<div class="video_list_grade">打分</div>
				</div>
			</header>	
			
			


		</div>
	</v-main>
</template>

<script>

	export default {
		components: {
			

		},
		data() {
			return {

			

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

<style >
	font{
		font-size: 16px;
	}
	.body_video_list{
		background-image: url(../../images/bg_height.png);
		width: 100%;
		background-size:cover;
		min-height: 100vh;		
		
	}
	.video_list{
		width: calc(100vw - 2rem);
		height: 4.75rem;
		background: rgb(255,255,255,0.47);
		border-radius: 5px;
		margin : 1rem ;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 1rem;
		align-items: center;
	}
	.video_list_number{
		width: 2rem;
		height: 2rem;
		background: #52D6E7;
		border: 1px solid  rgb(255,255,255,0.47);
		border-radius: 50%;
		line-height: 2rem;
		color: white;
		font-size: 1.2rem;
		text-align: center;
		
	}
	.video_list_img{
		width: 5.75rem;
		height: 4.25rem;
	}
	.video_list_grade{
		width: 6.25rem;
		height: 2.5rem;
		background: #66CFDD;
		border: 1px solid  rgb(255,255,255,0.47);
		border-radius: 0.25rem;
		color: white;
		text-align: center;
		line-height: 2.5rem;
	}
</style>
