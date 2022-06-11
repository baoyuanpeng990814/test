<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/messagelist' }">消息管理</el-breadcrumb-item>

		</el-breadcrumb>
		<el-card class="list_card">
			<div slot="header" class="clearfix">
				<!-- 筛选 -->
				<el-row class="search_form">
					<el-form class="demo-ruleForm login_form" label-width="auto">

						<el-col :span="5">
							<el-form-item label="状态">
								<el-input v-model="queryInfo.state" placeholder="状态"></el-input>
							</el-form-item>
						</el-col>


					</el-form>
				</el-row>
				<el-row class="buttons">

					<el-col :span="24" :offset="0">
						<el-button icon="el-icon-search" @click="searchmessage()" type="primary">查询</el-button>

						<el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

						<el-button icon="el-icon-plus" @click="addMessage" type="primary">添加</el-button>
					</el-col>
				</el-row>
			</div>
			<div>
				<el-container>
			
					<el-main class="list_body">
						<el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData"
							tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column prop="messageId" label="序号" width="120">
							</el-table-column>

							<el-table-column prop="messageObject" label="消息对象" show-overflow-tooltip>
								
							</el-table-column>
							<el-table-column prop="messageContent" label="消息内容" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="messageState" label="状态" width="120">
								<template slot-scope="scope">{{ scope.row.messageState | transfermState }}</template>
							</el-table-column>
							<el-table-column prop="messageType" label="消息类型" width="120">
								<template slot-scope="scope">{{ scope.row.messageType | transfermType }}</template>
							</el-table-column>
							<el-table-column prop="createTime" label="发布时间" show-overflow-tooltip>
								<template slot-scope="scope">{{ scope.row.createTime | truncateDate }}</template>

							</el-table-column>

							<el-table-column fixed="right" label="操作" width="180">
								<template slot-scope="scope">
									<el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button>
									<el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="releaseMessage(scope.row)" type="text" size="small">发布</el-button>
									<el-button @click="deleteMessage(scope.row)" type="text" size="small">删除</el-button>
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
			<span>确定要删除消息：{{supposeDelete.messageContent}}</span>
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
					messageId: ""
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
			this.getmessageList()
			this.getOrganizationTree()
		},
		methods: {

			handleNodeClick(data) {
				//this.queryInfo.organizationId = data.organizationId
				//this.currentNode = data.organizationId
				this.getmessageList()
			},
			async getOrganizationTree() {
				const {
					data: res
				} = await this.$http.post("/manager/org/tree")
				if (res.state !== 200) {
					return this.$message.error('数据获取失败！')
				} else {
					this.treedata = res.data
				}
			},
			reset() {
				this.queryInfo.state = ""
				this.getmessageList()
			},
			searchmessage() {
				this.getmessageList()
			},
			async getmessageList() {

				const {
					data: res
				} = await this.$http.post("/manager/message/list", this.queryInfo)
				if (res.state !== 200) {
					//return this.$message.error('数据获取失败！')
					this.tableData = []
				} else {

					this.tableData = res.data
					this.total = res.count

				}
			},
			async RemoveMessage() {
				const {
					data: res
				} = await this.$http.post("/manager/message/del", {
					messageId: this.supposeDelete.messageId
				})
				if (res.state !== 200) {
					return this.$message.error('操作失败！')
				} else {
					this.getmessageList()
					this.supposeDelete = {}
					return this.$message.success('操作成功！')

				}
			},
			async ReleaseMessage(id) {
				const {
					data: res
				} = await this.$http.get("/manager/message/release?id="+id)
				if (res.state !== 200) {
					return this.$message.error('操作失败！')
				} else {
					this.getmessageList()					
					return this.$message.success('操作成功！')
			
				}
			},
			confirmDelete() {
				this.dialogVisible = false
				this.RemoveMessage()

			},
			findDetail(row) {
				console.log(row)
				this.$router.push({
					path: '/messagedetail',
					query: {
						row: row
					}
				})
			},
			editDetail(row) {
				this.$router.push({
					path: '/messageedit',
					query: {
						row: row
					}
				})
			},
			releaseMessage(row){
				//console.log(row.messageId)
				this.ReleaseMessage(row.messageId);
			},
			deleteMessage(row) {
				
				this.supposeDelete = row
				this.dialogVisible = true
			},
			addMessage() {
				this.$router.push({
					path: '/messagecreate'
				})
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 监听rows改变的事件
			handleSizeChange(messageize) {
				this.queryInfo.rows = messageize
				this.getmessageList()

			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				this.queryInfo.page = newPage
				this.getmessageList()
			}
		},
		filters: {
			transfermState: function(state) {
				if (state == "1") {
					return "未发布"

				} else {
					return "已发布"
				}
			},
			transfermType: function(type) {
				switch (type) {
					case "1":
						return "系统通知"
						break;
					case "2":
						return "重要通知"
						break;
					case "3":
						return "考试通知"
						break;
					case "4":
						return "竞赛通知"
						break;
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
