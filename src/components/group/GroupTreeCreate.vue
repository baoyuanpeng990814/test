<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/carousellist' }">分组管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/carouselcreate' }">创建分组</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">创建分组树</el-col>
						<el-col :span="4">
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="edit_lines">
					<el-container>
						<el-main>
							<el-form :model="carouseldetail" :rules="rules" ref="carouseldetail" label-width="100px"
								class="demo-ruleForm login_form">
								<el-row>
									<el-col :span="24">
										<el-form-item label="标题" prop="groupingName">
											<el-input v-model="carouseldetail.groupingName"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="内容" prop="groupingExplain">
										<el-input v-model="carouseldetail.groupingExplain"></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="20" :offset="4">
										<el-button type="primary" @click="modifyDetail()">新增</el-button>
									</el-col>
								</el-row>
							</el-form>
						</el-main>
					</el-container>
				</div>
			</el-card>
		</div>

   
	</div>
</template>
<script>
	export default {
		data() {
			return {

				carouseldetail: {
					groupingExplain: "",
					groupingName: "",

				},
        
				rules: {
					groupingName: [{
						required: true,
						message: '分组名不能为空',
						trigger: 'blur'
					}],

				}
			}
		},
		created() {},
		methods: {
			modifyDetail() {
				this.createcarousel()
			},
			async createcarousel() {
				const {
					data: res
				} = await this.$http.post("/manager/grouping/add", this.carouseldetail)
				if (res.state !== 200) {
					return this.$message.error(res.msg)
				} else {
					this.$message.success('添加成功')
					this.$router.go(-1)
				}
			}
		},
		filters: {
			truncateDate: function(date) {
				return date.split('T')[0]
			}
		}
	}
</script>

<style>
</style>
