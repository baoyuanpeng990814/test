<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examanalyzation' }"
        >考试统计</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form" style="display: flex;">
          <el-col :span="5">
            <el-input v-model="queryInfo.name" placeholder="名称"></el-input>
          </el-col>
          <el-col :span="10">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="queryInfo.startTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker
            >~
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="queryInfo.endTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="9">
            <el-button @click="searchAll()" type="primary"
              >查询全部列表</el-button
            >
            <el-button @click="exportExcel()" type="primary"
              >点击导出当前列表的excel</el-button
            >
            <el-button icon="el-icon-search" @click="searchData" type="primary"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="reset"
              type="primary"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          height=" calc(100vh - 350px) "
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          id="out-table"
        >
          <el-table-column prop="examName" label="考试名称"  align="center">
          </el-table-column>
          <el-table-column prop="organizationName" label="主办单位" align="center">
          </el-table-column>
          <el-table-column prop="examSortName" label="所属分类" align="center">
          </el-table-column>
          <el-table-column prop="failureTime" label="失效时间" align="center">
            <template slot-scope="scope">{{
              scope.row.failureTime | transfermDate
            }}</template>
          </el-table-column>
          <el-table-column prop="enrollNum" label="应考" align="center">
          </el-table-column>
          <el-table-column prop="examNum" label="实考" align="center">
          </el-table-column>
          <el-table-column prop="completeNum" label="通过" align="center">
          </el-table-column>
          <el-table-column prop="average" label="平均分" align="center">
          </el-table-column>
          <el-table-column prop="maxScores" label="最高分" align="center">
          </el-table-column>
          <el-table-column prop="minScores" label="最低分" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="findDetail(scope.row)" type="text" size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </el-card>
  </div>
</template>

<script>
// 引入导出Excel表格依赖
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        rows: 10
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    let currentAnalyzationPage = sessionStorage.getItem(
      'currentAnalyzationPage'
    )
    if (currentAnalyzationPage != null) {
      this.queryInfo.page = Number(currentAnalyzationPage)
    }
    this.getDataList()
  },
  methods: {
    findDetail(val) {
      this.$router.push({
        path: '/examanalyzationdetail',
        query: val
      })
    },
    // 定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          // 设置导出文件名称
          '考试列表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    reset() {
      var temp = this.queryInfo
      this.queryInfo = {}
      this.queryInfo.rows = temp.rows
      this.queryInfo.page = temp.page
      this.getDataList()
    },
    searchData() {
      this.getDataList()
    },
    searchAll() {
      this.queryInfo.rows = this.total
      this.getDataList()
    },
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize
      this.getDataList()
    },
    handleCurrentChange(newPage) {
      sessionStorage.setItem('currentAnalyzationPage', newPage)
      this.queryInfo.page = newPage
      this.getDataList()
    },

    async getDataList() {
      const { data: res } = await this.$http.post(
        '/manager/lStatistic/examList',
        this.queryInfo
      )
      if (res.state !== 200) {
        this.tableData = []
        this.total = 0
      } else {
        this.tableData = res.data
        this.total = res.count
      }
    }
  },
  filters: {
    transfermDate(val) {
      if (val == null) return val
      return val.split('T')[0]
    }
  }
}
</script>

<style></style>
