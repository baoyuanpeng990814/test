<template>
	<v-main>
		<!-- 课程首页 -->
		<v-app-bar color="#fafafa" flat>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>

			</v-btn>
			<div class="tool_title">题库练习</div>

		</v-app-bar>

		<div class="body_no_top ofs">
			<div class="i-bar"></div>


			<div class="list_place">

				<div @click="goExercise(d.examId)" class="vc i-row" elevation="2" v-for=" d in datas">
					<div>
						<v-img width="8.75rem" height="5.25rem" :src="d.examCoverUrl" style="border-radius: 0.3rem;">
						</v-img>
					</div>
					<div class="i-column" style="width: 100%;">
						<div>{{d.examName}}</div>
						<div style="padding: 0; margin: 0; height: 0.5rem;"></div>
						<div>截止时间:{{d.failureTime|truncateTime}}</div>
						<hr style="margin-top: 1.5rem;" />
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
				query: {
					rows: 5,
					page: 1,
					state: "0",
				},
				datas: [],
				total: 0,
				currentdata: {},
				dialog: false,
				snackbar: false,
				datadetail: {
					exam: {
						examName: ""
					}
				},
				remnantTime: 0,
				timer: null,
				questions: [],
				questionIndex: 0,
				answer: "",
				answerforc: [],
			}
		},
		created() {
		
			this.getExerciseList();
		},
		methods: {

			goBack() {
				this.$router.go(-1)
			},
			go(url) {
				this.$router.push(url);
			},
			/* param : 练习的报名id */
			goExercise(id) {
				if (this.currentdata.countType >= this.currentdata.examSubmit) {
					this.snackbar = true
					this.dialog = false
					console.log("报名次数222")
				} else {
					//  报名考试  请求接口返回的data是 报名开始的examUserId
					this.$store.dispatch("enrollExercise", {
						examId: id
					}).then((res) => {
						if (res.data.state == 200) {
							
							this.turnPage(res.data.data)
						} else {
							this.snackbar = true
						}
					}).catch((res) => {
						this.snackbar = true
					})
				}

			},
			async turnPage(id) {
				this.$router.push({
					name: 'Exercise',
					params: {
						id: id
					}
				});

			},
			async getExerciseList() {
				this.$store.dispatch('getExerciseList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total = res.data.count / this.query.rows
					} else {
						this.datas = []
					}
				}).catch((res) => {
					this.datas = []
				})

			},

			handleSizeChange(newSize) {
				this.queryInfo.rows = newSize
				this.getUserList()

			},
			handleCurrentChange(newPage) {
				this.query.page = newPage
				this.getExamList()
			}
		},
		
		watch: {},
		filters: {
			truncateTime(val) {
				return val.split(' ')[0]
			}
		}
	}
</script>

<style>
	.tool_title {
		font-size: 1.125rem;
		width: 100%;
		font-weight: 500;
		color: #2A2C2C;
		text-align: center;
		margin-right: 2rem;
	}

	.v-toolbar__title {
		margin: 0 auto;
	}

	.i-bar {
		height: 1px;
		border-bottom: 0.125rem solid #F2F2F2;
	}

	.top_choose {
		background-color: transparent;
		width: 100%;
		height: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: 0.5rem;
	}

	.btn_choose {}

	.font-state {
		width: 5rem;
		height: max-content;
		color: black;
		margin: auto 0;
		text-align: center;
	}

	hr {
		background-color: #F2F2F2;
		height: 1px;
		border: none;
		margin: 0.5rem 0;
	}
</style>
