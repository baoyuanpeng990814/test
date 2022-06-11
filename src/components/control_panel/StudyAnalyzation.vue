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
            <el-col :span="12">
              <el-form-item label="时间段">
                <el-date-picker value-format="yyyy-MM-dd" v-model="queryInfo.startTime" type="date" placeholder="选择日期">
                </el-date-picker>~
                <el-date-picker value-format="yyyy-MM-dd" v-model="queryInfo.endTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- -->
            <el-button @click="searchAll()">查询全部列表</el-button>
            <el-button @click="exportExcel">点击导出当前列表的excel</el-button>

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
          style="width: 100%" @selection-change="handleSelectionChange" id="out-table">
          <el-table-column prop="courseName" label="课程名称" width="120" >
          </el-table-column>
          <el-table-column prop="courseType" label="课程类型" width="120">
            <template slot-scope="scope">{{ scope.row.courseType | transformType }}</template>
          </el-table-column>

          <el-table-column prop="courseType" label="发布时间" width="120">
            <template slot-scope="scope">{{ scope.row.createTime | transformDate }}</template>
          </el-table-column>
          <el-table-column prop="enrollNum" label="应参人数" width="120">
          </el-table-column>
          <el-table-column prop="studyNum" label="实参人数" width="120">
          </el-table-column>
          <el-table-column prop="completeNum" label="结业人数" width="120">
          </el-table-column>
          <el-table-column prop="studyRate" label="参学率" width="80">
            <template slot-scope="scope">{{ scope.row.studyRate |transfermDecimal }}</template>
          </el-table-column>
          <el-table-column prop="completeRate" label="结业率" width="80">
            <template slot-scope="scope">{{ scope.row.completeRate |transfermDecimal }}</template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 8]"
        :page-size="queryInfo.rows" layout="total,  prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
  // 引入导出Excel表格依赖
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
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
            '学习列表.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      findDetail(row) {
        this.$router.push({
          path: '/studyanalyzationdetail',
          query: row
        })
      },
      handleSelectionChange(val) {},
      async getDataList() {
        const {
          data: res
        } = await this.$http.post('/manager/lStatistic/learnList', this.queryInfo)
        if (res.state !== 200) {
          this.tableData = []
          this.total = 0
        } else {
          this.tableData = res.data
          this.total = res.count
        }
      },
      searchAll() {
        this.queryInfo.rows = this.total
        this.getDataList()
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
      }

    },
    filters: {
      transformType(val) {
        if (val == '1') return '自主选课'
        else return '专题培训'
      },
      transformDate(val) {
        if (val == null) return val
        return val.split('T')[0]
      },
      transfermDecimal(val) {
        return (parseInt(val)) + '%'
      }
    }
  }
</script>

<style>
</style>
