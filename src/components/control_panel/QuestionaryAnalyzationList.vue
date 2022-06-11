<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/studyanalyzation' }">学习统计</el-breadcrumb-item>

    </el-breadcrumb>


    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">

          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="名称">
                <el-input v-model="queryInfo.name" placeholder="名称"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="buttons">

          <el-col :span="24" :offset="0">
            <el-button icon="el-icon-search" @click="searchData" type="primary">查询</el-button>

            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark"
          style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column prop="examineName" label="问卷名称" width="120">
          </el-table-column>
          <el-table-column prop="examineNum" label="问卷编号" width="120">
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="220">
            <template slot-scope="scope">{{ scope.row.startTime |transformDate }}</template>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="220">
            <template slot-scope="scope">{{ scope.row.endTime |transformDate }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-table>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 8]"
        :page-size="queryInfo.rows" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>

</template>

<script>
  export default {
    name: 'StudyRecord',
    data() {
      return {
        tableData: [],
        queryInfo: {
          page: 1,
          rows: 10
        },
        total: 0
      }

    },
    created() {
      this.getDataList()
    },
    methods: {
      findDetail(row) {
        //console.log(row)
        this.$router.push({
          path:'/questionaryanalyzationdetail',
          query:row
        })
      },
      handleSelectionChange(val) {},
      async getDataList() {
        const {
          data: res
        } = await this.$http.post("/manager/lStatistic/examineList", this.queryInfo)
        if (res.state !== 200) {
          this.tableData = []
          this.total = 0
        } else {
          this.tableData = res.data
          this.total = res.count


        }
      },
      searchData() {
        this.getDataList()
      },
      reset() {
        var temp = this.queryInfo
        this.queryInfo = {}
        this.queryInfo.rows = temp.rows
        this.queryInfo.page = temp.page
        this.getDataList()
      },
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getDataList()

      },
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getDataList()
      },
      handleCurrentChange() {}
    },
    filters: {
      transformType(val) {
        if (val == "1") return "必修"
        else return "选修"
      },
      transformDate(val) {
        if (val == null) return val
        return val.split('T')[0]
      },
      transfermDecimal(val) {
        return (parseInt(val) * 100) + "%"
      }
    }
  }
</script>

<style>
</style>
