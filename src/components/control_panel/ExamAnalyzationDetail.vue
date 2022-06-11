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
              <el-button @click="scoreInfo">成绩统计</el-button>
              <el-button @click="scoreTable">成绩报表</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines">
          <el-container>
            <el-main v-if="showExaminfo">
              <el-row>
                <el-col :span="4"> 基本信息 </el-col>
                <el-col :span="20"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 试卷名称 </el-col>
                <el-col :span="20">
                  {{ examInfo.examName }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 主办单位 </el-col>
                <el-col :span="20">
                  {{ examInfo.organizationName }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 负责人 </el-col>
                <el-col :span="20">
                  {{ examInfo.createUser }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 发布时间 </el-col>
                <el-col :span="20">
                  {{ examInfo.createTime | transfermDate }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 失效时间 </el-col>
                <el-col :span="20">
                  {{ examInfo.failureTime | transfermDate }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 归档方式 </el-col>
                <el-col :span="20">
                  {{ examInfo.examFile | transfermExamFile }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 计时选项 </el-col>
                <el-col :span="20">
                  <div v-if="examInfo.timingType == '1'">
                    考试时长：{{ examInfo.timingStartTime }}
                  </div>
                  <div v-if="examInfo.timingType == '2'">
                    开考时间：{{ examInfo.timingStartTime }} 结束时间：{{
                      examInfo.timingEndTime
                    }}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 归档方式 </el-col>
                <el-col :span="20">
                  {{ examInfo.achievementType | transfermAchievementType }}
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"> 出题方式 </el-col>
                <el-col :span="20">
                  {{ examInfo.assignTopic | transfermAssignTopic }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4"> 分数设置 </el-col>
                <el-col :span="20">
                  {{ examInfo.fractionType | transfermFractionType }}
                </el-col>
              </el-row>
            </el-main>

            <el-main v-if="showStatistic">
              <div class="statistic_table">
                <table>
                  <tr>
                    <td>应考人数</td>
                    <td>{{ this.chartData.enrollNum }}</td>
                    <td>实考人数</td>
                    <td>{{ this.chartData.examNum }}</td>
                    <td>通过人数</td>
                    <td>{{ this.chartData.completeNum }}</td>
                  </tr>
                  <tr>
                    <td>及格分</td>
                    <td>{{ this.chartData.passingMark }}</td>
                    <td>最高分</td>
                    <td>{{ this.chartData.maxScores }}</td>
                    <td>最低分</td>
                    <td>{{ this.chartData.minScores }}</td>
                  </tr>
                </table>
              </div>

              <div class="statistic_div">
                <div>
                  <el-table
                    height=" calc(100vh - 350px) "
                    ref="multipleTable"
                    :data="datatable"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column prop="score" label="分数段" width="70">
                    </el-table-column>
                    <el-table-column prop="num" label="人数" width="60">
                    </el-table-column>
                  </el-table>
                </div>
                <div>
                  <ExamState :data="option"></ExamState>
                </div>
                <div class="cb"></div>
              </div>
            </el-main>
            <el-main v-if="showScore">
              <CandidateScore :option="option2"></CandidateScore>
            </el-main>
            <el-main v-if="showTable">
              <el-button @click="exportExcel()"
                >点击导出当前列表的excel</el-button
              >
              <el-table
                height=" calc(100vh - 350px) "
                ref="multipleTable"
                :data="examUserList"
                tooltip-effect="dark"
                style="width: 100%"
                id="out-table"
              >
                <!-- @selection-change="handleSelectionChange" -->
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="userId" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="gonghao" label="工号" width="200">
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="200">
                </el-table-column>
                <el-table-column prop="userScore" label="用户成绩" width="200">
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click="showPapers(scope.row)"
                      type="text"
                      size="small"
                      >查看试卷</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
        <div class="showPaper" v-if="showPaper">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="16">查看试卷</el-col>
                <el-col :span="4">
                  <el-button icon="el-icon-arrow-down" @click="exportWord"
                    >下载当前试卷</el-button
                  >
                </el-col>
                <el-col :span="4">
                  <el-button
                    icon="el-icon-arrow-left"
                    @click="showPapers('off')"
                    >返回</el-button
                  >
                </el-col>
              </el-row>
            </el-header>
            <el-container>
              <el-aside width="200px">
                <div class="question-num">
                  <div v-if="radionQuestions">
                    <div class="page-title">一、单选题</div>
                    <a
                      v-for="(list, index) in radionQuestions"
                      :key="index"
                      @click="Submitid('qid' + list.questionsId)"
                      >{{ index + 1 }}</a
                    >
                    <div class="clearfix"></div>
                  </div>
                  <div v-if="judgeQuestions"></div>
                  <div class="page-title">二、判断题</div>
                  <a
                    v-for="(list, index) in judgeQuestions"
                    :key="index"
                    @click="Submitid('qid' + list.questionsId)"
                    >{{ index + 1 }}</a
                  >
                  <div class="clearfix"></div>
                </div>
              </el-aside>
              <el-main>
                <vuescroll :ops="ops" ref="vs">
                  <div class="question-lists" ref="qlist">
                    <div v-if="radionQuestions">
                      <div class="question-list">
                        <div class="title">第一部分： 单选题</div>
                        <div class="questions">
                          <div
                            v-for="(list, index) in radionQuestions"
                            :key="index"
                            :id="'qid' + list.questionsId"
                            class="questionsDetails"
                          >
                            <div class="tit">
                              第{{ index + 1 }}题、{{
                                list.questionsContent | htmlReg
                              }}
                            </div>
                            <div v-if="list.examineAnswer[0]" class="options">
                              <el-radio-group
                                v-model="list.examineAnswer[0].userAnswer"
                              >
                                <el-radio
                                  v-for="(val, idx) in list.lOptionList"
                                  :key="idx"
                                  :label="val.optionNum"
                                  ><span
                                    >{{ val.optionNum }}、{{
                                      val.optionContent | htmlReg
                                    }}</span
                                  >
                                </el-radio>
                              </el-radio-group>
                            </div>
                            <div v-else class="options">
                              <el-radio-group>
                                <el-radio
                                  v-for="(val, idx) in list.lOptionList"
                                  :key="idx"
                                  :label="val.optionNum"
                                  ><span
                                    >{{ val.optionNum }}、{{
                                      val.optionContent | htmlReg
                                    }}</span
                                  >
                                </el-radio>
                              </el-radio-group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="judgeQuestions">
                      <div class="question-list">
                        <div class="title">第二部分： 判断题</div>
                        <div class="questions">
                          <div
                            v-for="(list, index) in judgeQuestions"
                            :key="index"
                            :id="'qid' + list.questionsId"
                            class="questionsDetails"
                          >
                            <div class="tit">
                              第{{ index + 1 }}题、{{
                                list.questionsContent | htmlReg
                              }}
                            </div>
                            <div v-if="list.examineAnswer[0]" class="options">
                              <el-radio-group
                                v-model="list.examineAnswer[0].userAnswer"
                              >
                                <el-radio
                                  v-for="(val, idx) in list.lOptionList"
                                  :key="idx"
                                  :label="val.optionNum"
                                  >{{ val.optionContent | htmlReg }}
                                </el-radio>
                              </el-radio-group>
                            </div>
                            <div v-else class="options">
                              <el-radio-group>
                                <el-radio
                                  v-for="(val, idx) in list.lOptionList"
                                  :key="idx"
                                  :label="val.optionNum"
                                  >{{ val.optionContent | htmlReg }}
                                </el-radio>
                              </el-radio-group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </vuescroll>
              </el-main>
            </el-container>
          </el-container>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ExamState from '../panel/ExamState.vue'
import vuescroll from 'vuescroll'
import CandidateScore from '../charts/CandidateScore.vue'
import JSZipUtils from 'jszip-utils'
// import JSZip from 'jszip'
import JSZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
// import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: {
    ExamState,
    CandidateScore,
    vuescroll
  },
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {
          keepShow: true,
          background: '#c1c1c1',
          opacity: 0.5
        }
      },
      idx: 0,
      exam: [],
      radionQuestions: [],
      judgeQuestions: [],
      transQuestions: {},
      transQuestions2: {},
      userInfo: [],
      showPaper: false,
      examInfo: {},
      showExaminfo: true,
      showStatistic: false,
      showScore: false,
      showTable: false,
      datadetail: {},
      examUserList: '',
      chartData: [],
      option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: []
        }]

      },
      datatable: [],
      option2: {
        yAxis: {
          type: 'category',
          data: []
        },
        xAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'bar',
          name: '分数'
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          containLabel: true

        }
      },
      barchart: {}
    }
  },
  created() {
    this.datadetail = this.$route.query

    this.getExamInfo()
    this.getExamReport()
  },
  mounted() {

  },
  computed: {
    check(val) {

    }
  },
  methods: {
    // 点击导出word
    exportWord() {
      const _this = this
      _this.integration()
      _this.idx = 0
      JSZipUtils.getBinaryContent('tempb.docx', function (error, content) {
        // 抛出异常
        if (error) {
          throw error
        }
        // 创建一个JSZip实例，内容为模板的内容
        let zip = new JSZip(content)
        // 创建并加载docxtemplater实例对象
        let doc = new Docxtemplater().loadZip(zip)
        // 设置模板变量的值
        doc.setData({
          question: _this.transQuestions,
          question2: _this.transQuestions2,
          examName: _this.exam.examName,
          userName: _this.userInfo.userName,
          userScore: _this.userInfo.userScore
        })
        try {
          // 用模板变量的值替换所有模板变量
          doc.render()
        } catch (error) {
          // 抛出异常
          // let e = {
          //   message: error.message,
          //   name: error.name,
          //   stack: error.stack,
          //   properties: error.properties,
          // }
          this.$message.error('导出报表失败')
          throw error
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, _this.userInfo.userName + '的试卷.docx')
      })
    },
    // 整合试卷重新生成数组
    integration() {
      const that = this

      that.transQuestions2 = JSON.parse(JSON.stringify(that.judgeQuestions)) // 解决赋值修改原变量问题
      that.transQuestions = JSON.parse(JSON.stringify(that.radionQuestions)) // 解决赋值修改原变量问题

      for (const key in that.transQuestions) {
        that.idx++
        that.transQuestions[key].index = Number(key) + 1
        that.transQuestions[key].questionsContent = that.transQuestions[key].questionsContent.replace(/<[^>]+>/g, ' ')
        that.transQuestions[key].questionsContent = that.transQuestions[key].questionsContent.replace(/&nbsp;/ig, '')
        if (that.transQuestions[key].examineAnswer[0]) {
          that.transQuestions[key].examineAnswer = that.transQuestions[key].examineAnswer[0].userAnswer
        } else {
          that.transQuestions[key].examineAnswer = ''
        }

        let tempA = that.transQuestions[key].lOptionList
        for (const i in tempA) {
          tempA[i].optionContent = tempA[i].optionContent.replace(/<[^>]+>/g, ' ')
          tempA[i].optionContent = tempA[i].optionContent.replace(/&nbsp;/ig, '')
        }
      }
      for (const key in that.transQuestions2) {
        that.transQuestions2[key].index = that.idx + Number(key) + 1
        // that.transQuestions2[key].examineAnswer[0].userAnswer === 'A' ? that.transQuestions2[key].examineAnswer[0].userAnswer = '对' : that.transQuestions2[key].examineAnswer[0].userAnswer = '错'
        that.transQuestions2[key].questionsContent = that.transQuestions2[key].questionsContent.replace(/<[^>]+>/g, ' ')
        that.transQuestions2[key].questionsContent = that.transQuestions2[key].questionsContent.replace(/&nbsp;/ig, '')
        if (that.transQuestions2[key].examineAnswer[0]) {
          that.transQuestions2[key].examineAnswer = that.transQuestions2[key].examineAnswer[0].userAnswer
        } else {
          that.transQuestions2[key].examineAnswer = ''
        }

        let tempA = that.transQuestions2[key].lOptionList
        for (const i in tempA) {
          tempA[i].optionContent = tempA[i].optionContent.replace(/<[^>]+>/g, ' ')
          tempA[i].optionContent = tempA[i].optionContent.replace(/&nbsp;/ig, '')
          // tempA[i].optionNum === 'A' ? tempA[i].optionNum = '对' : tempA[i].optionNum = '错'
        }
      }
    },
    // 试卷跳转
    Submitid(key) {
      // 获取点击的按钮对应页面的id
      const vs = this.$refs['vs']
      vs.scrollIntoView(
        '#' + key,
        500,
        'easeInQuad'
      )
    },
    // 显示试卷
    showPapers(row) {
      if (row === 'off') {
        this.showPaper = !this.showPaper
      } else {
        this.showPaper = !this.showPaper
        // console.log(row)
        this.getPaper(row)
      }
    },
    handleClick(row) {
      console.log(row)
    },
    basicInfo() {
      this.showScore = false
      this.showStatistic = false
      this.showExaminfo = true
      this.showTable = false
    },
    stateInfo() {
      this.showStatistic = true
      this.showExaminfo = false
      this.showScore = false
      this.showTable = false
    },
    scoreInfo() {
      this.showStatistic = false
      this.showExaminfo = false
      this.showScore = true
      this.showTable = false
    },
    scoreTable() {
      this.showStatistic = false
      this.showExaminfo = false
      this.showScore = false
      this.showTable = true
    },
    async getExamReport() {
      const {
        data: res
      } = await this.$http.post('/manager/lStatistic/examReport', {
        id: this.datadetail.examId,
        num: 1
      })
      if (res.state !== 200) {
        this.chartData = []
        return this.$message.error('操作失败！')
      } else {
        this.chartData = res.data
         res.data.examUserList.forEach(res => {
            res.gonghao = 'QG22' + res.userId
          })
        this.examUserList = res.data.examUserList
        for (var i = 0; i < res.data.examUserList.length; i++) {
          this.option2.series[0].data.push(res.data.examUserList[i].userScore)
          this.option2.yAxis.data.push(res.data.examUserList[i].userName)
        }

        this.option.xAxis.data = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59',
          '60-69', '70-79', '80-89', '90-100'
        ]
        for (var i = 0; i < this.option.xAxis.data.length; i++) {
          this.option.series[0].data.push(this.chartData.reportList[0][this.option.xAxis.data[i]])
        }
        this.datatable.push({
          score: '0-9',
          num: this.chartData.reportList[0]['0-9']
        })
        this.datatable.push({
          score: '10-19',
          num: this.chartData.reportList[0]['10-19']
        })
        this.datatable.push({
          score: '20-29',
          num: this.chartData.reportList[0]['20-29']
        })
        this.datatable.push({
          score: '30-39',
          num: this.chartData.reportList[0]['30-39']
        })
        this.datatable.push({
          score: '40-49',
          num: this.chartData.reportList[0]['40-49']
        })
        this.datatable.push({
          score: '50-59',
          num: this.chartData.reportList[0]['50-59']
        })
        this.datatable.push({
          score: '60-69',
          num: this.chartData.reportList[0]['60-69']
        })
        this.datatable.push({
          score: '70-79',
          num: this.chartData.reportList[0]['70-79']
        })
        this.datatable.push({
          score: '80-89',
          num: this.chartData.reportList[0]['80-89']
        })
        this.datatable.push({
          score: '90-100',
          num: this.chartData.reportList[0]['90-100']
        })
      }
    },
    async getPaper(row) { // 获取试卷
      this.userInfo = row
      const {
        data: res
      } = await this.$http.get('/learn/myexam/myExamDetail?userId=' + row.userId + '&examId=' + row.examId)
      this.radionQuestions = res.data.examQuestions.radio
      this.judgeQuestions = res.data.examQuestions.judge
      this.exam = res.data.exam
    },
    async getExamInfo() {
      const {
        data: res
      } = await this.$http.post('/manager/lStatistic/examInfo', {
        id: this.datadetail.examId
      })
      if (res.state !== 200) {
        this.tableData = []
        return this.$message.error('操作失败！')
      } else {
        this.examInfo = res.data
        console.log(this.examInfo)
        // console.log(res)
        // return this.$message.success('操作成功！')
      }
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
        saveAs(
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
    htmlReg(val) {
      const amsg = val.replace(/<[^>]+>/g, '') // 去除HTML Tag
      const msg = amsg.replace(/&nbsp;/ig, '')
      return msg
    },
    transformTf(val) {
      if (val === 'A') {
        return '对'
      } else {
        return '错'
      }
    }
  }

}
</script>
<style scoped>
.showPaper {
  width: calc(100% - 220px);
  height: calc(100vh - 130px);
  position: fixed;
  top: 68px;
  left: 200px;
  z-index: 99;
  background: #fff;
}
.showPaper .el-container {
  height: 100%;
}
.showPaper .el-header {
  background-color: #d3dce6;
  line-height: 60px;
}

.showPaper .el-header .el-col:nth-child(3) {
  text-align: right;
}
.showPaper .el-aside {
  color: #333;
  text-align: center;
}
.showPaper .el-main {
  color: #333;
  text-align: center;
  height: calc(100% - 60px);
}
.showPaper .page-title {
  width: 100%;
  height: 30px;
  background: #efefef;
  margin-top: 10px;
  line-height: 30px;
  text-indent: 10px;
}
.question-num a {
  display: block;
  float: left;
  border: 1px solid #d1d1d1;
  text-align: center;
  margin-right: 5px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-top: 5px;
  color: #333;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}
.showPaper .clearfix {
  clear: both;
  font-size: 0;
  line-height: 0;
  height: 0;
}
.question-list .title {
  height: 30px;
  line-height: 30px;
  background: #e7f9e3;
  border: 1px solid #b8e7b3;
  border-radius: 8px;
}
.question-list .tit {
  min-height: 30px;
  height: auto !important;
  height: 30px;
  background: #efefef;
  margin-top: 10px;
  line-height: 30px;
  text-align: left;
  text-indent: 10px;
  font-weight: normal;
  padding: 0 10px;
  font-size: 14px;
  position: relative;
}
.question-list .el-radio {
  display: block;
  font-size: 16px;
  line-height: 24px;
}
.question-list .el-radio .el-radio__label span {
  display: inline-block;
}
.questionsDetails .options {
  text-align: left;
  padding-left: 10px;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
