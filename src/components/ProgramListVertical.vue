<template>
	<div>
		<div v-if="datas.length>0">
			<div class="card_list_vertical">
				<ul>
					<li @click="goPurchase(d)" v-for="d in datas">
						<v-card>
							<div>
								<v-img alt="暂无图片" width="100%" height="130px" :src="d.courseCover"></v-img>
							</div>
							<div>
								<v-card-subtitle>
									<div>
										{{d.courseName}}
									</div>

									<div>学时:{{d.classHours}}</div>
									<div>学习人数:{{d.people}}</div>
									<div>{{d.description}}</div>
								</v-card-subtitle>
							</div>
							<div>
							</div>
						</v-card>
					</li>
				</ul>
				<div class="cb"></div>
				<p v-if="more">
					<v-btn block color="teal" dark @click="checkMore">查看更多</v-btn>
				</p>

			</div>
			<div v-if="pagination && total >1">
				<v-pagination color="teal lighten-1" v-model="page" :length="total" prev-icon="mdi-menu-left"
					next-icon="mdi-menu-right">
				</v-pagination>
			</div>
		</div>

		<h3 class="nothing" v-else>本栏目暂无内容,请稍后再来</h3>


	</div>
</template>

<script>
	export default {
		name: "ProgramList",
		props: {
			themeId: 0,
			more: true,
			pagination: false,
			childTheme: 0,
			trigger:0
		},
		data() {
			return {
				datas: [],
				page: 1,
				rows: 6,
				total: 0
			}
		},
		created() {
			this.getProgramList()
		},
		methods: {
			goPurchase(val){
				this.$router.push({
					name:"CoursePurchase",
					params:val
				})
			},
			checkMore() {
				this.$router.push({
					name: "CourseCategory",
					params: {
						themeId: this.themeId
					}
				})
			},
			getProgramList() {
				var currentTheme = this.childTheme == 0 ? this.themeId : this.childTheme
				this.$store.dispatch("getProgramList", {
					themeId: currentTheme,
					page: this.page,
					rows: this.rows
				}).then((res) => {
					if (res.data.state == 200) {
						this.datas = []
						this.datas = res.data.data
						this.total = Math.ceil(parseInt(res.data.count) / this.rows)
						this.$forceUpdate()
					} else {
						this.datas = [] 
						this.$forceUpdate()
					}
				}).catch((res) => {
					this.datas = [] 
					this.$forceUpdate()
				})
			}
		},
		watch: {
			page() {
				this.getProgramList()
			},
			childTheme(val) {
				this.getProgramList()
			},
			trigger(){
				this.childTheme=0
				this.getProgramList()
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
</style>
