<template>
	<v-main>
		<!-- 课程首页 -->
		<v-app-bar color="#fafafa" flat>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>

			</v-btn>
			<div class="tool_title">竞赛信息</div>

		</v-app-bar>

		<div class="body_no_top ofs">
			<div class="i-bar"></div>


			<div class="list_place">
					
				<div @click="goContest(d.competitionId)"  class="vc i-row" elevation="2" v-for=" d in contestList">
					<div>
						<v-img width="8.75rem" height="5.25rem" :src="d.competitionCover" style="border-radius: 0.3rem;">
						</v-img>
					</div>
					<div class="i-column" style="width: 100%;">
						<div>{{d.competitionName}}</div>
						<div>开始时间:{{d.timingStartTime|truncateTime}}</div>
						
						<div>截止时间:{{d.timingEndTime|truncateTime}}</div>
						<hr style="margin-top: 0.5rem;" />
					</div>
				</div>

			</div>

			<v-pagination v-if="total>1" color="teal lighten-1" v-model="query.page" :length="total"
				prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
			</v-pagination>

			<v-snackbar color="red" v-model="snackbar">
				报名失败,达到最大报名次数
			</v-snackbar>

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
					competitionSort	: undefined,
				},
				contestList: [],
				total: 0,
				currentdata: {},
				dialog: false,
				snackbar: false,
				dataDetail: {
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
			this.query.competitionSort = this.$route.params.id;
			
			this.getContestList();
			
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			go(url) {
				this.$router.push(url);
			},
			/* getContestInfo(query) {
				this.$store.dispatch("competitionMatchInfo", query).then((res) => {
					if (res.data.state == 200) {
						this.datadetail = res.data.data
						this.datadetail.sex = this.datadetail.sex == "男" ? 1 : 2
						this.datadetail.entryTime = this.datadetail.entryTime.split("T")[0]
			
					} else {
			
					}
				}).catch((res) => {
			
				})
			}, */
			/* param : 练习的报名id */
			goContest(id) {
				/* if (this.currentdata.countType >= this.currentdata.examSubmit) {
					this.snackbar = true
					this.dialog = false
					
				} else { */
					//  报名考试  请求接口返回的data是 报名开始的competitionId	竞赛id
					this.$store.dispatch("competitionEnroll", {
						competitionId: id
					}).then((res) => {
						if (res.data.state == 200) {							
							this.turnPage(res.data.data)
						} else {
							this.snackbar = true
						}
					}).catch((res) => {
						this.snackbar = true
					})
				/* } */

			},
			async turnPage(id) {
				this.$router.push({
					name: 'ContestExam',
					params: {
						id: id
					}
				});

			},
			async getContestList() {
				this.$store.dispatch('competitionList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.contestList = res.data.data
						this.total = res.data.count / this.query.rows
						console.log(this.contestList,"当前列表")
					} else {
						this.contestList = []
					}
				}).catch((res) => {
					this.contestList = []
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
				return val.split('T')[0]
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
