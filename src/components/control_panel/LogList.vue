<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/loglist' }"
        >操作日志</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <!-- <el-col > -->
            <!-- <el-form-item label="时间段">
                <el-date-picker
                  v-model="queryInfo.startTime"
                  style="margin-right:10px"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="开始时间"
                >
                </el-date-picker>
                <el-date-picker
                  v-model="queryInfo.endTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item> -->

            <el-form-item label="时间段:">
              <el-col :span="3">
                <el-form-item prop="startTime">
                  <el-date-picker
                    type="date"
                    placeholder="开始时间"
                    v-model="queryInfo.startTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col class="line" :span="1">-</el-col> -->
              <el-col :span="3">
                <el-form-item prop="endTime">
                  <el-date-picker
                    placeholder="结束时间"
                    v-model="queryInfo.endTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="创建人" style="margin-right:10px">
                  <el-input
                    v-model="queryInfo.createUser"
                    placeholder="创建人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="操作类型">
                  <el-input
                    v-model="queryInfo.operationType"
                    placeholder="操作类型"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="3">
                <el-form-item label="日志类型">
                  <el-input
                    v-model="queryInfo.logType"
                    placeholder="日志类型"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="3">
                <el-form-item label="业务模块">
                  <el-input
                    v-model="queryInfo.businessModule"
                    placeholder="业务模块"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="text-align: right;">
                <el-button
                  icon="el-icon-search"
                  @click="searchUser"
                  type="primary"
                  >查询</el-button
                >

                <el-button
                  icon="el-icon-refresh-right"
                  @click="reset"
                  type="primary"
                  >重置</el-button
                >
              </el-col>
            </el-form-item>
            <!-- </el-col> -->

            <!-- <el-col :span="5">
              <el-form-item label="创建人">
                <el-input v-model="queryInfo.createUser" placeholder="创建人"></el-input>
              </el-form-item>
            </el-col> -->
          </el-form>
        </el-row>
      </div>
      <div>
        <el-table
          height=" calc(100vh - 440px) "
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="logId" label="序号" width="60">
          </el-table-column>
          <el-table-column
            prop="businessModule"
            label="系统模块"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="logType"
            label="日志类型"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="operationType"
            label="操作类型"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="logUrl" label="请求url" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="description" label="描述" width="120">
          </el-table-column>
          <el-table-column
            prop="createUser"
            label="创建人"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 8]"
        :page-size="queryInfo.rows"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        rows: 10
      },
      genders: [
        {
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
    this.getLogList()
  },
  methods: {
    reset() {
      var temp = this.queryInfo
      this.queryInfo = {}
      this.queryInfo.rows = temp.rows
      this.queryInfo.page = temp.page

      this.getLogList()
    },
    searchUser() {
      this.getLogList()
    },
    async getLogList() {
      const { data: res } = await this.$http.post(
        '/manager/log/list',
        this.queryInfo
      )
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.tableData = res.data
        this.total = res.count
      }
    },
    findDetail(row) {
      this.$router.push({
        path: '/userdetail',
        query: {
          row: row
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 监听rows改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize
      this.getLogList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getLogList()
    }
  },
  filters: {
    transformState: function(state) {
      if (state === '1') return '启用'
      else return '禁用'
    }
  }
}
</script>

<style scoped></style>
