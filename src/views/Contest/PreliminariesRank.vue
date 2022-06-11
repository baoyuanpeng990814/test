<template>
	<v-main>

		<div class="preliminaries_bg">
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
			<div class="i-row" style="width: calc(100vw - 1rem ); margin:0 auto ; justify-content: space-around; z-index: 2;">
				<div class="i-column i-align-center">
					<img src="../../images/icon/icon_crown2.png" />
					<img src="../../images/icon/iocn_coin.png"
						style="width: 5.2rem; height: 5.2rem;border-radius: 50%; " />
					<div class="rank_index1 margint-2">2</div>
					<div class="fontb-white-1-2 margint-0-5">王者2</div>
					<div class="rank_index2">925</div>
				</div>
				<div class="i-column i-align-center">
					<img src="../../images/icon/icon_crown1.png" />
					<img src="../../images/pic_tx.png"
						style="width: 5.5rem; height: 5.5rem;border-radius: 50%;" />
					<div class="rank_index1">1</div>
					<div class="fontb-white-1-2 margint-0-5">王者2</div>
					<div class="rank_index2">925</div>
				</div>
				<div class="i-column i-align-center">
					<img src="../../images/icon/icon_crown3.png" />
					<img src="../../images/pic_tx.png"
						style="width: 5.2rem; height: 5.2rem;border-radius: 50%; " />
					<div class="rank_index1 margint-3">3</div>
					<div class="fontb-white-1-2 margint-0-5">王者3</div>
					<div class="rank_index2">925</div>
				</div>
			</div>
			
				
			<div class="rank_index">				
			</div>
			<div class="rank_index3">
				<div class="rank_index4">
					<div class="fontb-F39103-1-2 marginl-1">4</div>
					<div class="i-row i-align-center" style="width: 50vw;">
						<img src="../../images/pic_tx.png"
							style="width: 2.125rem; height: 2.125rem;border-radius: 50%;" />
						<div class="marginl-1">关增</div>
					</div>				
					<div class="marginr-1" style="color: #7448F7;">850分</div>
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
.preliminaries_bg{
	background: linear-gradient(180deg, #FF9A00, #FFAB00);
	width: 100%;
	background-size: cover;
	padding-bottom: 2rem;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.rank_index{
	width: calc(100vw - 2rem);
	margin: 0 1rem;
	background: url(../../images/bg_rank2.png);
	height: 35vw;
	margin-top: -8rem;
	background-size: 100%;
	z-index: 1;
}
.rank_index1{
	color: #7448F7;
	font-size: 1.3rem;
}
.rank_index2{
	width: 4.875rem;
	height: 1.875rem;
	background: #FFBA00;
	border-radius: 0.9375rem;
	color: #7448F7;
	text-align: center;
	line-height: 1.875rem;
	margin-top: 0.8rem;
}
.rank_index3{
	width: calc(100vw - 2rem);
	margin: 0 1rem;
	background: #EFEFF9;
	margin-top: 2rem;
	min-height: 40vh;
	background-size: 100%;
	border-radius: 0.625rem;
	
}
.rank_index4 {
		width: calc(100vw - 2rem);
		height: 4rem;
		background: transparent;
		border-radius: 0.5rem;
		color: #F39103;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}
</style>
