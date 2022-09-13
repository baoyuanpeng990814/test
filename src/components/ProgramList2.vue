<template>
	<div >
		<div v-if="datas.length>0">
			<div class="card_list">
				<ul>
					<li v-for="(d,index) in datas" style="width: 100%;">
					
						<div class="i-row i-with100 " @click="goPurchase(d)" >
							
							<div class="index">{{index+1}}</div>
							<v-img alt="暂无图片" height="64px" width="64px" max-height="4rem" max-width="4rem"  :src="d.courseCover"></v-img>
							<div class="i-column marginl-1 i-between">
								<div class="font-303232-1">{{d.courseName}}</div>
								<div class="font-AFB3B3-09 ">学时:{{d.classHours}}
                  <span class="font-AFB3B3-09 " style="color:rgb(36, 191, 211)">积分:1000</span>  
                </div>
								<div class="font-AFB3B3-09">最新报名:{{d.people}}</div>
							</div>
						</div>
						<hr />
					</li>
				</ul>
				<!-- <div class="cb"></div>
				<p v-if="more">
					<v-btn block color="teal" dark @click="checkMore">查看更多</v-btn>
				</p> -->

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
				rows: 10,
				total: 0
			}
		},
		created() {
			this.getAutoCourseSortList()
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
			getAutoCourseSortList() {
				this.$store.dispatch("autoCourseSortList", {
					themeId: this.themeId,
					page: this.page,
					rows: this.rows
				}).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						this.total = Math.ceil(parseInt(res.data.count) / this.rows)
						Console.log("1111111111111",res)
					} else {

					}
				}).catch((res) => {

				})
			}
		},
		watch: {
			page() {
				this.getAutoCourseSortList()
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
	.index{
		height: 1.2rem;
		line-height: 1rem;
		line-height: 1.2rem;
		margin: auto 1rem;
		color: #C2BABA;
		border-bottom: 1px solid #C2BABA;
	}
	.class{
		
	}
	hr {
		background-color: #F2F2F2;
		height: 1px;
		border: none;
		margin: 1rem ;
	}
</style>
