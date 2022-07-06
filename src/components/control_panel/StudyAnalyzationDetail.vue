<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examanalyzation' }">考试统计</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/examanalyzationdetail' }">考试统计详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">
              <el-button @click="basicInfo">基本信息</el-button>
              <el-button @click="stateInfo">整体分析</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines detail1_lines">
          <el-container>
            <el-main v-if="showExaminfo">
              <el-row  label-position="left">
                <el-col :span="2">
                  基本信息
                </el-col>
                <el-col :span="20">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  课程名称
                </el-col>
                <el-col :span="20">
                  {{examInfo.name}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  标准课时
                </el-col>
                <el-col :span="20">
                  {{examInfo.classHours}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  主办单位
                </el-col>
                <el-col :span="20">
                  {{examInfo.courseCompany}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  简介
                </el-col>
                <el-col :span="20">
                  {{examInfo.description}}
                </el-col>
              </el-row>

            </el-main>

            <el-main v-if="showStatistic">
              <el-tabs value="first">
                <el-tab-pane label="统计报表" name="first">
                  <div>
                    <div>

                      <div class="m0a">
                        时间段

                        <el-date-picker value-format="yyyy-MM-dd" v-model="queryInfo.startTime" type="date"
                          placeholder="选择日期">
                        </el-date-picker>~
                        <el-date-picker value-format="yyyy-MM-dd" v-model="queryInfo.endTime" type="date"
                          placeholder="选择日期">
                        </el-date-picker>

                      </div>
                    </div>
                    <div class="statistic_table">
                      <table>
                        <tr>
                          <td>应学人数</td>
                          <td>{{this.chartData.enrollNum}}</td>
                          <td>参学人数</td>
                          <td>{{this.chartData.studyNum}}</td>
                          <td>结业人数</td>
                          <td>{{this.chartData.completeNum}}</td>

                        </tr>
                        <tr>
                          <td>报名人数</td>
                          <td>{{this.chartData.people}}</td>
                          <td>参学率</td>
                          <td>{{this.chartData.studyRate | transfermDecimal}}</td>
                          <td>结业率</td>
                          <td>{{this.chartData.completeRate | transfermDecimal}}</td>

                        </tr>
                      </table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="学员列表" name="second">
                  <el-button @click="searchAll()">查询全部列表</el-button>
                  <el-button @click="exportExcel">点击导出当前列表的excel</el-button>
                  <div>
                    <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="students" tooltip-effect="dark"
                      style="width: 100%" id="out-table">
                      <el-table-column prop="userId" label="序号" width="70">
                      </el-table-column>
                      <el-table-column prop="gonghao" label="工号" width="110">
                      </el-table-column>
                      <el-table-column prop="userName" label="用户名" width="110">
                      </el-table-column>
                      <el-table-column prop="speed" label="进度" width="100">
                        <template slot-scope="scope">{{ scope.row.speed | transfermDecimal }}</template>
                      </el-table-column>
                      <el-table-column prop="enrollId" label="报名ID" width="120">
                      </el-table-column>
                      <el-table-column prop="organizationName" label="组织" width="120">
                      </el-table-column>
                      <el-table-column prop="finishHours" label="上课时间" width="120">
                      </el-table-column>

                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                      :page-sizes="[1, 2, 5, 8]" :page-size="rows" layout="total,  prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>

            </el-main>

          </el-container>

        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  import ExamState from '../panel/ExamState.vue'
  // 引入导出Excel表格依赖
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    components: {
      ExamState
    },
    data() {
      return {
        examInfo: {},
        showExaminfo: true,
        showStatistic: false,
        datadetail: {},
        chartData: [],
        queryInfo: {},
        students: [],
        page: 1,
        rows: 10,
        total: 0
      }
    },
    created() {
      this.datadetail = this.$route.query
      this.queryInfo.id = this.datadetail.courseId
      this.getCourseInfo()
      this.getLearnInfo()
      this.learnUserList()
    },
    mounted() {

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
            '学员进度.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      searchAll() {
        this.rows = this.total
        this.learnUserList()
      },
      basicInfo() {
        this.showStatistic = false
        this.showExaminfo = true
      },
      stateInfo() {
        this.showStatistic = true
        this.showExaminfo = false
      },

      async learnUserList() {
        const {
          data: res
        } = await this.$http.post('/manager/lStatistic/learnUserList', {
          id: this.datadetail.courseId,
          page: this.page,
          rows: this.rows
        })
        if (res.state !== 200) {
          this.tableData = []
          return this.$message.error('操作失败！')
        } else {
          res.data.forEach(res => {
            res.gonghao = 'QG22' + res.userId
          })
          this.students = res.data
          this.total = res.count
        }
      },
      async getCourseInfo() {
        const {
          data: res
        } = await this.$http.get('/learn/course/courseInfo?id=' + this.datadetail.courseId)
        if (res.state !== 200) {
          this.tableData = []
          return this.$message.error('操作失败！')
        } else {
          this.examInfo = res.data
        }
      },
      async getLearnInfo() {
        const {
          data: res
        } = await this.$http.post('/manager/lStatistic/learnInfo', this.queryInfo)
        if (res.state !== 200) {
          this.tableData = []
          return this.$message.error('操作失败！')
        } else {
          this.chartData = res.data
          console.log(this.chartData)
        }
      },
      handleSizeChange(newSize) {
        this.rows = newSize
        this.learnUserList()
      },
      handleCurrentChange(newPage) {
        this.page = newPage
        this.learnUserList()
      }
    },
    filters: {
      transfermDate(val) {
        if (val == null) return val
        return val.split('T')[0]
      },
      transfermExamFile(val) {
        if (val == null) return val
        if (val == '0') return '手动归档'
        else return '自动归档'
      },
      transfermAssignTopic(val) {
        if (val == null) return val
        if (val == '1') return '固定'
        else return '随机'
      },
      transfermFractionType(val) {
        if (val == null) return val
        if (val == '1') return '使用题库试题分数'
        else return '指定题型分数'
      },
      transfermAchievementType(val) {
        if (val == null) return val
        if (val == '1') return '考试结束后'
        if (val == '2') return '指定时间'
        else return '不公示'
      },
      transfermDecimal(val) {
        return val + '%'
      }
    }
  }
</script>

<style>
</style>
