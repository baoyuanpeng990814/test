<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherlist' }">讲师管理</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="职称">
                <el-input v-model="queryInfo.teacherTitle" placeholder="职称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="姓名">
                <el-input v-model="queryInfo.teacherName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="queryInfo.stutes" placeholder="请选择">
                  <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">

          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="searchUser" type="primary">查询</el-button>

            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

            <el-button icon="el-icon-plus" @click="addUser" type="primary">添加</el-button>
          </el-col>

        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree"  style="width: fit-content;">
            <el-tree :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
            </el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="teacherId" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="stutes" label="状态" width="60">
                <template slot-scope="scope">{{ scope.row.stutes |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="gonghao" label="工号" width="150">
              </el-table-column>
              <el-table-column prop="teacherName" label="姓名" width="150">
              </el-table-column>
              <el-table-column prop="teacherSex" label="性别" width="60" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.teacherSex |transfermSex }}</template>
              </el-table-column>
              <el-table-column prop="teacherTitle" label="职称" width="150" show-overflow-tooltip>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteTeacher(scope.row)" type="text" size="small">删除</el-button>
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
      <span>确定要删除用户：{{supposeDelete.teacherName}}</span>
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
          children: 'chilLOrganization',
          label: 'organizationName'
        },
        treedata: [],
        supposeDelete: {
          userName: ''
        },
        dialogVisible: false,
        queryInfo: {
          page: 1,
          rows: 10
        },
        states: [{
            value: '1',
            label: '启用'
          },
          {
            value: '0',
            label: '禁用'
          }
        ],
        tableData: [],
        multipleSelection: [],
        total: 0
      }
    },
    created() {
      this.getTeacherList()
      this.getOrganizationTree()
    },
    methods: {
      handleNodeClick(data) {
        this.queryInfo.organizationId = data.organizationId
        // this.currentNode = data.organizationId
        this.getTeacherList()
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
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.rows = temp.rows
        this.queryInfo.page = temp.page
        this.getTeacherList()
      },
      searchUser() {
        this.getTeacherList()
      },
      async getTeacherList() {
        const {
          data: res
        } = await this.$http.post('/manager/teacher/list', this.queryInfo)
        if (res.state !== 200) {
          // return this.$message.error('数据获取失败！')
          this.tableData = []
        } else {
        res.data.forEach(res => {
            res.gonghao = 'QG22' + res.teacherId
          })
          this.tableData = res.data
          this.total = res.count
        }
      },
      async RemoveTeacher() {
        const {
          data: res
        } = await this.$http.post('/manager/teacher/del', {
          teacherId: this.supposeDelete.teacherId
        })
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getTeacherList()
          this.supposeDelete = {}
          return this.$message.success('操作成功！')
        }
      },
      confirmDelete() {
        this.dialogVisible = false
        this.RemoveTeacher()
      },
      editDetail(row) {
        this.$router.push({
          path: '/teacheredit',
          query: {
            row: row
          }
        })
      },
      deleteTeacher(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addUser() {
        this.$router.push({
          path: '/teachercreate'
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getTeacherList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getTeacherList()
      }
    },
    filters: {
      transfermState: function(state) {
        if (state == '1') return '启用'
        else return '禁用'
      },
      transfermSex: function(state) {
        if (state == '1') return '男'
        else return '女'
      }
    }
  }
</script>

<style scoped>
</style>
