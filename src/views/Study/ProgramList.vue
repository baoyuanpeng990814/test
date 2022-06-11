<template>
	<div >
		<div v-if="datas.length>0">
			<div class="card_list">
				<ul>
					<li v-for="d in datas">
						<v-card>
							<v-img alt="暂无图片" height="100" :src="d.courseCover"></v-img>
							<v-card-title>
								<div>
									{{d.courseName}}
								</div>
							</v-card-title>

							<v-card-subtitle>
								<div>学时:{{d.classHours}}</div>
								<div>学习人数:{{d.people}}</div>
							</v-card-subtitle>

							<v-card-actions>
								<v-btn @click="goPurchase(d)" color="teal lighten-1" text>
									查看详情
								</v-btn>

								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</li>
				</ul>
				<div class="cb"></div>
				<p v-if="more">
					<v-btn block color="teal" dark @click="checkMore">查看更多</v-btn>
				</p>

			</div>
			<div v-if="pagination">
				<v-pagination color="teal lighten-1" v-model="page" :length="total" prev-icon="mdi-menu-left"
					next-icon="mdi-menu-right">
				</v-pagination>
			</div>
		</div>
		<div class="nothing" v-else>本栏目暂无内容,请稍后再来

		</div>


	</div>
</template>

<script>
	export default {
		name: "ProgramList",
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
				this.$store.dispatch("getProgramList", {
					themeId: this.themeId,
					page: this.page,
					rows: this.rows
				}).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total = Math.ceil(parseInt(res.data.count) / this.rows)
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
