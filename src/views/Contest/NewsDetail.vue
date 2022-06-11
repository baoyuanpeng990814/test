<template>
	<v-main>

		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">
				新闻详情
			</div>

		</v-app-bar>
		<div class="body_no_top ofs ">
			<div class="margin1">
				<div class="font-1F2020-1-3 i-center">{{datas.newTitle}}</div>
				<div v-html="datas.content" id="newDetail"></div>

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
				datas: [],
			}
		},
		created() {
			console.log(this.$route.params.id)
			this.getNewsDetail(this.$route.params.id);
		},
		methods: {
			getNewsDetail(id) {
				this.$store.dispatch('competitionNewsInfo',id).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
					} else {
						this.datas = []
					}
					console.log(this.datas)
				}).catch((res) => {
					this.datas = []
				})
			},
			goBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style scoped>
	.v-toolbar__title {
		margin: 0 auto;
	}

	.news_list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.news_item {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 0.5rem;
		border-bottom: 1px lightgray solid;
	}

	.item-title {
		font-size: 1rem;
		font-weight: bold;
		color: black;
		margin-right: 1rem;
		width: 34rem;
	}

	.item-pic {
		width: 10rem;
		height: 5rem;

	}

	#newDetail {
		width: 90%;
		margin: 1rem auto;
	}


	/* 设置富文本的宽高 */
	#newDetail>>>p > img {
		width: 100%;
		margin-left: -2rem;
	}
	#newDetail> img {
		width: 100%;
		margin-left: -2rem;
	}
	#newDetail>>>img {
		width: 100%;
		
	}
	#newDetail>>>p {	
		margin-block-start: 0;
		margin-block-end: 0;
		text-indent: 2rem;
		margin-top: 1rem;
	}
</style>
