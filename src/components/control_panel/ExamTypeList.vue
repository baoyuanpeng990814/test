<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examlist' }">考题分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <!-- <el-col :span="5">
              <el-form-item label="考次名称">
                <el-input v-model="queryInfo.examName" placeholder="考次名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发布状态">
                <el-select v-model="queryInfo.releaseState" placeholder="请选择">
                  <el-option label="未发布" value="0"></el-option>
                  <el-option label="已发布" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-form>
          <el-col :span="11">
            <!-- <el-button icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button> -->

          </el-col>
        </el-row>
        <div class="space"></div>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-plus" @click="addNode" type="primary">添加子分类</el-button>
            <!-- <el-button icon="el-icon-edit-outline" @click="editNode" type="primary">修改分类</el-button>
            <el-button icon="el-icon-delete" @click="delNode = true" type="primary">删除分类</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <!-- 查询树 类别： 母婴护理 职业道德 法律知识 服务礼仪等-->
          <el-aside class="list_tree" style="width: fit-content;">
            <el-tree :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick"
              :expand-on-click-node="false">
            </el-tree>
          </el-aside>
          <el-main class="list_body">

            <el-table height=" calc(100vh - 400px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <!-- <el-table-column prop="examId" label="序号">
              </el-table-column> -->
              <el-table-column prop="examSortName" label="分类名称">
              </el-table-column>
              <el-table-column prop="organizationName" label="所属机构">
              </el-table-column>
              <el-table-column prop="totalPoints" label="描述">
              </el-table-column>
              <el-table-column prop="state" label="状态">

                <template slot-scope="scope">{{ scope.row. state | transfermUseState }}</template>
              </el-table-column>


              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteType(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog title="" :visible.sync="delNode" width="30%">
      <span>确定要删：{{currentNode.examSortName}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delNode = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteNode">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{supposeDelete.examName}}</span>
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
          children: 'chilLExamSort',
          label: 'examSortName'
        },
        treedata: [],
        queryInfo: {
          page: 1,
          rows: 10
        },
        tableData: [],
        total: 0,
        currentNode: {
          examSortId: 0
        }
      }
    },
    created() {
      this.getDataTree()
      this.getDataList()
    },
    methods: {
      /* 生成考试习题*/
      publish() {
        console.log(this.multipleSelection)
        for (var i = 0; i < this.multipleSelection.length; i++) {
          //if (this.multipleSelection[i].releaseState == "0") {
          this.releaseExam(this.multipleSelection[i])
          //}
        }
        //this.releaseExam(this.multipleSelection[0])
      },

      async confirmDeleteNode() {
        const {
          data: res
        } = await this.$http.post("/manager/esort/del", {
          examSortId: this.currentNode.examSortId
        })

        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {

          this.currentNode = {
            examSortId: 0
          }
          this.queryInfo.parentId = null
          this.getDataList()
          this.getDataTree()
          this.delNode = true
          return this.$message.success('操作成功！')
        }
      },
      editNode() {
        console.log(this.currentNode)
        this.$router.push({
          path: '/examtypeedit',
          query: {
            row: this.currentNode
          }
        })
      },
      addNode() {
        this.$router.push({
          path: '/examtypecreate',
          query: {
            parent: this.currentNode.examSortId
          }
        })
      },
      handleNodeClick(data) {
        this.queryInfo.examSortName = data.examSortName
        this.currentNode = data.examSortId

        // if (data.parentNode == 0) this.queryInfo.examSortId = null
        this.getDataList()
      },
      async getDataTree() {
        const {
          data: res
        } = await this.$http.get("/manager/esort/tree?id=" + 0)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
          console.log(this.treedata);
        }
      },
      async getDataList() {
        const {
          data: res
        } = await this.$http.post("/manager/esort/list", this.queryInfo)
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
        } = await this.$http.post("/manager/esort/del", {
          examSortId: this.supposeDelete.examSortId
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
          path: '/examtypeedit',
          query: {
            row: row
          }
        })
      },
      deleteType(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addData() {
        this.$router.push({
          path: '/examtypecreate',
          query: {
            parent: this.currentNode.examSortId,
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
      transfermUseState: function(state) {
        if (state == "1") return "启用"
        else return "未启用"
      },

    }
  }
</script>

<style scoped>

</style>
