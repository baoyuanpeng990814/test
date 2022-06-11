<template>
	<div id="app">
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/grouplist' }">分组管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/groupcreate' }">创建分组人员</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="card_detail">
			<el-card>
				<div slot="header" class="clearfix">
					<el-row>
						<el-col :span="20">创建分组人员</el-col>

						<el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="dialogUserList= true">用户列表</el-button>
							<el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>

						</el-col>
					</el-row>
				</div>
				<div class="edit_lines">
					<el-container>
						<el-main>
							<el-form :model="groupDetail" :rules="rules" ref="groupDetail" label-width="100px"
								class="demo-ruleForm login_form">

                    <el-form-item label="分组名字" prop="groupingId">
                    	<el-input v-model="twin.groupingName" @focus="showOd=true"></el-input>
                    </el-form-item>


								</el-row>

                <el-row>
                  <el-col :span="24">
                  	<el-form-item label="分组序号用逗号隔开" prop="userList">
                  		<el-input v-model="groupDetail.userList"></el-input>
                  	</el-form-item>
                  </el-col>
                </el-row>
								<el-row>
									<el-col :span="20" :offset="4">
										<el-button type="primary" @click="modifyDetail()">添加</el-button>
									</el-col>
								</el-row>
							</el-form>
						</el-main>
					</el-container>
				</div>
			</el-card>
      <!-- 分组筛选列表-->
      <GroupPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></GroupPanel>
      <!-- 查询userId-->
      <el-dialog title="" :visible.sync="dialogUserList" width="80%">
      	<span>查询userid</span>
        <el-container>
          <!-- 查询树 -->
          <el-aside class="list_tree" style="width: fit-content;">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps"
              @node-click="handleNodeClick">
            </el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="userId" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="stutes" label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.stutes | transfermState }}</template>
              </el-table-column>
              <el-table-column prop="userName" label="账号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="sex" label="性别" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.sex |  transfermGender}}</template>
              </el-table-column>
              <el-table-column prop="organizationName" label="所属单位" show-overflow-tooltip>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="addUserId(scope.row)" type="text" size="small">添加</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-size="queryInfo.rows" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-main>
        </el-container>

      </el-dialog>

		</div>
	</div>
</template>
<script>
import GroupPanel from '../panel/GroupPanel.vue'
	export default {
    components: {
    	GroupPanel
    },
		data() {
			return {
				showOd: false,
        dialogVisible : false,
        defaultProps: {
          children: 'chilLOrganization',
          label: 'organizationName'
        },
        treedata: [],
        dialogVisible: false,
        queryInfo: {
        	page: 1,
        	rows: 10
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
        total: 0,
				twin: {
					groupingName: ""
				},
				groupDetail: {
					groupingId: "",
					userList: "",

				},
        dialogUserList : false,
				rules: {
					groupingId: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					}],
          userList: [{
          	required: true,
          	message: '分组不能为空',
          	trigger: 'blur'
          }],

				}
			}
		},
		created() {
      this.getUserList()
      this.getOrganizationTree()
    },
		methods: {
			modifyDetail() {
				this.createGroup()

			},
      getOd(val) {
      	this.groupDetail.groupingId = val.groupingId.toString()
      	this.twin.groupingName = val.groupingName
      },
      handleNodeClick(data) {
        this.queryInfo.organizationId = data.organizationId
        //this.currentNode = data.organizationId
        this.getUserList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getUserList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getUserList()
      },
			async createGroup() {
				const {
					data: res
				} = await this.$http.post("/manager/grouping/addGroupUser", this.groupDetail)
				if (res.state !== 200) {
					return this.$message.error(res.msg)
				} else {
					this.$message.success('添加成功')
					this.$router.go(-1)
				}
			},
      /* 查询userid*/
      handleNodeClick(data) {
        this.queryInfo.organizationId = data.organizationId
        //this.currentNode = data.organizationId
        this.getUserList()
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
      async getUserList() {
        const {
          data: res
        } = await this.$http.post('/manager/user/list', this.queryInfo)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
          this.tableData = []
        } else {
          this.tableData = res.data
          this.total = res.count
        }
      },
      /* 取出列表的id 放到增添数据中 date ： 1,21,*/
      addUserId(data){

        console.log(data.userId)
        console.log(this.groupDetail)
        if(this.groupDetail.userList!=""){
          this.groupDetail.userList += ","+data.userId
        }else{
           this.groupDetail.userList = data.userId
        }
        this.$message.success('添加成功')
      }
		},
		filters: {
			truncateDate: function(date) {
				return date.split('T')[0]
			},
      transfermState: function(state) {
        if (state === '1') return '启用'
        else return '禁用'
      },
      transfermGender: function(state) {
        if (state === '1') return '男'
        else return '女'
      }
		}
	}
</script>

<style>
</style>
