<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item >赛事报道</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="list_card">
			<div slot="header" class="clearfix">
				<!-- 筛选 -->
				<el-row class="search_form">
					<el-form class="demo-ruleForm login_form" label-width="auto">
						<el-col :span="5">
							<el-form-item label="标题">
								<el-input v-model="queryInfo.name" placeholder="标题"></el-input>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row class="buttons">
					<el-col :span="24" :offset="0">
						<el-button icon="el-icon-search" @click="searchNews()" type="primary">查询</el-button>
						<el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

					</el-col>
				</el-row>
			</div>
			<div>
				<el-container>
					<!-- <el-aside class="list_tree" width="120px">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
            </el-tree>
          </el-aside> -->
					<el-main class="list_body">
						<el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column prop="competitionNewId" label="序号" width="120">
							</el-table-column>
             <!-- <el-table-column prop="competitionName" label="竞赛标题" width="120">
              </el-table-column> -->
							<el-table-column prop="releaseState" label="发布状态" width="120">
								<template slot-scope="scope">{{ scope.row.releaseState |transfermState }}</template>
							</el-table-column>
							<el-table-column prop="organizationName" label="组织名" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="userName" label="用户名" width="120">
							</el-table-column>

							<el-table-column fixed="right" label="操作" width="120">
								<template slot-scope="scope">
									<!-- <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button> -->
									<el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:page-size="queryInfo.rows" layout="total, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</el-main>
				</el-container>
			</div>
		</el-card>
		<el-dialog title="" :visible.sync="dialogVisible" width="30%">
			<span>确定要删除新闻：{{supposeDelete.newTitle}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmDelete">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				defaultProps: {
					children: '',
					label: ''
				},
				treedata: [],
				supposeDelete: {
					newsId: ''
				},
				dialogVisible: false,
				queryInfo: {
					page: 1,
					rows: 10
				},
				genders: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				tableData: [],
				multipleSelection: [],
				total: 0
			}
		},
		created() {
			this.getNewsList()
		},
		methods: {

			handleNodeClick(data) {
				this.queryInfo.organizationId = data.organizationId
				// this.currentNode = data.organizationId
				this.getNewsList()
			},
			async getOrganizationTree() {
				const {
					data: res
				} = await this.$http.post('/manager/org/tree')
				if (res.state !== 200) {
					return this.$message.error('数据获取失败！')
				} else {
					this.treedata = res.data
				}
			},
			reset() {
				this.queryInfo.name = ''
				this.queryInfo.username = ''
				this.queryInfo.gender = ''
				this.queryInfo.stutes = ''
				this.queryInfo.mobile = ''
				this.getNewsList()
			},
			searchNews() {
				this.getNewsList()
			},
			async getNewsList() {
				const {
					data: res
				} = await this.$http.post('/manager/cnew/list', this.queryInfo)
				if (res.state !== 200) {
					// return this.$message.error('数据获取失败！')
					this.tableData = []
				} else {
					this.tableData = res.data
					this.total = res.count
				}
			},
			async RemoveNews() {
				const {
					data: res
				} = await this.$http.post('/manager/cnew/del', {
					competitionNewId: this.supposeDelete.competitionNewId
				})
				if (res.state !== 200) {
					return this.$message.error('操作失败！')
				} else {
					this.getNewsList()
					this.supposeDelete = {}
					return this.$message.success('操作成功！')
				}
			},
			confirmDelete() {
				this.dialogVisible = false
				this.RemoveNews()
			},
			findDetail(row) {
				this.$router.push({
					path: '/contestnewsdetail',
					query: {
						row: row
					}
				})
			},
			editDetail(row) {
				this.$router.push({
					path: '/contestnewsedit',
					query: {
						row: row
					}
				})
			},
			deleteNews(row) {
				console.log('du')
				this.supposeDelete = row
				this.dialogVisible = true
			},
			addnews() {
				this.$router.push({
					path: '/contestnewscreate'
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			// 监听rows改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.rows = newSize
				this.getNewsList()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.page = newPage
				this.getNewsList()
			}
		},
		filters: {
			transfermState: function(state) {
				if (state == '0') {
					return '未发布'
				} else {
					return '已发布'
				}
			},
			truncateDate: function(date) {
				if (date != null) {
					return date.split('T')[0]
				}
			}
		}
	}
</script>
<style scoped>
</style>
