<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/programlist' }"
        >课程分类</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-plus" @click="addProgram" type="primary"
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
              <el-table-column prop="courseSortId" label="序号" align="center">
              </el-table-column>
              <el-table-column
                prop="courseSortName"
                label="课程名称"
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
                    @click="deleteProgram(scope.row)"
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
              layout="total,  prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>

    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{ supposeDelete.courseSortName }}</span>
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
        userName: ''
      },
      dialogVisible: false,
      multipleSelection: [],

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
      tableData: [],
      total: 0,
      currentNode: 0
    }
  },
  created() {
    this.getProgramTree()
    this.getProgramList()
  },
  methods: {
    handleNodeClick(data) {
      this.queryInfo.courseSortId = data.parentNode
      this.currentNode = data.courseSortId
      this.getProgramList()
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
    async getProgramList() {
      const { data: res } = await this.$http.post(
        '/manager/csort/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.total = res.count
        this.tableData = res.data
      }
    },
    reset() {
      this.queryInfo.organizationCode = ''
      this.queryInfo.organizationName = ''
      this.getProgramList()
    },
    async RemoveProgram() {
      const { data: res } = await this.$http.post('/manager/csort/del', {
        courseSortId: this.supposeDelete.courseSortId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getProgramList()
        this.supposeDelete = {}
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveProgram()
    },
    editDetail(row) {
      this.$router.push({
        path: '/programedit',
        query: {
          row: row
        }
      })
    },
    deleteProgram(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addProgram() {
      this.$router.push({
        path: '/programcreate',
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
      this.getProgramList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getProgramList()
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
    }
  }
}
</script>

<style scoped></style>
