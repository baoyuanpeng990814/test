<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dictionarylist' }"
        >数据字典</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->

        <el-row class="buttons">
          <el-col :span="24" style="display: flex; justify-content: end;">
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
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-aside>
          <el-main class="list_body">
            <el-table
              height=" calc(100vh - 290px) "
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" align="center">
              </el-table-column>
              <el-table-column prop="dictId" label="序号" align="center">
              </el-table-column>

              <el-table-column
                prop="dictName"
                label="字典类型名称"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="dictCode"
                label="字典类型编码"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="dictDescription"
                label="数据字典描述"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="stutes" label="状态" align="center">
                <template slot-scope="scope">{{
                  scope.row.stutes | transformStatus
                }}</template>
              </el-table-column>
              <el-table-column prop="createUser" label="创建人" align="center">
                <template slot-scope="scope">{{
                  scope.row.createUser | transformUser
                }}</template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.createTime | transformDate
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
                    @click="deleteType(scope.row)"
                    type="text"
                    size="small"
                    class="red"
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
      <span>确定要删除：{{ supposeDelete.dictName }}</span>
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
        children: 'chilDictType',
        label: 'dictTypeName'
      },
      treeData: [],
      queryInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      total: 0,
      currentNode: 1,
      teachers: []
    }
  },
  created() {
    this.getDictionaryList()
    this.getDictionaryTypeTree()
  },
  methods: {
    handleNodeClick(data) {
      this.queryInfo.dictTypeId = data.dictTypeId
      this.currentNode = data.dictTypeId
      this.getDictionaryList()
      this.getDictionaryTypeTree()
    },
    async getDictionaryTypeTree() {
      const { data: res } = await this.$http.post('/manager/dtyp/tree')
      if (res.state !== 200) {
        return this.$message.error('获取数据字典树失败')
      } else {
        this.treeData = res.data
      }
    },
    queryCourse() {
      this.getDictionaryList()
    },
    // 获取数据字典列表数据
    async getDictionaryList() {
      const { data: res } = await this.$http.post(
        '/manager/dict/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        this.tableData = res.data
        return this.$message.error('获取列表数据失败')
      } else {
        this.total = res.count
        this.tableData = res.data
      }
    },
    reset() {
      this.queryInfo = {
        page: 1,
        rows: 10
      }
      this.getDictionaryList()
    },
    async RemoveType() {
      const { data: res } = await this.$http.post('/manager/dict/del', {
        dictId: this.supposeDelete.dictId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.supposeDelete = {}
        let temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.parentId = temp.parentId
        this.queryInfo.page = temp.page
        this.queryInfo.rows = temp.rows
        this.getDictionaryList()
        this.getDictionaryTypeTree()
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveType()
    },
    editDetail(row) {
      this.$router.push({
        path: '/dictionaryedit',
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
        path: '/dictionarycreate',
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
      this.getDictionaryList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getDictionaryList()
    }
  },
  filters: {
    transformDate: function(date) {
      if (date !== null) {
        return date.split('T')[0]
      }
    },
    transformStatus: function(state) {
      if (state === '1') return '启用'
      else return '禁用'
    },
    transformType: function(type) {
      if (type === '1') return '讲义'
      else if (type === '2') return '文档'
      else if (type === '2') return '视频'
      else return '标准'
    },
    transformUser: function(user) {
      if (user === '1') return '管理员'
    }
  }
}
</script>

<style scoped></style>
