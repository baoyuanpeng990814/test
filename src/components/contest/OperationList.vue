<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/contestlist' }">实操列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
          <el-col :span="11">
            <el-button icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>

          </el-col>
        </el-row>
        <div class="space"></div>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">

          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <el-main class="list_body">

            <el-table height=" calc(100vh - 400px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="competitionId" label="序号">
              </el-table-column>
              <el-table-column prop="competitionName" label="竞赛名称">
              </el-table-column>
              <!-- <el-table-column prop="competitionSort" label="竞赛分类">
              </el-table-column> -->

              <el-table-column prop="releaseState" label="发布状态">
                <template slot-scope="scope">{{ scope.row.releaseState |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="competitionType" label="竞赛类型">
                <template slot-scope="scope">{{ scope.row.competitionType |transfermType }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
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
      <span>确定要删除：{{supposeDelete.competitionName}}</span>
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
        delNode: false,
        supposeDelete: {},
        dialogVisible: false,
        multipleSelection: [],

        treedata: [],
        queryInfo: {
          page: 1,
          rows: 10,
          competitionId : undefined
        },
        tableData: [],
        total: 0,
        currentNode: {
          competitionSortId: 0
        }
      }
    },
    created() {
      this.queryInfo.competitionId = this.$route.query.id
      console.log(this.queryInfo)
      this.getDataList()
    },
    methods: {

      async getDataList() {
        const {
          data: res
        } = await this.$http.post("/manager/competition/operationList", this.queryInfo)
        if (res.state !== 200) {
          this.total = 0
          this.tableData = []
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
        } = await this.$http.post("/manager/competition/eqdelComment", {
          competitionId: this.supposeDelete.commentId
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

      deleteRow(row) {
        this.supposeDelete = row
        this.dialogVisible = true
        console.log(this.supposeDelete)
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
        if (state == "1") return "已发布"
        else return "未发布"
      },
      transfermType: function(val) {
        if (val == "1") return "理论"
        if (val == "2") return "实操"
        if (val == "3") return "理论+实操"
      }
    }
  }
</script>

<style scoped>

</style>
