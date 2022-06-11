<template>
	<v-main>
		<!-- 课程首页 -->
		<v-app-bar color="#fafafa" flat>
			<div class="tool_title_center_l">考试</div>
			<div style="width: 50px; color: #19B6CA;" @click="go('myArchives')">成绩</div>
		</v-app-bar>
		<div class="body_height ofs">
			<div class="i-bar"></div>
			<!-- 头部筛选框 -->
			<v-btn-toggle v-model="query.state" group borderless light style="background-color: transparent;"
				color="#04B8CF">
			
				<div class="font-state">状态</div>
				<v-btn value="0" class="btn_choose" color="#04B8CF" max-height="2rem">
					已报名
				</v-btn>
				<v-btn value="1" class="btn_choose" color="#04B8CF" max-height="2rem">
					已考试
				</v-btn>					
			</v-btn-toggle>
			<div class="i-row">
				<!-- 侧栏筛选框 按照考试种类筛选 -->
				<div class="left_tab2">
				<v-tabs style="background-color: transparent;" vertical slider-color="#24BFD3"
					color="#24BFD3" slider-size=1 >				
						<div v-for="e in examSorts">
							<v-tab   class="btn_choose" @click="setExamSort(e.examSortId)" :value = "e.examSortId">
								{{e.examSortName}}
							</v-tab>
						</div>					
				</v-tabs>
				</div>
				<hr />

				<div class="list_place" style="width: 100%;">
				
					<div @click="goPurchase(d)" class="vc" elevation="2" v-for=" d in datas">
						<div>
							<v-img width="5.75rem" height="5.75rem" :src="d.examCoverUrl"></v-img>
						</div>
						<div class="i-column"  >
							<div >{{d.examName}}</div >
							<div  v-if="d.timingType=='2'" >截止时间:{{d.failureTime|truncateTime}}</div >
							<div  v-if="d.timingType=='1'" >答题时间:{{d.timingStartTime}}分钟</div >
							<div  v-if="d.timingType=='1'" >截止时间:{{d.failureTime|truncateTime}}</div >
							<hr />
						</div>						
						<div class="cb"></div>						
					</div>
				
				</div>
				<hr />
			</div>		
			<v-pagination v-if="total>1" color="#28BBCE" v-model="query.page" :length="total"
				prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
			</v-pagination>

		</div>
		<div class="text-center ">
			<v-dialog v-model="dialog" width="500">

				<v-card>
					<v-card-title  style="padding-top: 2.25rem;">
						
						<span class=" font-2A2B2B-1 i-center marginlr-auto " >
							参考须知
						</span>
						
					</v-card-title>

					<v-card-text style="padding: 1rem ; ">
						<div>&nbsp;</div>
						<div v-html="currentdata.examNotice"></div>
						<div v-html="currentdata.examPrologue"></div>
					</v-card-text>					
					<v-card-actions>
						<v-btn text @click="dialog = false" width = "6rem" height= "2.5rem" style="border: 0.0625rem solid #28BBCE; color: #28BBCE; ">
							退出
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn  text @click="turnPage()" width = "6rem" height="2.5rem" style=" background-color: #28BBCE; color: white; ">
							参加
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<v-snackbar color="red" v-model="snackbar" timeout = 2000 >
			报名失败,报考次数达到上限了
		</v-snackbar>
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
					type : "1",
					examSortId: undefined
				},
				datas: [],
				total: 0,
				/* 当搜查全部的时候不传输分类id */
				examSorts: [{
					createTime: "2021-05-07T01:12:47.000+0000",
					createUser: "1",
					description: "",
					examSortName: "全部",
					organizationId: 2,
					organizationName: "公司总部",
					parentNode: 0,
					state: "1"
				}],
				currentdata: {},
				dialog: false,
				snackbar: false,
			}
		},
		methods: {
			/* 弹窗 */
			goPurchase(val) {
				console.log(this.query)
				/* 判断是否是已考试的列表 */
				if(this.query.state !="1"){
					this.currentdata = val
					this.dialog = true
				}
				
				
			},
			/* 跳转考试页面携带请求参赛 */
			goExam() {
				// 判断还有报名次数
				/* if (this.currentdata.countType >= this.currentdata.examSubmit) {
					this.snackbar = true
					this.dialog = false
				} else {
					// 报名成功 跳转答题页面 
					this.$store.dispatch("enrollExam", {
						examId: this.currentdata.examId
					}).then((res) => {
						if (res.data.state == 200) {
							this.turnPage()
						} else {
							this.snackbar = true
						}
					}).catch((res) => {
						this.snackbar = true
					})
				} */
				
				this.$store.dispatch("enrollExam", {
					examId: this.currentdata.examId
				}).then((res) => {
					if (res.data.state == 200) {
						this.turnPage()
					} else {
						this.snackbar = true
					}
				}).catch((res) => {
					this.snackbar = true
				})

			},
			async turnPage() {
			
				this.$router.push({
					name: 'Exam',
					params: {
						id:this.currentdata.examUserId
					}
				});
				//console.log(this.currentdata);	
			},
			// 获取考试列表  this.total 移动端会显示小数，取整
			async getExamList() {
				this.$store.dispatch('getExamList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total  = Math.ceil(res.data.count / this.query.rows) 
					} else {
						this.datas = []
					}
				}).catch((res) => {
					this.datas = []
				})

			},
			// 获取左侧菜单栏考试列表筛选功能排序
			async getExamSortList() {

				this.$store.dispatch('examSortlist', {
					parentNode: 0,
					page: 1,
					rows: 50
				}).then((res) => {
					if (res.data.state == 200) {
						
						this.examSorts = this.examSorts.concat(res.data.data);
						
						//console.log("66666",this.examSorts)
						this.$forceUpdate()
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
			setExamSort(id){				
				this.query.examSortId = id;
				this.getExamList()
								
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
		created() {
			this.getExamSortList()
			this.getExamList()
			
		},
		watch: {
			
			'query.state'(val) {
				this.getExamList();
				
			},
			'query.page'(val) {
				this.getExamList();
			}


		},
		filters: {
			truncateTime(val) {
				return val.split(' ')[0]
			}
		}
	}
</script>

<style scoped="scoped">
	.tool_title_center_l{
		font-size: 1.125rem;
		width: 100%;
		font-weight: 500;
		color: #2A2C2C;
		text-align: center;		
		margin-left: 50px;
	}

	.v-toolbar__title {
		margin: 0 auto;
	}
	.i-bar {
		height: 1px;
		border-bottom: 0.125rem solid #F2F2F2;
	}
	
	.left_tab2 {
		width: 5rem;		
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
