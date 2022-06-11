<template>
	<v-main>
		<!-- 考试首页面 -->
		<v-app-bar color="white lighten-1" dark flat>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">考试中心</div>			
		</v-app-bar>
		<div class="body_no_top ofs ">
			<div class="i-bar"></div>
			<div class="font-424646-1 marginl-1 margint-1">正在考试</div>
			<BeingExamList :more="false" :pagination="false"></BeingExamList>						
			<div class="font-424646-1 marginl-1 margint-1">即将考试</div>		
			<ComingExamList :more="false" :pagination="false"></ComingExamList>								
		</div>
	</v-main>
</template>

<script>
	import BeingExamList from '../../components/BeingExamList.vue'
	import ComingExamList from '../../components/ComingExamList.vue'
	export default {
		components: {
			BeingExamList,
			ComingExamList
		},
		data() {
			return {
				pics: [
					require("../../images/banner4.png"),
					
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
