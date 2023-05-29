<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>群组管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->

        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="分组名称">
                <el-input
                  v-model="queryInfo.name"
                  placeholder="分组名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="19" style="text-align: right;">
              <el-button
                icon="el-icon-search"
                @click="searchGroup()"
                type="primary"
                >查询</el-button
              >
              <el-button
                icon="el-icon-refresh-right"
                @click="reset()"
                type="primary"
                >重置</el-button
              >
              <el-button icon="el-icon-plus" @click="addGroup()" type="primary"
                >添加分组</el-button
              >
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-container>
          <!-- 群组树 -->
          <el-aside class="group_tree">
            <el-tree
              :expand-on-click-node="false"
              :default-expand-all="true"
              :data="groupTreeData"
              :props="defaultGroupProps"
              @node-click="handleGroupClick"
              highlight-current
            >
            </el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table
              height=" calc(100vh - 350px) "
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" align="center" label="序号">
              </el-table-column>

              <el-table-column
                prop="groupingName"
                label="分组名称"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="groupingExplain"
                label="班级详情"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="userCount"
                label="分组人数"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createUser"
                label="创建人"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="240"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button> -->
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    class="red"
                    @click="deleteGroup(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                  <el-button
                    @click="addGroupUser(scope.row)"
                    type="text"
                    size="small"
                    >添加成员</el-button
                  >
                  <!-- 查看-->
                  <el-button
                    @click="groupList(scope.row)"
                    type="text"
                    size="small"
                    >查看成员</el-button
                  >
                  <!-- -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="queryInfo.rows"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除分组：{{ supposeDelete.groupingName }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogUserList" width="80%">
      <span>查询userid</span>
      <el-button
        @click="addUserArray()"
        size="medium"
        icon="el-icon-plus"
        style="float:right"
        >批量添加</el-button
      >
      <el-container style="width:100%">
        <!-- 查询树 -->
        <el-aside class="list_tree">
          <el-tree
            :expand-on-click-node="false"
            :default-expand-all="true"
            :data="orgTreedata"
            :props="defaultOrgProps"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-aside>
        <el-main class="list_body">
          <el-table
            height=" calc(100vh - 350px) "
            ref="multipleTable"
            :data="userTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="userId" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="userName" label="账号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip>
              <template slot-scope="scope">{{
                scope.row.sex | transformSex
              }}</template>
            </el-table-column>
            <el-table-column
              prop="organizationName"
              label="所属单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="addUserId(scope.row)"
                  type="text"
                  size="small"
                  >添加</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-size="queryInfo2.rows"
            layout="total, prev, pager, next, jumper"
            :total="userTotal"
            :current-page="+queryInfo.page"
          >
          </el-pagination>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultOrgProps: {
        children: 'chilLOrganization',
        label: 'organizationName'
      },
      defaultGroupProps: {
        children: 'chilGrouping',
        label: 'groupingName'
      },
      dialogUserList: false,
      treedata: [],
      groupTreeDialog: false,
      supposeDelete: {
        groupingId: ''
      },
      dialogVisible: false,
      queryInfo: {
        page: 1,
        rows: 10
      },
      queryInfo2: {
        page: 1,
        rows: 10
      },
      genders: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      groupDetail: {
        groupingId: '',
        userList: ''
      },
      tableData: [], // 表格数据
      orgTreedata: [], // 机构树数据
      groupTreeData: [], // 群组树数据
      multipleSelection: [],
      total: 0,
      userTableData: [],
      userTotal: 0
    }
  },
  created() {
    let currentGroupPage = sessionStorage.getItem('currentGroupPage')
    if (currentGroupPage != null) {
      this.queryInfo.page = Number(currentGroupPage)
    }
    this.getGrouprListFn()
    this.getGroupTreeFn()
    this.getOrganizationTreeFn()
    this.getUserListFn()
  },
  methods: {
    reset() {
      this.queryInfo.name = ''
      this.queryInfo.username = ''
      this.getGrouprListFn()
    },
    searchGroup() {
      this.getGrouprListFn()
    },
    async getGrouprListFn() {
      const { data: res } = await this.$http.post(
        '/manager/grouping/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
      } else {
        this.tableData = res.data
        console.log(this.tableData, '1111')
        this.total = res.count
      }
    },
    /* 查询userid */
    handleNodeClick(data) {
      this.queryInfo2.organizationId = data.organizationId
      this.getUserListFn()
    },
    // 获取机构树
    async getOrganizationTreeFn() {
      const { data: res } = await this.$http.post('/manager/org/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.orgTreedata = res.data
      }
    },
    // 获取群组树
    async getGroupTreeFn() {
      const { data: res } = await this.$http.post('/manager/grouping/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.groupTreeData = res.data
      }
    },
    // 获取用户列表
    async getUserListFn() {
      const { data: res } = await this.$http.post(
        '/manager/user/list',
        this.queryInfo2
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
        this.userTableData = []
      } else {
        this.userTableData = res.data
        this.userTotal = res.count
      }
    },
    /* 取出列表的id 放到增添数据中 date ： 1,21, */
    addUserId(data) {
      this.groupDetail.userList = data.userId
      this.createGroup()
    },
    addUserArray(data) {
      /* 判断是否有数据 */
      if (this.multipleSelection) {
        this.createGroup()
      }
    },
    async createGroup() {
      const { data: res } = await this.$http.post(
        '/manager/grouping/addGroupUser',
        this.groupDetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('添加到分组成功')
      }
    },
    async Removegroup() {
      const { data: res } = await this.$http.post('/manager/grouping/del', {
        groupingId: this.supposeDelete.groupingId
      })
      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getGrouprListFn()
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
        path: '/grouptreeedit',
        query: {
          row: row,
          groupData: this.groupTreeData,
          defaultGroupProps: this.defaultGroupProps
        }
      })
    },
    deleteGroup(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addGroup() {
      this.$router.push({
        path: '/grouptreecreate',
        query: {
          groupData: this.groupTreeData,
          defaultGroupProps: this.defaultGroupProps
        }
      })
    },
    addGroupUser(row) {
      this.dialogUserList = true
      this.groupDetail.groupingId = row.groupingId
    },
    groupTreeList(row) {
      this.$router.push({
        path: '/grouptreelist'
      })
    },
    groupList(row) {
      this.$router.push({
        path: '/grouplist',
        query: {
          row: row
        }
      })
    },
    // 点击群组树方法
    handleGroupClick() {},
    handleSelectionChange(val) {
      this.multipleSelection = val
      for (var i = 0; i < val.length; i++) {
        if (i > 0) {
          this.groupDetail.userList += ',' + val[i].userId
        } else {
          this.groupDetail.userList = val[i].userId
        }
      }
      this.addGroupUser()
    },
    // 监听rows改变的事件
    handleSizeChange(groupize) {
      this.queryInfo.rows = groupize
      this.getGrouprListFn()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      sessionStorage.setItem('currentGroupPage', newPage)
      this.queryInfo.page = newPage
      this.getGrouprListFn()
    },
    // 监听rows改变的事件
    handleSelectionChange2(val) {
      this.multipleSelection = val
    },
    handleSizeChange2(groupize) {
      this.queryInfo2.rows = groupize
      this.getUserListFn()
    },
    // 监听页码值改变的事件
    handleCurrentChange2(newPage) {
      this.queryInfo2.page = newPage
      this.getUserListFn()
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
    },

    transformSex: function(state) {
      if (state === '1') return '男'
      else return '女'
    }
  }
}
</script>
<style scoped></style>
