<template>
	<v-main>
		<div class="exam_result_bg">
			<v-app-bar style="background-color: transparent;">
				<v-btn @click="goBack" icon>
					<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>

				</v-btn>
				<div class="tool_title" style="color: white;">考试结果</div>
				<v-spacer></v-spacer>

				<v-spacer></v-spacer>
			</v-app-bar>
			<header>
				<div class="exam_result_top">
					<div class="exam_result_ring">
						<div class="exam_result_score">18</div>
						<div class="exam_result_score2">分</div>
					</div>
				</div>
			</header>
			<div class="exam_result_ranking">第一名</div>
			<footer>
				<div class="exam_result_item">
					<div class="fontb-white-1-2 marginl-1">2</div>
					<div class="i-row i-align-center" style="width: 50vw;">
						<img src="../../images/pic_tx.png"
							style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
						<div class="font-white-1 marginl-1">关增</div>
					</div>

					<div class="font-white-1 marginr-1">36</div>
				</div>

				<div class="exam_result_item">
					<div class="fontb-white-1-2 marginl-1">2</div>
					<div class="i-row i-align-center" style="width: 50vw;">
						<img src="../../images/pic_tx.png"
							style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
						<div class="font-white-1 marginl-1">关增</div>
					</div>

					<div class="font-white-1 marginr-1">36</div>
				</div>
				<div class="exam_result_item">
					<div class="fontb-white-1-2 marginl-1">2</div>
					<div class="i-row i-align-center" style="width: 50vw;">
						<img src="../../images/pic_tx.png"
							style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
						<div class="font-white-1 marginl-1">关增</div>
					</div>

					<div class="font-white-1 marginr-1">36</div>
				</div>

				<div class="exam_result_item">
					<div class="fontb-white-1-2 marginl-1">2</div>
					<div class="i-row i-align-center" style="width: 50vw;">
						<img src="../../images/pic_tx.png"
							style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
						<div class="font-white-1 marginl-1">关增</div>
					</div>

					<div class="font-white-1 marginr-1">36</div>
				</div>
			</footer>
		</div>


	</v-main>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				data: [],

			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style scoped>
	.exam_result_bg {
		background-image: url(../../images/bg2.png);
		width: 100%;		
		background-size: cover;
		padding-bottom: 2rem;
		min-height: 100vh;
	}

	.exam_result_top {
		width: calc(100vw - 2rem);
		height: 12rem;
		background:rgba(255,255,255,0.36);
		border-radius: 0.8125rem;
		margin: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.exam_result_ring {
		width: 8.5rem;
		height: 8.5rem;
		border-radius: 50%;
		border: 10px solid rgba(255,255,255,0.36);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.exam_result_score {
		font-size: 3.125rem;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #4879FC;
		line-height: 3.125rem;
	}

	.exam_result_score2 {
		font-size: 1.25rem;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #4879FC;
	}

	.exam_result_ranking {
		font-size: 0.9rem;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		background-color: #FFBA00;
		width: 10rem;
		height: 2.5rem;
		line-height: 2.5rem;
		border-radius: 2.5rem;
		text-align: center;
		margin: 1.5rem auto;
	}

	.exam_result_item {
		width: calc(100vw - 2rem);
		height: 4rem;
		background: rgba(255,255,255,0.36);
		border-radius: 0.5rem;
		margin: 0 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}
</style>
