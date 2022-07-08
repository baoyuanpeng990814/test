<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/carousellist' }">轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="标题">
                <el-input v-model="queryInfo.name" placeholder="标题"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="searchcarousel()" type="primary">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
            <el-button icon="el-icon-plus" @click="addcarousel" type="primary">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <!-- <el-aside class="list_tree" width="120px">
            <el-tree :expand-on-click-node="false" :default-expand-all="true" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
            </el-tree>
          </el-aside> -->
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="rotateId" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="rotateTop" label="发布状态" width="120">
                <template slot-scope="scope">{{ scope.row.rotateTop |transfermState }}</template>
              </el-table-column>
              <el-table-column prop="jumpUrl" label="跳转路径" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="picturesUrl" label="图片路径" width="120">
                <template slot-scope="scope">
                  <img style="width:100px;height:auto; " :src="scope.row.picturesUrl">
                </template>

              </el-table-column>

              <el-table-column prop="rotateSeq" label="排序" width="120">

              </el-table-column>
              <el-table-column prop="createUser" label="作者" width="120">
              </el-table-column>
              <el-table-column prop="createTime" label="发布时间" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.createTime |truncateDate }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button>
                  <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deletecarousel(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-size="queryInfo.rows" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除新闻：{{supposeDelete.newTitle}}</span>
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
        defaultProps: {
          children: '',
          label: ''
        },
        treedata: [],
        supposeDelete: {
          carouselId: ''
        },
        dialogVisible: false,
        queryInfo: {
          page: 1,
          rows: 10
        },
        genders: [{
            value: '1',
            label: '男'
          },
          {
            value: '2',
            label: '女'
          }
        ],
        tableData: [],
        multipleSelection: [],
        total: 0
      }
    },
    created() {
      this.getcarouselList()
      this.getOrganizationTree()
    },
    methods: {

      handleNodeClick(data) {
        this.queryInfo.organizationId = data.organizationId
        // this.currentNode = data.organizationId
        this.getcarouselList()
      },
      async getOrganizationTree() {
        const {
          data: res
        } = await this.$http.post('/manager/org/tree')
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.treedata = res.data
        }
      },
      reset() {
        this.queryInfo.name = ''
        this.queryInfo.username = ''
        this.queryInfo.gender = ''
        this.queryInfo.stutes = ''
        this.queryInfo.mobile = ''
        this.getcarouselList()
      },
      searchcarousel() {
        this.getcarouselList()
      },
      async getcarouselList() {
        const {
          data: res
        } = await this.$http.post('/manager/rotate/list', this.queryInfo)
        if (res.state !== 200) {
          // return this.$message.error('数据获取失败！')
          this.tableData = []
        } else {
          this.tableData = res.data
          this.total = res.count
        }
      },
      async Removecarousel() {
        const {
          data: res
        } = await this.$http.post('/manager/rotate/del', {
          rotateId: this.supposeDelete.rotateId
        })
        if (res.state !== 200) {
          return this.$message.error('操作失败！')
        } else {
          this.getcarouselList()
          this.supposeDelete = {}
          return this.$message.success('操作成功！')
        }
      },
      confirmDelete() {
        this.dialogVisible = false
        this.Removecarousel()
      },
      findDetail(row) {
        this.$router.push({
          path: '/carouseldetail',
          query: {
            row: row
          }
        })
      },
      editDetail(row) {
        this.$router.push({
          path: '/carouseledit',
          query: {
            row: row
          }
        })
      },
      deletecarousel(row) {
        console.log('du')
        this.supposeDelete = row
        this.dialogVisible = true
      },
      addcarousel() {
        this.$router.push({
          path: '/carouselcreate'
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 监听rows改变的事件
      handleSizeChange(carouselize) {
        this.queryInfo.rows = carouselize
        this.getcarouselList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getcarouselList()
      }
    },
    filters: {
      transfermState: function(state) {
        if (state == '0') {
          return '未发布'
        } else {
          return '已发布'
        }
      },
      truncateDate: function(date) {
        if (date != null) {
          return date.split('T')[0]
        }
      }
    }
  }
</script>
<style scoped>
</style>
