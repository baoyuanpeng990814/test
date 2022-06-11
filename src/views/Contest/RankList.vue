<template>
	<v-main >
		<div class="bg_rank">
			<v-img height="59.2vw" width="100%"  src="../../images/banner_rank2.png" >
				<v-app-bar style="background-color: transparent; box-shadow: 0px 0px 0px 0px;">
					<v-btn @click="goBack" icon>
						<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>				
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn dark text @click="drawer = true" icon >
						筛选
						<img class="icon_img marginr-1" src="../../images/icon/icon_filter.png" />
					</v-btn>					
				</v-app-bar>
			</v-img>
			<div class="rank_bar_h" style="margin: 0 auto -1px; "></div>
			<div class="rank_title">
				<div class="rank_bar_v" ></div>
				恭喜以下选手荣获好成绩
				<div class="rank_bar_v" ></div>
			</div>
			<div class="rank_bar"></div>
			
			<div class="rank_list">
				<div class="rank_list_title"></div>	
				<div style="margin-top: 2.25rem;"></div>
				<div class="rank_list_item" ></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
				<div class="rank_list_item"></div>
			</div>
			
			
		</div>
		
		
		<v-navigation-drawer class="rank_drawer" v-model="drawer" v-show="drawer" absolute bottom temporary >
			
			<div class="filter_title">
				<v-btn  text disabled style="background-color: transparent;"></v-btn>
				筛选条件				
				<div style="float: right;">
					<v-btn @click="drawer=false" text>
						<v-img src="../../images/icon/icon-close.png" max-width="1rem" max-height="1rem"></v-img>
					</v-btn>
				</div>
			</div>
			<div class="search_list" >
				<div v-for="(item, index) in sortDetail">
					<div class="search_card" @click="searchSort(item.competitionSortId)">{{item.competitionSortName}}</div>
				</div>								
			</div>
			<div class="i-row marginlr-1">
				<div class="search_btn1">重置</div>
				<div class="search_btn2">确定</div>
			</div>
			
		</v-navigation-drawer>
	</v-main>
</template>

<script>
	export default {
		components: {


		},
		data() {
			
			return {
				sortDetail : [],
				drawer: false,
				query: {
					page : 1,
					rows : 20,
				},
				queryInfo: {
					page : 1,
					rows : 20,
				},
			}
		},
		created() {
			this.getCompetitionSort();
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			go(url) {
				this.$router.push(url);			
				
			},
			/* 获取竞赛分类列表 */
			getCompetitionSort(){
				this.$store.dispatch("competitionSort",this.query).then((res) => {
					if (res.data.state == 200) {
						this.sortDetail = res.data.data;
						console.log(this.sortDetail)
					} else {
				
					}
				}).catch((res) => {
				
				})
			},
			searchSort(id){
				
			}
		}
	}
</script>

<style scoped="scoped">
	.bg_rank{
		background-image: url(../../images/bg_red.png);
		width: 100vw;
		height: 100vh;
		background-size: cover;
		overflow-y: hidden;
		
	}
	.icon_img{
			width: 1rem;
			height: 1rem;
			object-fit: contain;				
	}
	.rank_title{
		width: calc(100vw - 4rem);
		height: 5.125rem;
		background: #C61D1F;
		border-radius: 0.4rem;
		margin: 0 auto;
		font-size: 1.25rem;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 5.125rem;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;		
	}
	.rank_bar_v{
		width: 1px;
		height: 4rem;
		opacity: 0.4;
		background:radial-gradient(circle at center,#FFFFFF 0,#C61D1F 100%);
	}
	.rank_bar_h{
		width: 14rem;
		height: 1px;
		background: #FFFFFF;
		opacity: 0.4;
		background:radial-gradient(circle at center,#FFFFFF 0,#C61D1F 100%);
	}
	.rank_bar{
		background-image: url(../../images/bg_bar.png);
		width: calc(100vw - 2rem);
		height: 1rem;
		background-size:100% 100%;
		margin: -0.5rem 1rem 0;	
		
	}
	.rank_list_title{
		width: calc(100vw - 4rem);
		height: 2.25rem;		
		background: linear-gradient(180deg, rgba(255, 203, 140, 0.98), rgba(255, 234, 199, 0.98));
		box-shadow: 2px 1px 6px 2px rgba(250, 28, 4, 0.34);
		border-radius: 0 0  0.5rem  0.5rem;
		border-bottom: 2px solid rgba(255, 234, 199, 0.98);
		position: fixed;
		
	}
	.rank_list{
		width: calc(100vw - 4rem);
		height: calc(100vh - 59.2vw - 7rem);	
		margin: -0.4rem 2rem 0;
		background: linear-gradient(180deg, rgba(255, 203, 140, 0.98), rgba(255, 234, 199, 0.98));
		position: relative;
		overflow-y: scroll;
	}
	.rank_list_item{
		width: calc(100vw - 5.25rem);
		height: 3.375rem;	
		margin: 1rem auto;
		background: #FFFFFF;
		border-radius: 0.3rem;
	}
	.rank_drawer{
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.filter_title{				
		font-size: 1rem;
		color: #2A2B2B;
		line-height: 36px;	
		text-align: center;
		padding-top: 0px;
		padding-bottom: 0px;
		background-color: white;
		box-sizing: border-box;
		width: 100vw;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;		
	}
	.search_list{		
		width: 100vw;
		height: fit-content;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		
		
	}
	.search_card{
		width: 30vw;
		height: 2rem;
		background: #EFEFEF;
		border-radius: 1rem;
		line-height: 2rem;
		font-size: 0.8rem;
		text-align: center;
		color: #3A3838;
		margin: 0.5rem 0;
	}
	.search_btn1{
		width: calc(50vw - 1rem);
		height: 2.5rem;
		background: #31C8DB;
		border-radius: 1rem;
		line-height: 2.5rem;
		font-size: 1rem;
		text-align: center;
		color: #FFFFFF;
		border-radius: 1.25rem  0  0  1.25rem;
	}
	.search_btn2{
		width: calc(50vw - 1rem);
		height: 2.5rem;
		background: #21a9fa;
		border-radius: 1rem;
		line-height: 2.5rem;
		font-size: 1rem;
		text-align: center;
		color: #FFFFFF;
		border-radius: 0 1.25rem  1.25rem 0;
	}
</style>
