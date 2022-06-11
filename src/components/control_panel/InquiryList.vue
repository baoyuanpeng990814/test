<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questionlist' }">考题管理</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="难度">
                <el-select v-model="queryInfo.questionsDifficulty" placeholder="请选择">
                  <el-option label="容易" value="1"></el-option>
                  <el-option label="较易" value="2"></el-option>
                  <el-option label="一般" value="3"></el-option>
                  <el-option label="较难" value="3"></el-option>
                  <el-option label="非常难" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="知识点">
                <el-input v-model="queryInfo.knowledge" placeholder="知识点"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="题型">
                <el-input v-model="typeName" placeholder="题型" @focus="showQp=true" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">

          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="searchData" type="primary">查询</el-button>

            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

            <el-button icon="el-icon-plus" @click="addData" type="primary">添加</el-button>

            <el-button icon="el-icon-plus" @click="uploadQuestions" type="primary">导入试题</el-button>
          </el-col>



        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree" width="120px">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-main class="list_body">

            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="questionsId" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="knowledge" label="知识点" width="120">
              </el-table-column>
              <el-table-column prop="questionsDifficulty" label="难度" width="100">
                <template slot-scope="scope">{{ scope.row.questionsDifficulty | transfermDifficulty }}</template>
              </el-table-column>
              <el-table-column prop="questionsContent" label="试题内容" width="200">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>


      </div>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 8]"
        :page-size="queryInfo.rows" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>


    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>

    <QuestionPanel :show="showQp" @choose="choose" @turnOff="(e) => showQp = e"></QuestionPanel>
  </div>
</template>

<script>
  import QuestionPanel from '../panel/QuestionTypePanel.vue'
  export default {
    components: {
      QuestionPanel
    },
    data() {
      return {
        showQp: false,
        typeName: "",
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
        total: 0,
        defaultProps: {
          children: 'chilLQuestionsSort',
          label: 'questionsSortName'
        },
        treedata: [],
        currentNode: 1
      }
    },
    created() {
      this.getTableData()
      this.getDataTree()

    },
    methods: {
      uploadQuestions() {
        this.$router.push({
          path: '/uploadquestion',
          query: {
            parent: this.currentNode
          }
        })
      },
      handleNodeClick(data) {
        //this.queryInfo.parentNode = data.questionsSortId
        this.currentNode = data.questionsSortId
        //this.getTableData()
        //this.getDataTree()
      },
      choose(val) {
        this.typeName = val.questionsTypeName
        this.queryInfo.questionsType = val.questionsTypeId
      },
      reset() {
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.rows = temp.rows
        this.queryInfo.page = temp.page
        this.getTableData()
      },
      searchData() {
        this.getTableData()
      },
      async getTableData() {

        const {
          data: res
        } = await this.$http.post("/manager/questions/list", this.queryInfo)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
          this.tableData = []
        } else {

          this.tableData = res.data
          this.total = res.count
        }
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
      async RemoveData() {
        const {
          data: res
        } = await this.$http.post("/manager/questions/del", {
          questionsId: this.supposeDelete.questionsId
        })
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getTableData()
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
          path: '/questionedit',
          query: {
            row: row
          }
        })
      },
      deleteData(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addData() {
        this.$router.push({
          path: '/questioncreate',
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
        this.getTableData()

      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getTableData()
      }
    },
    filters: {
      transfermState: function(state) {
        if (state == "1") return "启用"
        else if (state == 1) return "启用"
        else return "禁用"
      },
      transfermDifficulty: function(diff) {
        if (diff == "1") return "容易"
        else if (diff == "2") return "较易"
        else if (diff == "3") return "一般"
        else if (diff == "4") return "较难"
        else if (diff == "5") return "非常难"
      }
    }
  }
</script>

<style scoped>
</style>
