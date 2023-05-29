<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/courselist' }"
        >课件管理</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="4">
              <el-form-item label="课件名称:">
                <el-input
                  v-model="queryInfo.coursewareName"
                  placeholder="课件名称"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="主讲人">
                <el-select
                  v-model="filterPara.teacherId"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in teachers"
                    :key="item.teacherId"
                    :label="item.teacherName"
                    :value="item.teacherId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="课件状态">
                <el-select
                  v-model="filterPara.state"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in states"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-button
                icon="el-icon-search"
                @click="queryCourse"
                type="primary"
                >查询</el-button
              >
              <el-button
                icon="el-icon-refresh-right"
                @click="reset"
                type="primary"
                >重置</el-button
              >
              <el-button icon="el-icon-plus" @click="addCourse" type="primary"
                >添加</el-button
              >
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree" width="120px">
            <el-tree
              :expand-on-click-node="false"
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
              <el-table-column
                type="index"
                label="序号"
                width="70"
                align="center"
              >
                <template slot-scope="scope">
                  {{ (queryInfo.page - 1) * queryInfo.rows + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="coursewareName"
                label="课件名称"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="coursewareType"
                label="课件类型"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.coursewareType | transformType
                }}</template>
              </el-table-column>
              <el-table-column prop="teacherName" label="讲师" align="center">
              </el-table-column>
              <el-table-column
                prop="resourcesLink"
                label="课件路径"
                show-overflow-tooltip
                align="center"
              >
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
                    @click="deleteCourse(scope.row)"
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
              :page-sizes="[1, 2, 5, 8]"
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
      <span>确定要删除：{{ supposeDelete.coursewareName }}</span>
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
      states: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '0',
          label: '禁用'
        }
      ],
      supposeDelete: {
        userName: ''
      },
      dialogVisible: false,
      multipleSelection: [],

      defaultProps: {
        children: 'chilCoursewareType',
        label: 'coursewareTypeName'
      },
      treedata: [],
      filterPara: {
        coursewareName: '',
        teacherId: '',
        state: ''
      },
      queryInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      total: 0,
      currentNode: 0,
      teachers: []
    }
  },
  created() {
    let currentCoursePage = sessionStorage.getItem('currentCoursePage')
    if (currentCoursePage != null) {
      this.queryInfo.page = Number(currentCoursePage)
    }
    if (this.$route.query.coursewareTypeId) {
      this.queryInfo.coursewareTypeId = this.$route.query.coursewareTypeId
    }
    this.getTeacherList()
    this.getCourseTree()
    this.getCourseList()
  },
  methods: {
    handleNodeClick(data) {
      // this.queryInfo.parentId = data.parentId
      this.queryInfo.coursewareTypeId = data.coursewareTypeId
      this.getCourseList()
      this.$router.push({
        path: '/courselist',
        query: { coursewareTypeId: this.queryInfo.coursewareTypeId }
      })
    },
    async getCourseTree() {
      const { data: res } = await this.$http.post('/manager/ctyp/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treedata = res.data
      }
    },
    queryCourse() {
      if (this.filterPara.coursewareName !== '') {
        this.queryInfo.coursewareName = this.filterPara.coursewareName
      }
      if (this.filterPara.teacherId !== '') {
        for (var i = 0; i < this.teachers.length; i++) {
          if (this.teachers[i].teacherId === this.filterPara.teacherId) {
            this.queryInfo.teacherName = this.teachers[i].teacherName
          }
        }
      }
      if (this.filterPara.state !== '') {
        this.queryInfo.stutes = this.filterPara.state
        this.getCourseList()
      }
    },
    async getCourseList() {
      const { data: res } = await this.$http.post(
        '/manager/courseware/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        this.tableData = []
        // return this.$message.error('数据获取失败！')
      } else {
        this.total = res.count
        this.tableData = res.data
      }
    },
    reset() {
      if (this.filterPara.coursewareName !== '') {
        this.queryInfo.coursewareName = this.filterPara.coursewareName
      }

      if (this.filterPara.teacherId !== '') {
        for (var i = 0; i < this.teachers.length; i++) {
          if (this.teachers[i].teacherId === this.filterPara.teacherId) {
            this.queryInfo.teacherName = this.teachers[i].teacherName
          }
        }
      }

      this.filterPara.coursewareName = ''
      this.filterPara.teacherId = ''
      this.filterPara.state = ''
      this.queryInfo = {
        page: 1,
        rows: 10
      }
      this.getCourseList()
    },
    async RemoveCourse() {
      const { data: res } = await this.$http.post('/manager/courseware/del', {
        coursewareId: this.supposeDelete.coursewareId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.supposeDelete = {}
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.parentId = temp.parentId
        this.queryInfo.page = temp.page
        this.queryInfo.rows = temp.rows
        this.getCourseTree()
        this.getCourseList()
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveCourse()
    },
    editDetail(row) {
      this.$router.push({
        path: '/courseedit',
        query: {
          row: row
        }
      })
    },
    deleteCourse(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addCourse() {
      this.$router.push({
        path: '/coursecreate',
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
      this.getCourseList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      sessionStorage.setItem('currentCoursePage', newPage)
      this.queryInfo.page = newPage
      this.getCourseList()
    },
    async getTeacherList() {
      const { data: res } = await this.$http.post('/manager/teacher/list', {
        page: 1,
        rows: 100
      })
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.teachers = res.data
      }
    }
  },
  filters: {
    transformDate: function(date) {
      if (date !== null) {
        return date.split('T')[0]
      }
    },
    transformState: function(state) {
      if (state === '1') return '启用'
      else return '禁用'
    },
    transformType: function(type) {
      if (type === '1') return '讲义'
      else if (type === '2') return '文档'
      else if (type === '2') return '视频'
      else return '标准'
    }
  }
}
</script>

<style scoped>
.el-col-14 {
  text-align: right;
  width: 58.33333%;
}
</style>
