<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examlist' }"
        >考试归档</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->
        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-col :span="5">
              <el-form-item label="考次名称">
                <el-input
                  v-model="queryInfo.examName"
                  placeholder="考次名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="发布状态">
                <el-select
                  v-model="queryInfo.releaseState"
                  placeholder="请选择"
                >
                  <el-option label="未发布" value="0"></el-option>
                  <el-option label="已发布" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col :span="11">
            <el-button icon="el-icon-search" @click="getDataList" type="primary"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="reset"
              type="primary"
              >重置</el-button
            >
            <el-button icon="el-icon-plus" @click="addData" type="primary"
              >添加考次</el-button
            >
            <el-button icon="el-icon-plus" @click="publish" type="primary"
              >发布考次</el-button
            >
          </el-col>
        </el-row>
        <div class="space"></div>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <!--  <el-button icon="el-icon-plus" @click="addNode" type="primary">添加子分类</el-button>
           <el-button icon="el-icon-edit-outline" @click="editNode" type="primary">修改分类</el-button>
            <el-button icon="el-icon-delete" @click="delNode = true" type="primary">删除分类</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <!-- 查询树 类别： 母婴护理 职业道德 法律知识 服务礼仪等-->
          <!-- <el-aside class="list_tree" style="width: fit-content">
            <el-tree
              :default-expand-all="true"
              :data="treedata"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :expand-on-click-node="false"
            >
            </el-tree>
          </el-aside> -->
          <el-main class="list_body">
            <el-table
              height=" calc(100vh - 400px) "
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="examId" label="序号"> </el-table-column>
              <el-table-column prop="examName" label="考次名称">
              </el-table-column>
              <el-table-column prop="examCode" label="考次编号">
              </el-table-column>
              <el-table-column prop="totalPoints" label="试卷总分">
              </el-table-column>
              <el-table-column prop="passingMark" label="及格分数">
              </el-table-column>
              <el-table-column prop="releaseState" label="发布状态">
                <template slot-scope="scope">{{
                  scope.row.releaseState | transformState
                }}</template>
              </el-table-column>
              <el-table-column prop="type" label="考试类型">
                <template slot-scope="scope">{{
                  scope.row.type | transformType
                }}</template>
              </el-table-column>
              <el-table-column prop="releaseState" label="允许查看">
                <template slot-scope="scope">{{
                  scope.row.isExaminee | fransfermView
                }}</template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="editDetail(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="deleteOrganization(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                  <el-button
                    v-if="scope.row.type === '1'"
                    type="text"
                    size="small"
                    @click="showPapers(scope.row)"
                    >查看试卷</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[1, 2, 5, 8]"
              :page-size="queryInfo.rows"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
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
              <el-button icon="el-icon-arrow-left" @click="showPapers('off')"
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
                        <div class="options">
                          <el-radio-group v-model="list.questionsAnswer">
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
                        <div class="options">
                          <el-radio-group v-model="list.questionsAnswer">
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
    <el-dialog title="" :visible.sync="delNode" width="30%">
      <span>确定要删：{{ currentNode.examSortName }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delNode = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteNode">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除：{{ supposeDelete.examName }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
import JSZipUtils from 'jszip-utils'
// import JSZip from 'jszip'
import JSZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
export default {
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
      delNode: false,
      supposeDelete: {},
      dialogVisible: false,
      multipleSelection: [],
      showPaper: false,
      defaultProps: {
        children: 'chilLExamSort',
        label: 'examSortName'
      },
      treedata: [],
      queryInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      total: 0,
      currentNode: {
        examSortId: 0
      }
    }
  },
  components: {
    vuescroll
  },
  created() {
    this.getDataTree()
    this.getDataList()
  },
  methods: {
    // 点击导出word
    exportWord() {
      const _this = this
      _this.integration()
      _this.idx = 0
      JSZipUtils.getBinaryContent('tempa.docx', function (error, content) {
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
          examName: _this.exam.examName
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
        saveAs(out, '试卷.docx')
      })
    },
    // 整合试卷重新生成数组
    integration() {
      const that = this
      that.transQuestions2 = that.judgeQuestions
      that.transQuestions = that.radionQuestions
      for (const key in that.transQuestions) {
        that.idx++
        that.transQuestions[key].index = Number(key) + 1
        that.transQuestions[key].questionsContent = that.transQuestions[key].questionsContent.replace(/<[^>]+>/g, '')
        that.transQuestions[key].questionsContent = that.transQuestions[key].questionsContent.replace(/&nbsp;/ig, '')
        let tempA = that.transQuestions[key].lOptionList
        for (const i in tempA) {
          tempA[i].optionContent = tempA[i].optionContent.replace(/<[^>]+>/g, '')
          tempA[i].optionContent = tempA[i].optionContent.replace(/&nbsp;/ig, '')
        }
      }
      for (const key in that.transQuestions2) {
        that.transQuestions2[key].index = that.idx + Number(key) + 1
        // that.transQuestions2[key].questionsAnswer === 'A' ? that.transQuestions2[key].questionsAnswer = '对' : that.transQuestions2[key].questionsAnswer = '错'
        that.transQuestions2[key].questionsContent = that.transQuestions2[key].questionsContent.replace(/<[^>]+>/g, '')
        that.transQuestions2[key].questionsContent = that.transQuestions2[key].questionsContent.replace(/&nbsp;/ig, '')
        let tempA = that.transQuestions2[key].lOptionList
        for (const i in tempA) {
          tempA[i].optionContent = tempA[i].optionContent.replace(/<[^>]+>/g, '')
          tempA[i].optionContent = tempA[i].optionContent.replace(/&nbsp;/ig, '')
          // tempA[i].optionNum === 'A' ? tempA[i].optionNum = '对' : tempA[i].optionNum = '错'
        }
      }
    },
    // 试卷跳转
    Submitid(key) {
      // 获取点击的按钮对应页面的id
      // console.log(key)
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
        this.getPaper(row.examId)
      }
    },
    /* 生成考试习题 */
    publish() {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        // if (this.multipleSelection[i].releaseState == "0") {
        this.releaseExam(this.multipleSelection[i])
        // }
      }
      // this.releaseExam(this.multipleSelection[0])
    },
    async releaseExam(e) {
      const {
        data: res
      } = await this.$http.get('/manager/exam/release?id=' + e.examId +
        '&releaseState=1&examFile=1')
      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.$message.success('发布考试题成功')
      }
    },
    async confirmDeleteNode() {
      const {
        data: res
      } = await this.$http.post('/manager/esort/del', {
        examSortId: this.currentNode.examSortId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.currentNode = {
          examSortId: 0
        }
        this.queryInfo.parentId = null
        this.getDataList()
        this.getDataTree()
        this.delNode = true
        return this.$message.success('操作成功！')
      }
    },
    editNode() {
      this.$router.push({
        path: '/examtypeedit',
        query: {
          row: this.currentNode
        }
      })
    },
    addNode() {
      this.$router.push({
        path: '/examtypecreate',
        query: {
          parent: this.currentNode.examSortId
        }
      })
    },
    handleNodeClick(data) {
      this.queryInfo.examSortId = data.examSortId
      this.currentNode = data.examSortId
      // console.log('111111111111', data.examSortId, this.queryInfo.examSortId, this.queryInfo)
      // if (data.parentNode == 0) this.queryInfo.examSortId = null
      this.getDataList()
    },
    async getDataTree() {
      const {
        data: res
      } = await this.$http.get('/manager/esort/tree?id=' + 0)
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.treedata = res.data
        console.log(this.treedata)
      }
    },
    async getDataList() {
      const {
        data: res
      } = await this.$http.post('/manager/exam/list', this.queryInfo)
      if (res.state !== 200) {
        this.total = 0
        this.tableData = []
      } else {
        this.total = res.count
        this.tableData = res.data
      }
    },
    async getPaper(row) { // 获取试卷
      const {
        data: res
      } = await this.$http.get('/learn/myexam/getExamPaper?examId=' + row)
      this.radionQuestions = res.data.examQuestions.radio
      this.judgeQuestions = res.data.examQuestions.judge
      this.exam = res.data.exam
      // console.log(res)
    },
    reset() {
      var temp = this.queryInfo
      this.queryInfo = {}
      this.queryInfo.rows = temp.rows
      this.queryInfo.page = temp.page
      this.getDataList()
    },
    async RemoveData() {
      const {
        data: res
      } = await this.$http.post('/manager/exam/del', {
        examId: this.supposeDelete.examId
      })

      if (res.state !== 200) {
        return this.$message.error('操作失败！')
      } else {
        this.getDataList()
        this.supposeDelete = {}
        return this.$message.success('操作成功！')
      }
    },
    confirmDelete() {
      this.dialogVisible = false
      this.RemoveData()
    },
    editDetail(row) {
      this.$router.push({
        path: '/examedit',
        query: {
          row: row,
          parent: this.currentNode
        }
      })
    },
    deleteOrganization(row) {
      this.supposeDelete = row
      this.dialogVisible = true
    },
    addData() {
      this.$router.push({
        path: '/examcreate',
        query: {
          parent: this.currentNode.examSortId
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 监听rows改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.rows = newSize
      this.getDataList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getDataList()
    }
  },
  filters: {
    transformDate: function (date) {
      if (date !== null) {
        return date.split('T')[0]
      }
    },
    transformState: function (state) {
      if (state === '1') return '已发布'
      else return '未发布'
    },
    transformType: function (state) {
      if (state === '1') return '考试'
      else return '练习'
    },
    fransfermView: function (val) {
      if (val === '1') return '允许'
      else return '不允许'
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
