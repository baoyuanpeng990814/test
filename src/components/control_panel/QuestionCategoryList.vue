<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questioncategorylist' }">考题分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="分类名称">
                <el-input v-model="queryInfo.questionsSortName" placeholder="分类名称"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">

          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>

            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

            <el-button icon="el-icon-plus" @click="addData" type="primary">添加</el-button>
          </el-col>



        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree" style="width: fit-content;">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="questionsSortId" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="state" label="状态" width="60">
                <template slot-scope="scope">{{ scope.row.state |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="questionsSortName" label="分类名称" width="150">
              </el-table-column>
              <el-table-column prop="description" label="描述" width="150">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteOrganization(scope.row)" type="text" size="small">删除</el-button>
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
      <span>确定要删除：{{supposeDelete.questionsSortName}}</span>
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
        supposeDelete: {},
        dialogVisible: false,
        multipleSelection: [],

        defaultProps: {
          children: 'chilLQuestionsSort',
          label: 'questionsSortName'
        },
        treedata: [],
        queryInfo: {
          page: 1,
          rows: 10
        },
        tableData: [],
        total: 0,
        currentNode: 0
      }
    },
    created() {
      this.getDataTree()
      this.getDataList()
    },
    methods: {
      handleNodeClick(data) {
        this.queryInfo.parentNode = data.questionsSortId
        this.currentNode = data.questionsSortId
        this.getDataList()
        this.getDataTree()
      },
      async getDataTree() {
        const {
          data: res
        } = await this.$http.post("/manager/qsort/tree")
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
        }
      },
      async getDataList() {

        const {
          data: res
        } = await this.$http.post("/manager/qsort/list", this.queryInfo)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.total = res.count
          this.tableData = res.data
        }
      },
      reset() {
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.rows = temp.rows
        this.queryInfo.page = temp.page
        this.getDataList()
      },
      async RemoveData() {
        const {
          data: res
        } = await this.$http.post("/manager/qsort/del", {
          questionsSortId: this.supposeDelete.questionsSortId
        })

        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getDataList()
          this.supposeDelete = {}
          return this.$message.success('操作成功！')

        }
      },
      confirmDelete() {
        this.dialogVisible = false
        this.RemoveData()

      },
      editDetail(row) {
        this.$router.push({
          path: '/questioncategoryedit',
          query: {
            row: row
          }
        })
      },
      deleteOrganization(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addData() {
        this.$router.push({
          path: '/questioncategorycreate',
          query: {
            parent: this.currentNode,

          }
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getDataList()

      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getDataList()
      }
    },
    filters: {
      truncateDate: function(date) {
        if (date != null) {
          return date.split('T')[0]
        }
      },
      transfermState: function(state) {
        if (state == "1") return "启用"
        else return "禁用"
      }
    }
  }
</script>

<style scoped>

</style>
