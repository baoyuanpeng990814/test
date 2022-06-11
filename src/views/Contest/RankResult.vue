<template>
	<v-main>
		<div class="rank_result_bg">
			<v-app-bar style="background-color: white;">
				<v-btn @click="goBack" icon>
					<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>

				</v-btn>
				<div class="tool_title">本关排名</div>
				<v-spacer></v-spacer>

				<v-spacer></v-spacer>
			</v-app-bar>
			<header>

				<!--  -->
				<div class="rank_result_top">
					<v-progress-circular rotate="270" size="136" width="8" :value="value" color="#FF8E16">
						<div class="rank_result_score">{{value}}</div>
						<div class="rank_result_score2">分</div>

					</v-progress-circular>
				</div>


			</header>
			<div class="rank_result_item">
				<div class="font-444242-09 marginl-1">我的本关排名:</div>

				<div class="font-3AB8C8-0-9 marginr-1"> 2 <span class="font-444242-09">/64</span></div>
			</div>

			<div class="rank_result_item">
				<div class="font-444242-09 marginl-1">我的通关总时长: </div>

				<div class="font-3AB8C8-0-9 marginr-1"> 188小时56分</div>
			</div>
			<footer>
				<div class="rank_result_list">
					<div class="rank_result_item2">
						<div class="font-3AB8C8-1-2 marginl-1">2</div>
						<div class="i-row i-align-center" style="width: 50vw;">
							<img src="../../images/pic_tx.png"
								style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
							<div class="font-444242-09 marginl-1">关增</div>
						</div>

						<div class="font-3AB8C8-0-9 marginr-1">160小时30分</div>
					</div>
					<div class="rank_result_item2">
						<div class="font-3AB8C8-1-2 marginl-1">2</div>
						<div class="i-row i-align-center" style="width: 50vw;">
							<img src="../../images/pic_tx.png"
								style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
							<div class="font-444242-09 marginl-1">关增</div>
						</div>

						<div class="font-3AB8C8-0-9 marginr-1">160小时30分</div>
					</div>
					<div class="rank_result_item2">
						<div class="font-3AB8C8-1-2 marginl-1">2</div>
						<div class="i-row i-align-center" style="width: 50vw;">
							<img src="../../images/pic_tx.png"
								style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
							<div class="font-444242-09 marginl-1">关增</div>
						</div>

						<div class="font-3AB8C8-0-9 marginr-1">160小时30分</div>
					</div>
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
				value: 0,
				data: [],
				score: 88,
				interval: {},
			}
		},
		created() {

		},
		beforeDestroy() {
			clearInterval(this.interval)
		},
		mounted() {
			this.interval = setInterval(() => {
				if (this.value === this.score) {
					return (this.value)
				}
				this.value += 1
			}, 50)
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style >
	.rank_result_bg {

		width: 100%;
		height: 100%;
		background-size: 100%;
	}

	.rank_result_top {
		width: calc(100vw - 2rem);
		height: 12rem;
		background: #ffffff5c;
		border-radius: 0.8125rem;
		margin: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rank_result_ring {
		width: 8.5rem;
		height: 8.5rem;
		border-radius: 50%;
		border: 10px solid #FF8E16;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.rank_result_score {
		font-size: 3.125rem;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FD9322;
		line-height: 3.125rem;
		text-shadow: 2px 2px 1px rgba(187, 101, 10, 0.6);
	}

	.rank_result_score2 {
		font-size: 1.25rem;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FD9322;
		margin-top: auto;
		line-height: 1.5rem;

	}

	.rank_result_ranking {
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

	.rank_result_item {
		width: calc(100vw - 2rem);
		height: 4rem;
		background: #ffffff;
		border-radius: 0.5rem;
		margin: 0 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
		border: 1px solid #47CFE0;
		border-radius: 8px;
	}

	.rank_result_list {
		width: calc(100vw - 2rem);
		border: 1px solid #47CFE0;
		border-radius: 8px;
		margin: 0 1rem;
	}

	.rank_result_item2 {
		height: 4rem;
		background: #ffffff;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

	}
	
	
</style>
