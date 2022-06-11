<template>
	<v-main>

		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">学习记录</div>

		</v-app-bar>
		<div class="body_height ofs">
			<div class="history_list">
				<div class="history_item" v-for="(item,index) in data">

					<!-- 上方标题 -->
					<div class="i-column" @click="showDate(index)">
						<div class="history_date" v-show="item.date!=showDate(index)" >{{item.date}}  </div>
						<!-- 列表详情 -->
						<div class="i-row">
							<div class="i-column">
								<v-img :src="item.picUrl" width="9rem" height="5rem" class="vedio-bg">
									<div class="vedio-text">共{{item.number}}节</div>
									<div class="vedio-bar" :style=" {width : item.program*0.09+ 'rem' }"></div>
								</v-img>

							</div>

							<div class="i-column marginl-1 i-content-center">
								<div class="history_title">{{item.tittle}}</div>
								<div class="i-row">
									<img class="history_icon" src="../../images/icon/icon_phone.png" />
									<div class="font-666-0-8 marginl-0-5" v-show="item.program<98">已观看{{item.program}}%
									</div>
									<div class="font-666-0-8 marginl-0-5" v-show="item.program>=98">已看完</div>
								</div>

							</div>
						</div>
					</div>


					<!-- <img class="item-pic"  :src="item.picUrl"  /> -->

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

				data: [{
						"id": 131,
						"tittle": "小儿推拿·基础妈妈班",
						"number": 14,
						"program": 85,
						"picUrl": "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideohori/x/xrujob2wbjghl14_big.jpg",
						"date": "2021-06-09"
					},
					{
							"id": 132,
							"tittle": "中国资产管理武夷峰会概述管理 协会",
							"number": 18,
							"program": 85,
							"picUrl": "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideohori/x/xrujob2wbjghl14_big.jpg",
							"date": "2021-06-09"
						},
					{
						"id": 132,
						"tittle": " 养生·四季养生,身心协调统一新境界",
						"number": 5,
						"program": 23,
						"picUrl": "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideohori/m/mzc00200panqlio_big.jpg",
						"date": "2021-06-08"
					},
					{
						"id": 133,
						"tittle": "小推车高效时间管理法，让你每天多出2小时",
						"number": 18,
						"program": 100,
						"picUrl": "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideohori/m/mzc00200ojud5uo_big.jpg",
						"date": "2021-05-18"
					},
					{
						"id": 133,
						"tittle": "小推车高效时间管理法，让你每天多出2小时",
						"number": 18,
						"program": 100,
						"picUrl": "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideohori/m/mzc00200ojud5uo_big.jpg",
						"date": "2021-05-18"
					}
				],


			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			// 设置日期 跟上面的日期比较 如果一样 则不显示，param ：遍历的序列号  ，
			showDate(index){
				if(index === 0){
					return  0;
				}
				var t = this.data[index-1];
				console.log(index)
				console.log(t)
				
				return t.date;
			}
		}
	}
</script>

<style scoped>
	.v-toolbar__title {
		margin: 0 auto;
	}

	.history_list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.history_item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 1rem;
		
	}

	.history_icon {
		width: 10px;
		height: 14px;

	}

	.vedio-bar {

		height: 0.2rem;
		background-color: #28BBCE;
		bottom: 0;
		position: absolute;
	}

	.vedio-text {
		color: #FFFFFFFF;
		font-size: 0.8rem;
		right: 0;
		bottom: 0;
		position: absolute;
	}

	.history_title {
		margin: 0;
		text-align: start;
		width: fit-content;
		height: max-content;
		font-size: 1rem;
		color: #000000;


	}

	.history_date {
		font-size: 1rem;
		font-weight: 700;
		color: #3A3A3A;
		margin-bottom: 1rem;
		line-height: 1rem;
	}
</style>
