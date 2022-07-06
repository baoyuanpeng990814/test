<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/themelist' }">学习主题</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="主题名称">
                <el-input v-model="queryInfo.themeName" placeholder="主题名称"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="getThemeList" type="primary">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
            <el-button icon="el-icon-plus" @click="addTheme" type="primary">添加</el-button>
          </el-col>

        </el-row>
      </div>

      <div>
        <el-container>
          <el-aside class="list_tree" width="120px">
            <el-tree :default-expand-all="true" all="true" :data="treedata" :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="themeId" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="themeState" label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.themeState |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="themeName" label="名称" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteTheme(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]" :page-size="queryInfo.rows" layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </el-main>
        </el-container>

      </div>

    </el-card>

    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{supposeDelete.themeName}}</span>
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
          label: 'themeName'
        },
        currentNode: '',
        treedata: [],
        supposeDelete: {},
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
      this.getThemeList()
      this.getThemeTree()
    },
    methods: {
      handleNodeClick(data) {
        this.queryInfo.themeId = data.themeId
        this.currentNode = data.themeId
        this.getThemeList()
      },
      reset() {
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.rows = temp.rows
        this.queryInfo.page = temp.page
        this.getThemeList()
      },
      async getThemeList() {
        const {
          data: res
        } = await this.$http.post('/manager/theme/list', this.queryInfo)
        if (res.state !== 200) {
          this.tableData = []
          // return this.$message.error('数据获取失败！')
        } else {
          this.tableData = res.data
          this.total = res.count
        }
      },
      async getThemeTree() {
        const {
          data: res
        } = await this.$http.post('/manager/theme/list', {
          parentNode: '0',
          page: '1',
          rows: '99'
        })
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
        }
      },
      async RemoveRole() {
        const {
          data: res
        } = await this.$http.post('/manager/theme/del', {
          themeId: this.supposeDelete.themeId
        })
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getThemeList()
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
          path: '/themeedit',
          query: {
            row: row
          }
        })
      },
      deleteTheme(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addTheme() {
        this.$router.push({
          path: '/themecreate',
          query: {
            parent: this.currentNode
          }
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getThemeList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getThemeList()
      }
    },
    filters: {
      transfermState: function(state) {
        if (state == '1') return '启用'
        else if (state == 1) return '启用'
        else return '禁用'
      }
    }
  }
</script>

<style scoped>

</style>
