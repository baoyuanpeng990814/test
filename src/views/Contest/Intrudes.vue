<template>
	<v-main>

		<div class="intrudes_bg" > 
			<v-app-bar style="background-color: transparent;">
				<v-btn @click="goBack" icon>
					<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>
				
				</v-btn>
				<div class="tool_title" style="color: white;">答题闯关</div>
				<v-spacer></v-spacer>
				
				<v-spacer></v-spacer>			
			</v-app-bar>
			<header>
				<div class="intrudes_head">
					<div class="i-row marginl-1  i-align-center" >
						<img src="../../images/pic_tx.png" style="width: 70px; height: 70px; margin-top: 1rem;" />
						<div class="i-column marginl-1">
							<div class="font-white-1">名字</div>
							<div class="i-row i-align-center">
								<div class="font-white-0-8">Lv.26</div>
								<div class="pro"></div>
							</div>
						</div>
					</div>
					<div class="i-row i-between">
						<div class="intrudes_head_btn">
							<img src="../../images/icon/iocn_coin.png" class="intrudes_head_icon"/>
							<div>秀才</div>
							</div>
						<div class="intrudes_head_btn">
							<img src="../../images/icon/icon_life.png" class="intrudes_head_icon"/>
							<div>秀才</div>
							</div>
					</div>
					
				</div>
				<v-img src="../../images/intrudes_link.png"  class="img-link"/>
			</header>
			
			<footer>
				<div class="intrudes_footer">
					<div class="intrudes_footer_item1">
						
					</div>
				</div>
				<div class="intrudes_footer">
					<div class="intrudes_footer_item1">
						
					</div>
				</div>
				<div class="intrudes_footer">
					<div class="intrudes_footer_item1">
						
					</div>
				</div>
				<div class="intrudes_footer">
					<div class="intrudes_footer_item1">
						
					</div>
				</div>
				<div class="intrudes_footer">
					<div class="intrudes_footer_item1">
						
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

<style >
	.intrudes_bg{
		background-image: url(../../images/bg_intrudes.png);
		width: 100%;
		height: 100%;
		background-size: 100%;
	}
	.intrudes_head{
		background-image: url(../../images/bg_head.png);
		width: calc(100vw - 2rem);
		height: calc(50vw - 1rem);
		background-size: 100%;
		margin: 1rem;
		
	}
	.pro{
		width: 65px;
		height: 7px;
		background: #FFFFFF;
		border: 1px solid #D7D9FF;
		border-radius: 7px;
	}
	.intrudes_head_btn{
		width: 5.625rem;
		height: 1.875rem;
		background: #FFFFFF;
		border-radius: 0.9375rem;
		font-size: 1rem;
		font-weight: 800;
		color: #28BBCE;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		margin: 0 2rem 0 1.5rem;
	}
	.intrudes_head_icon{
		width: 1.375rem;
		height: 1.375rem;
	}
	.img-link{
		width: 74%;
		margin: -2rem auto 0;
	}
	.intrudes_footer{
		background-image: url(../../images/bg_link_item.png);
		width: calc(100vw - 2rem);
		background-size: 100%;
		margin: -0.5rem 1rem 0;
		display: flex;
		flex-direction: column;
	}
	.intrudes_footer_item1{
		background-image: url(../../images/bg_footer_link1.png);
		width: calc(100vw - 3rem);
		background-size: 100%;
		margin: 0.8rem auto;
		height: calc(25vw);
		
	}
</style>
