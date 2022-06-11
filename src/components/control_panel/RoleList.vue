<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/rolelist' }">角色管理</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">

          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="角色名称">
                <el-input v-model="queryInfo.roleName" placeholder="角色名称"></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="queryInfo.state" placeholder="请选择">
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

            <el-button icon="el-icon-plus" @click="addRole" type="primary">添加</el-button>
          </el-col>



        </el-row>
      </div>
      <div>
        <el-table  height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="roleId" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="stutes" label="状态" width="120">
            <template slot-scope="scope">{{ scope.row.state |transfermState }}</template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteRole(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 8]" :page-size="queryInfo.rows"
        layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>


    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{supposeDelete.roleName}}</span>
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

        supposeDelete: {
          userName: ""
        },
        dialogVisible: false,
        queryInfo: {
          roleName: "",
          state: "",
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
        total:0
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      reset() {
        this.queryInfo.roleName = ""
        this.queryInfo.state = ""
        this.getRoleList()
      },
      searchUser() {
        this.getRoleList()
      },
      async getRoleList() {

        const {
          data: res
        } = await this.$http.post("/manager/role/list", this.queryInfo)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {

          this.tableData = res.data
          this.total = res.count
          console.log(res.data)
        }
      },
      async RemoveRole() {
        const {
          data: res
        } = await this.$http.post("/manager/role/del",{roleId:this.supposeDelete.roleId} )
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getRoleList()
          this.supposeDelete = {}
          return this.$message.success('操作成功！')

        }
      },
      confirmDelete() {
        this.dialogVisible = false
        this.RemoveRole()

      },
      editDetail(row) {
        this.$router.push({
          path: '/roleedit',
          query: {
            row: row
          }
        })
      },
      deleteRole(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addRole() {
        this.$router.push({
          path: '/rolecreate'
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getRoleList()

      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getRoleList()
      }
    },
    filters: {
      transfermState: function(state) {
        if (state == "1") return "启用"
        else if (state==1) return "启用"
        else return "禁用"
      }
    }
  }
</script>

<style scoped>
</style>
