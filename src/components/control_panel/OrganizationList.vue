<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/organizationlist' }">组织机构</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/organizationlist' }"
        >机构管理</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="机构名称" style="margin-right:10px">
                <el-input
                  v-model="queryInfo.organizationName"
                  placeholder="机构名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="机构编码">
                <el-input
                  v-model="queryInfo.organizationCode"
                  placeholder="机构编码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-button
                icon="el-icon-search"
                @click="getOrganizationList"
                type="primary"
                >查询</el-button
              >

              <el-button
                icon="el-icon-refresh-right"
                @click="reset"
                type="primary"
                >重置</el-button
              >

              <el-button
                icon="el-icon-plus"
                @click="addOrganization"
                type="primary"
                >添加</el-button
              >
            </el-col>
          </el-form>
        </el-row>
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
              :highlight-current="false"
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
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column
                prop="organizationId"
                label="序号"
                width="60"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="organizationType"
                label="状态"
                width="60"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.organizationType | transformState
                }}</template>
              </el-table-column>
              <el-table-column
                prop="organizationCode"
                label="编码"
                width="160"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="organizationName"
                label="机构名称"
                width="220"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="updateTime"
                label="最后修改时间"
                width="120"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.updateTime | transformDate
                }}</template>
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    class="red"
                    @click="deleteOrganization(scope.row)"
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
              layout="total,   prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>

    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{ supposeDelete.organizationName }}</span>
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
      edit: true,
      defaultProps: {
        children: 'chilLOrganization',
        label: 'organizationName'
      },
      treedata: [],
      queryInfo: {
        organizationId: 0,
        organizationCode: '',
        organizationName: '',
        page: 1,
        rows: 10
      },
      tableData: [],
      total: 0,
      currentNode: 0
    }
  },
  created() {
    this.getOrganizationTree()
    this.getOrganizationList()
  },
  methods: {
    handleNodeClick(data) {
      this.$router.push({
        path: '/organizationlist',
        query: {
          currentNode: data.organizationId
        }
      })
      this.queryInfo.organizationId = data.parentNode
      this.currentNode = data.organizationId
      this.getOrganizationList()
    },
    async getOrganizationTree() {
      const { data: res } = await this.$http.post('/manager/org/tree')
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.treedata = res.data
      }
    },
    async getOrganizationList() {
      const { data: res } = await this.$http.post(
        '/manager/org/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.total = res.count
        this.tableData = res.data
      }
    },
    reset() {
      this.queryInfo.organizationCode = ''
      this.queryInfo.organizationName = ''
      this.getOrganizationList()
    },
    async RemoveOrganization() {
      const { data: res } = await this.$http.post('/manager/org/del', {
        organizationId: this.supposeDelete.organizationId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getOrganizationList()
        this.supposeDelete = {}
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveOrganization()
    },
    editDetail(row) {
      this.$router.push({
        path: '/organizationcreate',
        query: {
          row: row,
          edit: this.edit,
          orgTableData: this.tableData
        }
      })
    },
    deleteOrganization(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addOrganization() {
      this.$router.push({
        path: '/organizationcreate',
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
      this.getOrganizationList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getOrganizationList()
    }
  },
  filters: {
    transformDate: function(date) {
      if (date != null) {
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
