<template>
	<div >
		<div v-if="datas.length>0">
			<div class="card_list list_place">
				
				<v-card class="vc  "  v-for=" d in datas">
					<div class="i-row margin-tb1-lr1-25 " style="width: calc(100% - 2.5rem);">
						<v-img alt="暂无图片" height="6rem" width="6rem"  :src="d.examineCover" style ="margin: 0;"></v-img>
						<div class="i-column marginl-1 " style="width: 100%;">
							<div class="font-303232-1 ">{{d.examineName}}</div>
							<div class="font-AFB3B3-09 margint-0-5">结束时间:{{d.endTime | splitTime}}</div>
							<div class="btn-go-quest" @click="goPurchase(d)">参与调研</div>
						</div>
					</div>
					
					
				</v-card>
				
				
			
				<div class="cb"></div>
				<p v-if="more">
					<v-btn block color="teal" dark @click="checkMore">查看更多</v-btn>
				</p>


				<div class="text-center">
				</div>
				<v-snackbar color="red" v-model="snackbar">
					报名时报
				</v-snackbar>

			</div>
			<div v-if="pagination">
				<v-pagination color="teal lighten-1" v-model="page" :length="total" prev-icon="mdi-menu-left"
					next-icon="mdi-menu-right">
				</v-pagination>
			</div>
		</div>
		
		<div class="nothing" v-else>本栏目暂无内容,请稍后再来</div>


	</div>
</template>

<script>
	export default {
		name: "BeingQuestionaryList",
		props: {
			themeId: 0,
			more: true,
			pagination: false
		},
		data() {
			return {
				datas: [],
				page: 1,
				rows: 4,
				total: 0,
				currentdata: {},
				snackbar: false
			}
		},
		created() {
			this.beingExamList()
		},
		methods: {
			turnPage() {
				this.$router.push({
					name: 'Questionary',
					params: {
						id: this.currentdata.examineId
					}
				});
			},
			goExam() {
					this.turnPage()
			},
			goPurchase(val) {
				this.currentdata = val
				
				this.goExam()
			},
			checkMore() {
				this.$router.push({
					name: "CourseCategory",
					params: {
						themeId: this.themeId
					}
				})
			},
			beingExamList() {
				this.$store.dispatch("getBeingQuestionaryList").then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total = 0
						//this.total = Math.ceil(parseInt(res.data.count) / this.rows)
					} else {

					}
				}).catch((res) => {

				})
			}
		},
		watch: {
			page() {
				this.getProgramList()
			}


		},
		filters: {
			splitTime(val) {
				return val.split(" ")[0]
			}
		}
	}
</script>

<style scoped>
	.nothing {
		text-align: center;
		color: #969696;
		font-weight: 500;
		margin-top: 10vh;
	}
	.btn-go-quest {
		width: 6.5rem;
		height: 2.75rem;
		text-align: center;
		line-height: 2.75rem;
		border-radius: 0.5rem;
		background-color: #59C9D8;
		color: #FFFFFF;
		margin-top: 1rem;
		margin-left: auto;
	}
</style>
