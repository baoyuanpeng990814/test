<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/GroupList' }">分组管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="list_card">
			<div slot="header" class="clearfix">
				<!-- 筛选 -->
				<el-row class="search_form">
					<el-form class="demo-ruleForm login_form" label-width="auto">
						<el-col :span="5">
							<el-form-item label="用户姓名">
								<el-input v-model="queryInfo.name" placeholder="分组名称"></el-input>
							</el-form-item>
						</el-col>
            <el-col :span="5">
            	<el-form-item label="用户名">
            		<el-input v-model="queryInfo.userName" placeholder="用户名"></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="3">
            	<!-- <el-button icon="el-icon-plus" @click="addGroup()" type="primary">添加分组人员</el-button> -->
            </el-col>
            <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
					</el-form>
				</el-row>
				<el-row class="buttons">
					<el-col :span="24" :offset="0">
						<el-button icon="el-icon-search" @click="searchGroup()" type="primary">查询</el-button>
						<el-button icon="el-icon-refresh-right" @click="reset()" type="primary">重置</el-button>

            <el-button icon="el-icon-plus" @click="groupTreeList()" type="primary">分组列表</el-button>
					</el-col>
				</el-row>
			</div>
			<div>
				<el-container>
				<!-- 	<el-aside class="list_tree" width="120px">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
            </el-tree>
          </el-aside> -->
					<el-main class="list_body">
						<el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column prop="groupingUserId" label="分组序号" width="120">
							</el-table-column>
              <el-table-column prop="groupingId" label="所属分组" width="120">
							</el-table-column>
              <el-table-column prop="gonghao" label="工号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="userName" label="用户名" show-overflow-tooltip>
							</el-table-column>

							<el-table-column prop="name" label="用户姓名" show-overflow-tooltip>
							</el-table-column>
              <el-table-column prop="organizationName" label="机构名称" show-overflow-tooltip>
              </el-table-column>

							<el-table-column fixed="right" label="操作" width="120">
								<template slot-scope="scope">
									<!-- <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button> -->

									<el-button @click="deleteGroup(scope.row)" type="text" size="small">删除</el-button>
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
			<span>确定要删除分组：{{supposeDelete.userName}}</span>
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
					label: 'groupingName'
				},

				treedata: [],
        groupTreeDialog: false,
				supposeDelete: {
					groupingId: ''
				},
				dialogVisible: false,
				queryInfo: {
					page: 1,
					rows: 10,
          id: undefined
				},
        queryTreeInfo: {
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
      this.queryInfo.id = this.$route.query.row.groupingId
      console.log(this.$route.query.row)
			this.getGroupUserList()
			this.getGroupTree()
		},
		methods: {

			handleNodeClick(data) {
				// this.queryInfo.name = data.groupingName

				this.getGroupUserList()
			},
			async getGroupTree() {
				const {
					data: res
				} = await this.$http.post('/manager/grouping/list', this.queryTreeInfo)
				if (res.state !== 200) {
					return this.$message.error('数据获取失败！')
				} else {
					this.treedata = res.data
				}
			},
			reset() {
				this.queryInfo.name = ''
				this.queryInfo.userName = ''
				this.getGroupUserList()
			},
			searchGroup() {
				this.getGroupUserList()
			},
			async getGroupUserList() {
				const {
					data: res
				} = await this.$http.post('/manager/grouping/listGroupUser', this.queryInfo)
				if (res.state !== 200) {
					// return this.$message.error('数据获取失败！')
					this.tableData = []
				} else {
          res.data.forEach(res => {
            res.gonghao = 'QG22' + res.userId
          })
					this.tableData = res.data
					this.total = res.count
				}
			},
			async Removegroup() {
				const {
					data: res
				} = await this.$http.post('/manager/grouping/delGroupUser', {
					groupingUserId: this.supposeDelete.groupingUserId
				})
				if (res.state !== 200) {
					return this.$message.error('操作失败！')
				} else {
					this.getGroupUserList()
					this.supposeDelete = {}
					return this.$message.success('操作成功！')
				}
			},
			confirmDelete() {
				this.dialogVisible = false
				this.Removegroup()
			},
			findDetail(row) {
				this.$router.push({
					path: '/groupdetail',
					query: {
						row: row
					}
				})
			},
			editDetail(row) {
				this.$router.push({
					path: '/groupedit',
					query: {
						row: row
					}
				})
			},
			deleteGroup(row) {
				this.supposeDelete = row
				this.dialogVisible = true
			},
			addGroup() {
				this.$router.push({
					path: '/groupcreate'
				})
			},
      groupTreeList(row) {
      	this.$router.push({
      		path: '/grouptreelist'

      	})
      },
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			// 监听rows改变的事件
			handleSizeChange(groupize) {
				this.queryInfo.rows = groupize
				this.getGroupUserList()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.page = newPage
				this.getGroupUserList()
			}
		},
		filters: {
			transformState: function(state) {
				if (state === '0') {
					return '未发布'
				} else {
					return '已发布'
				}
			},
			transformDate: function(date) {
				if (date !== null) {
					return date.split('T')[0]
				}
			}
		}
	}
</script>
<style scoped>
</style>
