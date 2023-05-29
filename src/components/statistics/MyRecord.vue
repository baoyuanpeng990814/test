<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="学习记录">学习记录</el-tab-pane>
      <el-tab-pane label="考试记录">
        <el-table
          height=" calc(100vh - 150px) "
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="examName" label="考试名称" width="120">
          </el-table-column>
          <el-table-column prop="examTime" label="报考时间" width="170">
            <template slot-scope="scope">{{
              scope.row.examTime | transfermDate
            }}</template>
          </el-table-column>
          <el-table-column prop="userScore" label="分数" width="60">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 8]"
          :page-size="query.rows"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="调查记录">调查记录</el-tab-pane>
      <el-tab-pane label="练习记录">练习记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        page: 1,
        rows: 10
      },
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getExamReport()
  },
  methods: {
    show() {
      console.log('show')
    },
    handleSizeChange(newSize) {
      this.query.rows = newSize
      this.getExamReport()
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getExamReport()
    },
    async getExamReport() {
      //统计考试分数
      const { data: res } = await this.$http.post(
        '/learn/myexam/myExamlist',
        this.query
      )
      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.tableData = res.data
        this.total = res.count
      }
    }
  },
  filters: {
    transfermDate(val) {
      if (val === null) return val
      return val.split('T')[0] + ' ' + val.split('T')[1].split('.')[0]
    }
  }
}
</script>

<style></style>
