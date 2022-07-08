<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/functionlist' }">功能菜单</el-breadcrumb-item>

    </el-breadcrumb>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">


          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="模块名称">
                <el-input v-model="filterPara.menuName" placeholder="模块名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="模块状态">
                <el-select v-model="filterPara.state" placeholder="请选择">
                  <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>

        </el-row>
        <el-row class="buttons">

          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="queryFunction" type="primary">查询</el-button>

            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>

            <el-button icon="el-icon-plus" @click="addFunction" type="primary">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <el-aside class="list_tree"  >
            <el-tree  :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <el-main  class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="menuId" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="state" label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.state |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="menuName" label="菜单名称" width="200">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteFunction(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]" :page-size="queryInfo.rows" layout="total, prev, next, jumper"
              :total="total">
            </el-pagination>
          </el-main>
        </el-container>
      </div>


    </el-card>


    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{supposeDelete.menuName}}</span>
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
        states: [{
            value: '1',
            label: '启用'
          },
          {
            value: '0',
            label: '禁用'
          }
        ],
        supposeDelete: {
          userName: ""
        },
        dialogVisible: false,
        multipleSelection: [],

        defaultProps: {
          children: 'chilLItem',
          label: 'menuName'
        },
        treedata: [],
        filterPara: {
          menuName: "",
          state: ""
        },
        queryInfo: {
          parentId: 0,
          page: 1,
          rows: 10
        },
        tableData: [],
        total: 0,
        currentNode: 0
      }
    },
    created() {
      this.getFunctionTree()
      this.getFunctionList()
    },
    methods: {
      handleNodeClick(data) {
        this.queryInfo.parentId = data.parentId
        this.queryInfo.menuName = data.menuName
        this.queryInfo.state = data.state
        this.currentNode = data.menuId
        this.getFunctionList()
        //this.getFunctionTree()
      },
      async getFunctionTree() {
        const {
          data: res
        } = await this.$http.get("/manager/item/tree")
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
        }
      },
      queryFunction() {
        if (this.filterPara.menuName != "") this.queryInfo.menuName = this.filterPara.menuName
        if (this.filterPara.state != "") this.queryInfo.state = this.filterPara.state
        this.getFunctionList()
      },
      async getFunctionList() {

        const {
          data: res
        } = await this.$http.post("/manager/item/list", this.queryInfo)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.total = res.count
          this.tableData = res.data
        }
      },
      reset() {
        this.filterPara.menuName = ""
        this.filterPara.state = ""
        this.queryInfo = {
          parentId: 0,
          page: 1,
          rows: 10
        }
        this.getFunctionList()
      },
      async RemoveFunction() {
        const {
          data: res
        } = await this.$http.post("/manager/item/del", {
          menuId: this.supposeDelete.menuId
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
          this.getFunctionTree()
          this.getFunctionList()
          return this.$message.success('操作成功！')

        }
      },
      confirmDelete() {
        this.dialogVisible = false
        this.RemoveFunction()

      },
      editDetail(row) {
        this.$router.push({
          path: '/functionedit',
          query: {
            row: row
          }
        })
      },
      deleteFunction(row) {
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addFunction() {
        this.$router.push({
          path: '/functioncreate',
          query: {
            parent: this.currentNode
          }
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getFunctionList()

      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getFunctionList()
      }
    },
    filters: {
      truncateDate: function(date) {
        if (date != null) {
          return date.split('T')[0]
        }
      },
      transfermState: function(state) {
        if (state == "1") return "启用"
        else return "禁用"
      }
    }
  }
</script>

<style scoped>

</style>
