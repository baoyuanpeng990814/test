<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/paperlist' }"
        >课程管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <el-row class="buttons">
          
          <el-switch
            v-model="timeUse"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="只看有效课程"
            inactive-text="全部课程"
          >
          </el-switch>
          课程类型：
          <el-select
            v-model="queryInfo.courseType"
            placeholder="请选择类型"
            style="width:120px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          课程阶段：
          <el-select
            v-model="queryInfo.recommendStutes"
            placeholder="请选择当前阶段"
            style="width:120px"
          >
            <el-option
              v-for="item2 in options2"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value"
            >
            </el-option>
          </el-select>
          发布状态：
          <el-select
            v-model="queryInfo.releaseStutes"
            placeholder="请选择发布状态"
            style="width:120px"
          >
            <el-option
              v-for="item3 in options3"
              :key="item3.value"
              :label="item3.label"
              :value="item3.value"
            >
            </el-option>
          </el-select>
         
        </el-row>
        <el-row>
          <el-col :span="2" :offset="0">
            <el-button icon="el-icon-plus" @click="addPaper" type="primary"
              >添加</el-button
            >
          </el-col>
          <el-col :span="2" :offset="0">
            <el-button @click="reset()" type="primary">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree" width="120px">
            <el-tree
              :default-expand-all="true"
              :data="treedata"
              :props="defaultProps"
              @node-click="handleNodeClick"
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
              <el-table-column prop="courseId" label="序号" width="50">
              </el-table-column>
              <el-table-column prop="courseName" label="课程名称" show-overflow-tooltip width="260">
              </el-table-column>
              <el-table-column prop="classHours" label="学时" width="80">
              </el-table-column>
              <el-table-column prop="courseType" label="课程类别" width="100">
                <template slot-scope="scope">{{
                  scope.row.courseType | transfermCompulsory
                }}</template>
              </el-table-column>
              <el-table-column prop="teacherName" label="主讲人" width="120">
              </el-table-column>
              <el-table-column
                prop="courseFailTime"
                label="失效时间"
                width="100"
              >
                <template slot-scope="scope">{{
                  scope.row.courseFailTime | truncateDate
                }}</template>
              </el-table-column>
              <el-table-column
                prop="releaseStutes"
                label="发布状态"
                width="80"
              >
                <template slot-scope="scope">{{
                  scope.row.releaseStutes | transfermState
                }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="deletePaper(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                  <el-button
                    @click="addHistory(scope.row)"
                    type="text"
                    size="small"
                    >归档</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]"
              :page-size="queryInfo.rows"
              layout="total,  prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{ supposeDelete.courseName }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="historyShow" width="30%">
      <span>确定要归档：{{ supposeDelete.courseName }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="historyShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supposeDelete: {
        userName: ''
      },
      diahistory: false,
      dialogVisible: false,
      multipleSelection: [],
      listUrl: '',
      defaultProps: {
        children: 'chilLCourseSort',
        label: 'courseSortName'
      },
      treedata: [],
      queryInfo: {
        // parentNode: 0,
        page: 1,
        rows: 10
      },
      options: [
        {
          value: undefined,
          label: '全部'
        },
        {
          value: '1',
          label: '自主选课'
        },
        {
          value: '2',
          label: '专题培训'
        }
      ],
      options2: [
        {
          value: undefined,
          label: '全部'
        },
        {
          value: '1',
          label: '报名阶段'
        },
        {
          value: '2',
          label: '学习阶段'
        }
      ],
      options3: [
        {
          value: undefined,
          label: '全部'
        },
        {
          value: '0',
          label: '未发布'
        },
        {
          value: '1',
          label: '已发布'
        }
      ],
      courseType: '',

      timeUse: false, // 判断是全部列表还是失效列表
      tableData: [],
      total: 0,
      currentNode: 0,
     tohistory: {},
     historyShow: false
    }
  },
  created() {
    this.getProgramTree()
    this.getPaperList()
  },
  methods: {
    handleNodeClick(data) {
      this.queryInfo.courseSortId = data.courseSortId
      this.currentNode = data.courseSortId
      this.getPaperList()
      this.getProgramTree()
    },
    async getProgramTree() {
      const { data: res } = await this.$http.post('/manager/csort/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treedata = res.data
      }
    },
    async getPaperList() {
      /* 判断当前需要读取全部课程还是有效课程 */
      if (this.timeUse) {
        this.listUrl = '/manager/course/list'
      } else {
        this.listUrl = '/manager/course/listall'
      }
      const { data: res } = await this.$http.post(this.listUrl, this.queryInfo)
      if (res.state === 701) {
        return this.$message.error('没有数据！')
      } else if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.total = res.count
        this.tableData = res.data
        console.log(res, 'res')
      }
    },
    reset() {
      this.queryInfo = {
        page: 1,
        rows: 10
      }
      this.getPaperList()
    },
    async RemovePaper() {
      const { data: res } = await this.$http.post('/manager/course/del?', {
        courseId: this.supposeDelete.courseId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getPaperList()
        this.supposeDelete = {}
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      console.log(this.supposeDelete)
      this.RemovePaper()
    },
    confirmDelete2() {
      this.historyShow = false
      console.log(this.supposeDelete)
      
      console.log(this.multipleSelection, 'multipleSelection')
      this.tohistory.coursewareNme = this.multipleSelection[0].courseName
      this.tohistory.coursewareType = this.multipleSelection[0].courseType
      this.tohistory.coursewareHours = this.multipleSelection[0].classHours
      this.tohistory.teacherId = this.multipleSelection[0].teacher
      this.tohistory.teacherName = this.multipleSelection[0].teacherName
      
      this.tohistory.organizationId = 88      
      this.tohistory.coursewareTypeId = 13
      this.tohistory.resourcesLink = '1'
      this.tohistory.stutes = 1
      console.log(this.tohistory)
      this.createHistory()
      this.RemovePaper()
    },
    editDetail(row) {
      this.$router.push({
        path: '/paperedit',
        query: {
          row: row
        }
      })
    },
    deletePaper(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    // 添加
    addPaper() {
      this.$router.push({
        path: '/papercreate',
        query: {
          parent: this.currentNode
        }
      })
    },
    // 归档
    addHistory(row) {
        this.supposeDelete = row
        this.historyShow = true
    },
    // 归档
    async createHistory() {
      console.log(this.tohistory, 'this.tohistory')
      const { data: res } = await this.$http.post(
        '/manager/history/courseware/add',
        this.tohistory
      )
      if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          console.log('success')
        }
    },
    handleSelectionChange(val) {
      console.log(val, 'val')
      this.multipleSelection = val
    },
    // 监听rows改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize
      this.getPaperList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getPaperList()
    }
  },
  filters: {
    transfermCompulsory: function(compulsory) {
      if (compulsory == '1') return '自主选课'
      else return '专题培训'
    },
    truncateDate: function(date) {
      var now = new Date()
      var useTime = new Date(date)
      /* console.log(now.getTime(),"qqqqqq",useTime.getTime()) */
      // 当 当前时间大于失效的时间则失效
      if (now.getTime() > useTime.getTime()) {
        return '已失效'
      }
      if (date != null) {
        return date.split('T')[0]
      }
    },
    transfermState: function(state) {
      if (state == '1') return '发布'
      else return '未发布'
    }
  },
  watch: {
    timeUse: function() {
      this.getPaperList()
    },
    /* 深度监听参数要加'' 号 */
    'queryInfo.courseType': {
      handler(newVal, oldVal) {
        this.getPaperList()
      },
      deep: true
    },
    'queryInfo.recommendStutes': {
      handler(newVal, oldVal) {
        this.getPaperList()
      },
      deep: true
    },
    'queryInfo.releaseStutes': {
      handler(newVal, oldVal) {
        this.getPaperList()
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
