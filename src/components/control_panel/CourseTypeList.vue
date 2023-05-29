<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/coursetypelist' }"
        >课件分类管理</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->

        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-plus" @click="addType" type="primary"
              >添加</el-button
            >
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
            ></el-tree>
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
                prop="coursewareTypeId"
                label="序号"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="coursewareTypeName"
                label="课件分类名称"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="stutes" label="状态" align="center">
                <template slot-scope="scope">{{
                  scope.row.stutes | transformState
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
                    @click="deleteType(scope.row)"
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
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>

    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{ supposeDelete.coursewareTypeName }}</span>
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
    this.getCourseTypeList()
    this.getCourseTypeTree()
  },
  methods: {
    handleNodeClick(data) {
      this.queryInfo.coursewareTypeId = data.parentNode
      this.currentNode = data.coursewareTypeId
      this.getCourseTypeList()
      // this.getCourseTypeTree()
    },
    async getCourseTypeTree() {
      const { data: res } = await this.$http.post('/manager/ctyp/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treedata = res.data
      }
    },
    queryCourse() {
      // if (this.filterPara.coursewareName != "") this.queryInfo.coursewareName = this.filterPara.coursewareName
      //   if (this.filterPara.teacherId != ""){
      //     for(var i = 0;i<this.teachers.length;i++){
      //       if(this.teachers[i].teacherId==this.filterPara.teacherId){
      //         this.queryInfo.teacherName = this.teachers[i].teacherName
      //       }
      //     }
      //   }
      //   if (this.filterPara.state != "") this.queryInfo.stutes = this.filterPara.state
      // this.getCourseTypeList()
    },
    async getCourseTypeList() {
      const { data: res } = await this.$http.post(
        '/manager/ctyp/list',
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
      this.getCourseTypeList()
    },
    async RemoveType() {
      const { data: res } = await this.$http.post('/manager/ctyp/del', {
        coursewareTypeId: this.supposeDelete.coursewareTypeId
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
        this.getCourseTypeList()
        this.getCourseTypeTree()
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveType()
    },
    editDetail(row) {
      this.$router.push({
        path: '/coursetypeedit',
        query: {
          row: row
        }
      })
    },
    deleteType(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addType() {
      this.$router.push({
        path: '/coursetypecreate',
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
      this.getCourseTypeList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getCourseTypeList()
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

<style scoped></style>
