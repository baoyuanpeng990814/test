<template>
	<div>
		<div v-if="datas.length>0">
			<div class="card_list list_place">
				<v-card class="vc " v-for=" d in datas">
					<div class="i-row margin-tb1-lr1-25 " style="width: calc(100% - 2.5rem);">
						<v-img maxHeight="6.625rem" maxWidth="6.625rem" :src="d.examCoverUrl"></v-img>
						<div class="i-column marginl-1 i-with100" >
							<div class="font-292828-09 ">{{d.examName}}</div>
							<span class="font-A9ADAD-0-9 margint-0-5">答题时间:{{d.timingStartTime }} 分钟</span>
							<span class="font-A9ADAD-0-9 margint-0-5">结束时间:{{d.failureTime | splitTime}}</span>
							<div class="btn-go" @click="goPurchase(d)">参加竞赛</div>
						</div>

					</div>



				</v-card>


				<!-- <p v-if="more">
					<v-btn block color="teal" dark @click="checkMore">查看更多</v-btn>
				</p> -->

				<div class="text-center">
					<v-dialog v-model="dialog" width="500">

						<v-card>
							<v-card-title  style="padding-top: 2.25rem;">
								
								<span class=" font-2A2B2B-1 i-center marginlr-auto " >
									参考须知
								</span>
								
							</v-card-title>

							<v-card-text>
								<div>&nbsp;</div>
								<div v-html="currentdata.examNotice"></div>
								<div v-html="currentdata.examPrologue"></div>
							</v-card-text>
							<v-card-actions>
								
								<v-btn text @click="dialog = false" width = "6rem" height= "2.5rem" style="border: 0.0625rem solid #28BBCE; color: #28BBCE; ">
									退出
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn  text @click="goExam()" width = "6rem" height="2.5rem" style=" background-color: #28BBCE; color: white; ">
									参加
								</v-btn>
							
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>
				<v-snackbar color="red" v-model="snackbar">
					报名失败,达到最大报名次数
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
		name: "BeingExamList",
		props: {
			themeId: 0,
			more: true,
			pagination: false,
			//返回的报名id
			id: 0 ,
		},
		data() {
			return {
				datas: [],
				page: 1,
				rows: 4,
				total: 0,
				dialog: false,
				currentdata: {},
				snackbar: false,
				enrollId:0
			}
		},
		created() {
			this.beingExamList()
		},
		methods: {
			//弹出提示后跳转到考试详情页面 id 是报名后回调的examUserId 报名id
			turnPage() {
							
				this.$router.push({
					name: 'Exam',
					params: {
						id: this.id,
						
					}
				});
			},
			goExam() {
				/*  */
				/*  if (this.datadetail.count >= this.datadetail.exam.examSubmit) {
            this.$message.error("您已经完成了此考试")
            clearInterval(this.timer)
            this.timeout = true
            this.$router.push('/ExamFinder')
          } */
				/* 判断还有答题次数吗 */
				if (this.currentdata.count >= this.currentdata.examFrequency) {
					this.snackbar = true
					this.dialog = false
					
				} else {
					//  报名考试  请求接口返回的data是 报名开始的examUserId
					this.$store.dispatch("enrollExam", {
						examId: this.currentdata.examId
					}).then((res) => {
						if (res.data.state == 200) {
							this.id = res.data.data
							this.turnPage()
						} else {
							this.snackbar = true
						}
					}).catch((res) => {
						this.snackbar = true
					})
				}

			},
			goPurchase(val) {
				this.currentdata = val
				this.dialog = true
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
				this.$store.dispatch("beingExamList").then((res) => {
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

	.btn-go {
		width: 6.5rem;
		height: 2.75rem;
		text-align: center;
		line-height: 2.75rem;
		border-radius: 0.5rem;
		background-color: #59C9D8;
		color: white;
		margin-top: 1rem;
		margin-left: auto;
	}
</style>
