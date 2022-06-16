<template>
	<v-main>
		<!-- 主页面首页 -->

		<div class="body_no_top ofs homebg">
       <!-- :style="{backgroundColor: bannnerBg}" -->
			<div class="top_carousel">
				<v-carousel cycle interval="10000" height="150px" hide-delimiter-background show-arrows-on-hover
					style="border-radius: 1rem;">
					<v-carousel-item v-for="(item,index) in rotateDetail" :key="item.rotateId" v-if="item.rotateTop==1">
          <!-- v-if="item.rotateRemark == 0" -->
						<v-img height="150px" width="100%" :src="item.picturesUrl"></v-img>
 <!-- @click="go('newsdetail?id='+item.jumpUrl)" -->
					</v-carousel-item>
				</v-carousel>
			</div>
			<div class="menu-all">
				<div class="menu-item" @click="go('courselist')">
					<img src="../../images/icon/icon_xuexi.png">
					</img>
					<span>报名</span>
				</div>
				<div class="menu-item" @click="go('coursehome')">
					<img src="../../images/icon/icon_peixun.png">
					</img>
					<span>培训</span>
				</div>
				<div class="menu-item" @click="go('examhome')">
					<img src="../../images/icon/icon_jingsai.png">
					</img>
					<span>季赛</span>
				</div>
				<!-- ContestIndex -->
        <!-- @click="go('contestindex')" -->
				<div class="menu-item" >
					<img src="../../images/icon/icon_kaoshi.png">
					</img>
					<span>调查</span>
				</div>
				<!-- <div class="menu-item" @click="go('InvestigationHome')">
					<img src="../../images/icon/icon_questionary.png">

					</img>
					<span>问卷调查</span>
				</div> -->
			</div>
	
			<div class="news_list">
				<div class="news_item" v-for="(item,index) in datas" @click="go('newsdetail?id='+item.newId)"
					:key="item.id">
					<v-img class="news_pic" :src="item.newCover" width="6.5rem" height=" 4.625rem"
						style="border-radius: 0.5rem;">
					</v-img>
					<div class="i-column marginl-1 i-with100" style="height:4.625rem">
						<div class="item-title">{{item.newTitle}}</div>
						<div class="item-time">{{item.createTime | truncateTime}}</div>
					</div>
				</div>
			</div>
			<v-pagination v-if="total>1" color="teal lighten-1" v-model="query.page" :length="total"
				prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
			</v-pagination>
		</div>



	</v-main>
</template>

<script>
	export default {
		data() {
			return {
				pics: [require("../../images/banner5.jpg"),
					require("../../images/banner6.png"),
					require("../../images/banner7.png"),
				],
				page: 1,
				rows: 10,
				datas: [],
				query: {
					rows: 10,
					page: 1,
					state: "0",
				},
				total: 0,
				bannnerBg: "#d95a00",
				rotateDetail: []
			}
		},
		created() {
			this.getNewsList();
			this.getRotateList();
		},
		methods: {

			getNewsList() {
				this.$store.dispatch('getNewsList', this.query).then((res) => {
					if (res.data.state == 200) {

						this.datas = res.data.data
					} else {
						this.datas = []
					}

				}).catch((res) => {
					this.datas = []
				})
			},
			go(url) {
				this.$router.push(url);

			},
			getRotateList() {
				this.$store.dispatch("rotateList", {
					rows: 10,
					page: 1,
          rotateRemark:0
				}, ).then((res) => {
					if (res.data.state == 200) {
						this.rotateDetail = res.data.data;
						console.log(this.rotateDetail,"轮播图")
					} else {

					}
				}).catch((res) => {

				})
			},

		},
		filters: {
			truncateTime(val) {
				return val.split('T')[0]
			}
		}
	}
</script>

<style>
.homebg{
  background: #eef4f9;
}
	.top_carousel {
		width: 100%;
		padding: 1rem 1rem 0;
		height: 140px;
		background-size: cover;
	}

	.menu-all {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
		margin-top: 20px;

	}

	.menu-item {
		margin: 16px 0 0;
		display: flex;
		flex-direction: column;
		text-align: center;


	}

	.menu-item>span {
    padding-left:6px;
		font-size: 13px;
		color: #7C7578;
	}

	.menu-item>img {
		width:auto;
		height: 46px;
	}

	.news_list {
		display: flex;
		flex-direction: column;
		width: 100%;
    height: calc(100vh - 300px);
    overflow: scroll;
	}

.news_item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0.5rem 1rem;
    padding: 1rem;
    /* border-bottom: 1px #F2F2F2 solid; */
    background: #fff;
    border-radius: 5px;
}

	.item-title {
		font-size: 15px;    
		color: #323030;
    overflow:hidden;   
    line-height: 20px;
    
    height:40px;
display: -webkit-box;

-webkit-line-clamp: 2;

-webkit-box-orient: vertical;

overflow:hidden;

text-overflow:ellipsis;


	}

	.item-title2 {
		font-size: 1rem;
		font-weight: bold;
		color: black;

	}

	.item-time {
        margin-top: auto;
		font-size: 0.8125rem;
		font-weight: 400;
		color: #A29B9B;
		text-align: end;
	}

	.i-with100 {
		width: 100%;
	}

	hr {
		background-color: #F2F2F2;
		height: 1px;
		border: none;
		margin: 1rem 0;
	}

	.v-carousel__controls__item {
		margin: 4px;
	}

	.v-btn--icon.v-size--small.v-carousel__controls__item {
		height: 4px;
		width: 4px;
	}

	.v-btn__content {
		align-items: center;
		color: inherit;
		display: flex;
		flex: 1 0 auto;
		justify-content: inherit;
		line-height: normal;
		position: relative;
		transition: inherit;
		transition-property: opacity;
		background: #;
	}

	span {
		color: #535656;
		line-height: 1.5rem;
	}


	.v-carousel__controls__item>.v-btn__content>.mdi:before,
	.mdi-set {
		display: inline-block;
		font: normal normal normal 24px/1 "Material Design Icons";
		font-size: inherit;
		text-rendering: auto;
		line-height: inherit;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 4px;

	}

	.v-carousel__controls {
		align-items: center;
		bottom: 0;
		display: flex;
		height: 30px;
		justify-content: center;
		list-style-type: none;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
</style>
