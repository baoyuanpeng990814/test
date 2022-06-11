<template>
	<v-main>

		<div class="choose_level_bg">
			<div class="i-row i-align-center i-between" style="height: 56px;">
				<v-btn @click="goBack" icon style="margin-right: 34px;">
					<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>

				</v-btn>
				<div style="color: white;">选择关卡</div>
				<div class="i-row i-align-center " style="width: 60px; margin-right: 10px;">
					<div style="color: white; margin-right: 0.2rem;">筛选</div>
					<v-img src="../../images/icon/icon_filter.png" height="14px" width="14px" contain></v-img>
				</div>
			</div>
			<div class="choose_level_list">
				<div class="choose_level_item">
					<div class="star-index">1</div>
					<div class="icon_star_list">
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
					</div>
				</div>
				
				<div class="choose_level_item">
					<div class="star-index">2</div>
					<div class="icon_star_list">
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
					</div>
				</div>
				<div class="choose_level_item">
					<div class="star-index">3</div>
					<div class="icon_star_list">
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
					</div>
				</div>
				<div class="choose_level_item">
					<div class="star-index">4</div>
					<div class="icon_star_list">
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
						<img class="icon_star" src="../../images/icon/icon_star.png" />
					</div>
				</div>
			</div>
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

<style>
	.choose_level_bg {
		background-image: url(../../images/bg3.png);
		width: 100%;
		background-size: cover;
		padding-bottom: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.choose_level_list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
	}

	.choose_level_item {
		width: 50%;
		height: 35vw;
		background: url(../../images/bg_item.png);
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.icon_star_list {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;

	}

	.icon_star {
		width: 5vw;
		height: 5vw;
	}

	.star-index {
		font-size: 13vw;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		text-shadow: 0px 2px 6px rgba(17, 158, 177, 0.33);}
		
</style>
