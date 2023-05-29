<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/contestlist' }"
        >竞赛考题管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="考次名称">
                <el-input
                  v-model="queryInfo.contestName"
                  placeholder="考次名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发布状态">
                <el-select
                  v-model="queryInfo.releaseState"
                  placeholder="请选择"
                >
                  <el-option label="未发布" value="0"></el-option>
                  <el-option label="已发布" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col :span="14" style="text-align: right;">
            <el-button icon="el-icon-search" @click="getDataList" type="primary"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="reset"
              type="primary"
              >重置</el-button
            >
            <el-button icon="el-icon-plus" @click="addData" type="primary"
              >添加竞赛考次</el-button
            >
            <el-button icon="el-icon-plus" @click="publish" type="primary"
              >发布竞赛考次</el-button
            >
            <el-button icon="el-icon-plus" @click="publish" type="primary"
              >发布考次</el-button
            >
          </el-col>
        </el-row>
        <div class="space"></div>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree">
            <el-tree
              :default-expand-all="true"
              :data="treedata"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :expand-on-click-node="false"
            >
            </el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table
              height=" calc(100vh - 400px) "
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="competitionId" label="序号" align="center">
              </el-table-column>
              <el-table-column
                prop="competitionName"
                label="竞赛名称"
                align="center"
              >
              </el-table-column>
              <!-- <el-table-column prop="competitionSort" label="竞赛分类">
              </el-table-column> -->
              <el-table-column
                prop="releaseTime"
                label="发布时间"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.releaseTime | transformDate
                }}</template>
              </el-table-column>
              <el-table-column
                prop="releaseState"
                label="发布状态"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.releaseState | transformState
                }}</template>
              </el-table-column>
              <el-table-column
                prop="competitionType"
                label="竞赛类型"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.competitionType | transformType
                }}</template>
              </el-table-column>
              <el-table-column
                prop="competitionState"
                label="竞赛阶段状态"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.competitionState | transfermContestState
                }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    class="red"
                    @click="deleteRow(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                  <el-button
                    @click="showRank(scope.row.competitionId)"
                    type="text"
                    size="small"
                    >查看排行</el-button
                  >
                  <el-button
                    @click="addNews(scope.row.competitionId)"
                    type="text"
                    size="small"
                    >添加新闻</el-button
                  >
                  <el-button
                    @click="showOperation(scope.row.competitionId)"
                    type="text"
                    size="small"
                    v-show="scope.row.competitionType != 1"
                    >查看实操</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]"
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
      <span>确定要删除：{{ supposeDelete.competitionName }}</span>
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

      defaultProps: {
        children: 'competitionSortId',
        label: 'competitionSortName'
      },
      treedata: [],
      queryInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      total: 0,
      currentNode: {
        competitionSortId: 0
      }
    }
  },
  created() {
    this.getDataTree()
    this.getDataList()
  },
  methods: {
    /*生成考试习题*/
    publish() {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        //if (this.multipleSelection[i].releaseState == "0") {
        this.releasecontest(this.multipleSelection[i])
        //}
      }
    },
    async releasecontest(e) {
      const { data: res } = await this.$http.get(
        '/manager/competition/release?id=' + e.competitionId + '&release=1'
      )
      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.$message.success('发布竞赛成功')
        this.getDataList()
      }
    },
    async confirmDeleteNode() {
      const { data: res } = await this.$http.post('/manager/esort/del', {
        competitionSortId: this.currentNode.competitionSortId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.currentNode = {
          competitionSortId: 0
        }
        this.queryInfo.parentId = null
        this.getDataList()
        this.getDataTree()
        this.delNode = true
        return this.$message.success('操作成功！')
      }
    },
    editNode() {
      this.$router.push({
        path: '/contesttypeedit',
        query: {
          row: this.currentNode
        }
      })
    },
    addNode() {
      this.$router.push({
        path: '/contesttypecreate'
      })
    },
    showOperation(id) {
      this.$router.push({
        path: '/operationlist',
        query: {
          id: id
        }
      })
    },
    showRank(id) {
      this.$router.push({
        path: '/ranklist',
        query: {
          id: id
        }
      })
    },
    addNews(id) {
      this.$router.push({
        path: '/contestnewscreate',
        query: {
          id: id
        }
      })
    },
    handleNodeClick(data) {
      this.queryInfo.competitionSort = data.competitionSortId

      this.getDataList()
    },
    async getDataTree() {
      const { data: res } = await this.$http.post(
        '/manager/competitionSort/tree'
      )
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treedata = res.data
      }
    },
    async getDataList() {
      const { data: res } = await this.$http.post(
        '/manager/competition/list',
        this.queryInfo
      )
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
      const { data: res } = await this.$http.post('/manager/competition/del', {
        competitionId: this.supposeDelete.competitionId
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
        path: '/contestedit',
        query: {
          row: row
        }
      })
    },
    deleteRow(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addData() {
      this.$router.push({
        path: '/contestcreate',
        query: {
          parent: this.currentNode.competitionSortId
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
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
    transformDate: function(date) {
      if (date != null) {
        return date.split('T')[0]
      }
    },
    transformState: function(state) {
      if (state == '1') return '已发布'
      else return '未发布'
    },
    transformType: function(val) {
      if (val == '1') return '理论'
      if (val == '2') return '实操'
      if (val == '3') return '理论+实操'
    },
    transfermContestState: function(val) {
      if (val == '1') return '答题阶段'
      if (val == '2') return '实操阶段'
      if (val == '3') return '专家评分阶段'
      if (val == '4') return '结束'
    }
  }
}
</script>

<style scoped></style>
