<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }"
        >用户管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="3">
              <el-form-item label="账号">
                <el-input
                  v-model="queryInfo.username"
                  placeholder="账号"
                  style="width: 100%"
                  align="center"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="5">
              <el-form-item label="工号">
                <el-input v-model="queryInfo.name" placeholder="工号"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="2">
              <el-form-item label="姓名">
                <el-input
                  v-model="queryInfo.name"
                  placeholder="姓名"
                  style="width: 100%"
                  align="center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="性别">
                <el-select
                  v-model="queryInfo.gender"
                  placeholder="请选择"
                  style="width: 100%"
                  align="center"
                >
                  <el-option
                    v-for="item in genders"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="身份证">
                <el-input
                  v-model="queryInfo.cardId"
                  placeholder="身份证"
                  style="width: 100%"
                  align="center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="手机号">
                <el-input
                  v-model="queryInfo.mobile"
                  placeholder="手机号"
                  style="width: 100%"
                  align="center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="colLeft">
              <el-button
                icon="el-icon-search"
                @click="searchUser"
                type="primary"
                >查询</el-button
              >

              <el-button
                icon="el-icon-refresh-right"
                @click="reset"
                type="primary"
                >重置</el-button
              >

              <el-button icon="el-icon-plus" @click="addUser" type="primary"
                >添加</el-button
              >
              <el-button
                icon="el-icon-search"
                @click="tofindxueji"
                type="primary"
                >查询学籍状态</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-container>
          <!-- 查询树 -->
          <el-aside class="list_tree">
            <el-tree
              :expand-on-click-node="false"
              :default-expand-all="true"
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              ref="treeRef"
              highlight-current
            >
            </el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              height=" calc(100vh - 350px) "
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" label="序号" width="70" align="center">
                <template slot-scope="scope">
                  {{ (queryInfo.page - 1) * queryInfo.rows + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="stutes"
                label="状态"
                width="120"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.stutes | transformState
                }}</template>
              </el-table-column>
              <el-table-column
                prop="gonghao"
                label="工号"
                width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="userName"
                label="账号"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="name"
                label="姓名"
                width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.sex | transfermGender
                }}</template>
              </el-table-column>
              <el-table-column
                prop="cardId"
                label="身份证"
                width="240"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="organizationName"
                label="所属单位"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="180"
                class="rightstyle"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="findDetail(scope.row)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="editxueji(scope.row)"
                    type="text"
                    size="small"
                    >录入学籍</el-button
                  >
                  <el-button
                    @click="findxueji(scope.row)"
                    type="text"
                    size="small"
                    >查看学籍</el-button
                  >
                  <el-button
                    class="red"
                    @click="deleteUser(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="queryInfo.rows"
              layout="total, prev, pager, next, jumper"
              :total="total"
              :current-page="+queryInfo.page"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除用户：{{ supposeDelete.userName }}</span>
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
      loading: true, // 加载
      defaultProps: {
        children: 'chilLOrganization',
        label: 'organizationName'
      },
      currentNodekey: '', // 默认选中的节点id
      treeData: [],
      supposeDelete: {
        userName: ''
      },
      dialogVisible: false,
      queryInfo: {
        page: 1,
        rows: 10,
        organizationId: ''
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
      tableData: [],
      multipleSelection: [],
      total: 0
    }
  },
  created() {
    // 记录路由
    if (this.$route.query.organizationId) {
      this.queryInfo.organizationId = this.$route.query.organizationId
    }
    let currentUserPage = sessionStorage.getItem('currentUserPage')
    if (currentUserPage != null) {
      this.queryInfo.page = Number(currentUserPage)
    }

    this.getUserList()
    this.getOrganizationTree()
  },
  methods: {
    handleNodeClick(data) {
      this.queryInfo.organizationId = data.organizationId
      this.$router.push({
        path: '/userlist',
        query: {
          organizationId: this.queryInfo.organizationId
        }
      })
      this.getUserList()
    },
    async getOrganizationTree() {
      const { data: res } = await this.$http.post('/manager/org/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treeData = res.data
      }
    },
    reset() {
      /* this.queryInfo.name = ""
        this.queryInfo.username = ""
        this.queryInfo.gender = ""
        this.queryInfo.stutes = ""
        this.queryInfo.mobile = "" */
      this.queryInfo = {
        page: 1,
        rows: 10
      }

      this.getUserList()
    },
    searchUser() {
      this.getUserList()
    },
    async getUserList() {
      const { data: res } = await this.$http.post(
        '/manager/user/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
        this.tableData = []
      } else {
        res.data.forEach(res => {
          res.gonghao = 'QG22' + res.userId
        })
        this.tableData = res.data
        this.total = res.count
        this.loading = false
      }
    },
    async RemoveUser() {
      const { data: res } = await this.$http.get(
        '/manager/user/del?id=' + this.supposeDelete.userId
      )
      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getUserList()
        this.supposeDelete = {}
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveUser()
    },
    findDetail(row) {
      this.$router.push({
        path: '/userdetail',
        query: {
          row: row
        }
      })
    },
    findxueji(row) {
      this.$router.push({
        path: '/UserDetailXueji',
        query: {
          row: row
        }
      })
    },
    editDetail(row) {
      this.$router.push({
        path: '/useredit',
        query: {
          row: row
        }
      })
    },
    editxueji(row) {
      this.$router.push({
        path: '/usereditXueji',
        query: {
          row: row
        }
      })
    },
    deleteUser(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addUser() {
      if (this.queryInfo.organizationId) {
        this.$router.push({
          path: '/usercreate',
          query: { organizationId: this.queryInfo.organizationId }
        })
      } else {
        this.$router.push('/usercreate')
      }
    },
    tofindxueji() {
      this.$router.push({
        path: '/XuejiTreeList'
      })
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
      sessionStorage.setItem('currentUserPage', newPage)
      this.queryInfo.page = newPage
      this.getUserList()
    }
  },
  filters: {
    transformState: function(state) {
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

<style scoped>
.list_tree {
  overflow: auto;
  width: auto;
}
.el-col-7 {
  width: 29.16667%;
  text-align: right;
}
::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  color: blue !important;
}
</style>
