<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examanalyzation' }"
        >考试统计</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/examanalyzationdetail' }"
        >考试统计详情</el-breadcrumb-item
      >
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
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines detail1_lines">
          <el-container>
            <el-main v-if="showExaminfo">
              <el-row label-position="left">
                <el-col :span="2">
                  基本信息
                </el-col>
                <el-col :span="20"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  课程名称
                </el-col>
                <el-col :span="20">
                  {{ examInfo.name }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  标准课时
                </el-col>
                <el-col :span="20">
                  {{ examInfo.classHours }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  主办单位
                </el-col>
                <el-col :span="20">
                  {{ examInfo.courseCompany }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  简介
                </el-col>
                <el-col :span="20">
                  {{ examInfo.description }}
                </el-col>
              </el-row>
            </el-main>

            <el-main v-if="showStatistic">
              <el-tabs value="StuList" @tab-click="handleTabClick">
                <el-tab-pane label="统计报表" name="StaReport">
                  <div>
                    <div>
                      <div class="m0a">
                        时间段

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
                      </div>
                    </div>
                    <div class="statistic_table">
                      <table>
                        <tr>
                          <td>应学人数</td>
                          <td>{{ this.chartData.enrollNum }}</td>
                          <td>参学人数</td>
                          <td>{{ this.chartData.studyNum }}</td>
                          <td>结业人数</td>
                          <td>{{ this.chartData.completeNum }}</td>
                        </tr>
                        <tr>
                          <td>报名人数</td>
                          <td>{{ this.chartData.people }}</td>
                          <td>参学率</td>
                          <td>
                            {{ this.chartData.studyRate | transformDecimal }}
                          </td>
                          <td>结业率</td>
                          <td>
                            {{ this.chartData.completeRate | transformDecimal }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="学员列表" name="StuList">
                  <el-button @click="searchAll()">查询全部列表</el-button>
                  <el-button @click="exportExcel"
                    >点击导出当前列表的excel</el-button
                  >
                  <div>
                    <!-- 学员列表数据 -->
                    <el-table
                      height=" calc(100vh - 350px) "
                      ref="multipleTable"
                      :data="students"
                      tooltip-effect="dark"
                      style="width: 100%"
                      id="out-table"
                    >
                      <el-table-column
                        prop="userId"
                        label="序号"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="gonghao"
                        label="工号"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="userName"
                        label="用户名"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column prop="speed" label="进度" align="center">
                        <template slot-scope="scope">{{
                          scope.row.speed | transformDecimal
                        }}</template>
                      </el-table-column>
                      <el-table-column
                        prop="enrollId"
                        label="报名ID"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="organizationName"
                        label="组织"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="finishHours"
                        label="上课时间"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="chapter"
                        label="查看笔记"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-button
                            ref="btnRef"
                            type="text"
                            size="small"
                            @click="findStuNotesFn(scope.row)"
                            >查看</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- 学员列表分页数据 -->
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[1, 2, 5, 8]"
                      :page-size="rows"
                      layout="total,  prev, pager, next, jumper"
                      :total="total"
                    >
                    </el-pagination>
                    <!-- 查看学员笔记对话框 -->
                    <!-- <el-dialog
                      title="课程章节"
                      :visible.sync="chaptersDialog"
                      width="30%"
                    >
                   
                      <el-table :data="chapterData">
                        <el-table-column
                          type="index"
                          width="50"
                          label="序号"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="chapterName"
                          label="章节名称"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="stuNotes"
                          label="学员笔记"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-button
                              ref="notesButtonRef"
                              type="text"
                              size="small"
                              @click="findStuNotesFn(scope.row)"
                              >查看</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="chaptersDialog = false"
                          >取 消</el-button
                        >
                        <el-button
                          type="primary"
                          @click="chaptersDialog = false"
                          >确 定</el-button
                        >
                      </span>
                    </el-dialog> -->
                    <!-- 笔记对话框 -->
                    <el-dialog
                      title="学员笔记查询"
                      :visible.sync="notesDialog"
                      width="30%"
                    >
                      <el-table :data="noteData">
                        <el-table-column
                          type="index"
                          width="50"
                          label="序号"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="courseName"
                          label="课程名称"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="chapterName"
                          label="章节名称"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="studyNotes"
                          label="学员笔记"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="创建时间"
                          align="center"
                        >
                          <template slot-scope="scope">
                            {{ scope.row.createTime | transformDate }}
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-dialog>
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
/* import ExamState from '../panel/ExamState.vue' */
// 引入导出Excel表格依赖
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: {
    /* ExamState */
  },
  data() {
    return {
      chaptersDialog: false, // 控制章节弹框
      notesDialog: false, // 控制笔记弹框
      examInfo: {},
      showExaminfo: true,
      showStatistic: false,
      datadetail: {},
      chartData: [],
      queryInfo: {},
      students: [],
      page: 1,
      rows: 10,
      total: 0,
      chapterData: [], // 章节数据
      noteData: [], // 笔记数据
      userId: '' // 用户id
    }
  },
  created() {
    this.datadetail = this.$route.query
    this.queryInfo.id = this.datadetail.courseId
    this.getCourseInfo()
    this.getLearnInfo()
  },
  methods: {
    // 点击标签页
    handleTabClick(tab, event) {},
    // 获取学员列表
    async learnUserList() {
      const { data: res } = await this.$http.post(
        '/manager/lStatistic/learnUserList',
        {
          id: this.datadetail.courseId,
          page: this.page,
          rows: this.rows
        }
      )
      if (res.state !== 200) {
        this.tableData = []
        return this.$message.error('操作失败！')
      } else {
        res.data.forEach(res => {
          res.gonghao = 'QG23' + res.userId
        })
        this.students = res.data
        this.total = res.count
      }
    },
    // 查看学员笔记
    async findStuNotesFn(row) {
      if (row.courseId && row.userId) {
        const { data: res } = await this.$http.post('/learn/snotes/list', {
          page: 1,
          rows: 10,
          courseId: row.courseId,
          userId: row.userId
        })
        if (res.state !== 200) {
          this.noteData = res.data
          this.$message.warning(`${row.userName}无笔记`)
        } else {
          this.notesDialog = true
          this.noteData = res.data
        }
      }
    },
    // 查看学员笔记
    // async findStuNotesFn(row) {
    //   let noteParams = {
    //     page: 1,
    //     rows: 10,
    //     courseId: row.courseId,
    //     userId: this.userId
    //   }
    //   if (row.courseId && this.userId) {
    //     this.chaptersDialog = false
    //     const { data: res } = await this.$http.post(
    //       '/learn/snotes/list',
    //       noteParams
    //     )
    //     if (res.state !== 200) {
    //       return this.$message.error('该学员暂未记笔记')
    //     } else {
    //       this.notesDialog = true
    //       this.noteData = res.data
    //     }
    //   }
    // },
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
      this.learnUserList()
      this.showStatistic = true
      this.showExaminfo = false
    },
    async getCourseInfo() {
      const { data: res } = await this.$http.get(
        '/learn/course/courseInfo?id=' + this.datadetail.courseId
      )
      if (res.state !== 200) {
        this.tableData = []
        return this.$message.error('操作失败！')
      } else {
        this.examInfo = res.data
      }
    },
    async getLearnInfo() {
      const { data: res } = await this.$http.post(
        '/manager/lStatistic/learnInfo',
        this.queryInfo
      )
      if (res.state !== 200) {
        this.tableData = []
        return this.$message.error('操作失败！')
      } else {
        this.chartData = res.data
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
    transformDate(val) {
      if (val === null) return val
      return val.split('T')[0]
    },
    transfermExamFile(val) {
      if (val === null) return val
      if (val === '0') return '手动归档'
      else return '自动归档'
    },
    transfermAssignTopic(val) {
      if (val === null) return val
      if (val === '1') return '固定'
      else return '随机'
    },
    transfermFractionType(val) {
      if (val === null) return val
      if (val === '1') return '使用题库试题分数'
      else return '指定题型分数'
    },
    transfermAchievementType(val) {
      if (val === null) return val
      if (val === '1') return '考试结束后'
      if (val === '2') return '指定时间'
      else return '不公示'
    },
    transformDecimal(val) {
      return val + '%'
    }
  }
}
</script>

<style></style>
