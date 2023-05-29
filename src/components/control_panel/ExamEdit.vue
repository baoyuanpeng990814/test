<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/examlist' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/examedit' }">编辑考次</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑考次
              &nbsp;&nbsp;
              <el-button @click="examStrategyDialog = true">设置出题策略</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.push('/examlist')">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form :model="examDetail" :rules="rules" ref="examDetail" label-width="100px"
                class="demo-ruleForm login_form">

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="examCoverUrl">
                      <el-input v-model="examDetail.examCoverUrl"></el-input>
                      <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                        :show-file-list="false">
                        <img v-if="examDetail.examCoverUrl" :src="examDetail.examCoverUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="编号" prop="examCode">
                      <el-input v-model="examDetail.examCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="examSortId">
                      <el-input v-model="twin.examSortName" @focus="showOd2=true" :readonly="true"></el-input>
                      <!-- <el-input v-model="examDetail.examSortId"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="成绩公布" prop="achievementType">
                      <el-radio v-model="examDetail.achievementType" label="1">考试结束后</el-radio>
                      <el-radio v-model="examDetail.achievementType" label="2">指导时间</el-radio>
                      <el-radio v-model="examDetail.achievementType" label="3">不公示</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="归档状态" prop="examFile">
                      <el-radio v-model="examDetail.examFile" label="0">自动归档</el-radio>
                      <el-radio v-model="examDetail.examFile" label="1">手动归档</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="次数限制" prop="examFrequency">
                      <el-input-number v-model="examDetail.examFrequency"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考次名称" prop="examName">
                      <el-input v-model="examDetail.examName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考试须知" prop="examNotice">
                      <quill-editor ref="text" v-model="examDetail.examNotice" class="myQuillEditor" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="试卷首语" prop="examPrologue">
                      <quill-editor ref="text" v-model="examDetail.examPrologue" class="myQuillEditor" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="交卷限制" prop="examSubmit">
                      <el-input-number v-model="examDetail.examSubmit"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="失效时间" prop="failureTime">
                      <el-date-picker v-model="examDetail.failureTime" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="失效时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="考生查看详情" prop="isExaminee">
                      <el-radio v-model="examDetail.isExaminee" label="0">不允许</el-radio>
                      <el-radio v-model="examDetail.isExaminee" label="1">允许</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <div @mousedown="orgTarget = false">
                  <el-col :span="24">
                    <el-form-item label="主办单位" prop="organizationId">
                      <el-input v-model="twin.organizationName" @focus="showOd=true" :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                  </div>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布状态" prop="releaseState">
                      <el-radio v-model="examDetail.releaseState" label="0">未发布</el-radio>
                      <el-radio v-model="examDetail.releaseState" label="1">已发布</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="计时方式" prop="timingType">
                      <el-radio v-model="examDetail.timingType" label="1">答题时间</el-radio>
                      <el-radio v-model="examDetail.timingType" label="2">开始考试时间交卷时间</el-radio>
                      <el-radio v-model="examDetail.timingType" label="3">按题计时</el-radio>
                      <el-radio v-model="examDetail.timingType" label="4">不计时</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="examDetail.timingType==1">
                  <el-col :span="24">
                    <el-form-item label="考试时长" prop="timingStartTime">

                      <el-input-number :controls="false" :min="0" v-model="examDetail.timingStartTime">
                      </el-input-number>

                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row v-if="examDetail.timingType==2">
                  <el-col :span="12">
                    <el-form-item label="开始时间" prop="timingStartTime">
                      <el-date-picker v-model="examDetail.timingStartTime" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结束时间" prop="timingEndTime">
                      <el-date-picker v-model="examDetail.timingEndTime" type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类" prop="type">
                      <el-radio v-model="examDetail.type" label="1">考试</el-radio>
                      <el-radio v-model="examDetail.type" label="2">练习</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>

                 <el-row>
                   <el-switch v-model="userTarget" active-color="#13ce66" inactive-color="#ff4949" active-text="指定发布对象"
                     inactive-text="默认">
                   </el-switch>
                 </el-row>

                 <!-- 当是专题培训的时候选择发布对象-->
                 <div v-show="userTarget">
                   <el-row>
                     <el-col :span="24">
                       <el-form-item label="发布对象分类" prop="lExamTarget">
                         <el-radio v-model="lExamTarget.examTargetType	" label="0">机构</el-radio>
                         <el-radio v-model="lExamTarget.examTargetType	" label="1">分组</el-radio>
                       </el-form-item>
                     </el-col>
                   </el-row>
                   <!-- 当发布对象类型是0是弹出发布对象的接口-->
                   <el-row v-show="lExamTarget.examTargetType	 == '0'">
                     <el-col :span="24">
                       <div @mousedown="orgTarget = true">
                         <el-form-item label="发布机构对象" prop="lExamTarget">

                           <el-input v-model="twin.courseCompanyName" @focus="showOd=true" suffix-icon="el-icon-search"
                             :readonly="true"></el-input>

                         </el-form-item>
                       </div>
                     </el-col>
                   </el-row>
                   <!-- -->
                   <el-row v-show="lExamTarget.examTargetType	 == '1'">
                     <el-col :span="24">
                       <div>
                         <el-form-item label="发布分组对象" prop="groupingId">
                           <el-input v-model="twin.groupingName" @focus="showOd3=true"></el-input>
                         </el-form-item>
                       </div>
                     </el-col>
                   </el-row>

                 </div>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation">提交</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>

        </div>
      </el-card>
    </div>

    <!-- 出题策略弹出框  用于生成试卷-->
    <el-dialog title="出题策略" :visible.sync="examStrategyDialog" :fullscreen="false">
      <el-container>
        <el-main>
          <el-form :model="strategydetail" :rules="sdrules" ref="strategydetail" label-width="100px"
            class="demo-ruleForm login_form">

            <el-row>
              <el-col :span="24">
                <el-form-item label="难度" prop="difficulty">
                  <el-radio v-model="strategydetail.difficulty" label="1">容易</el-radio>
                  <el-radio v-model="strategydetail.difficulty" label="2">较易</el-radio>
                  <el-radio v-model="strategydetail.difficulty" label="3">一般</el-radio>
                  <el-radio v-model="strategydetail.difficulty" label="4">较难</el-radio>
                  <el-radio v-model="strategydetail.difficulty" label="5">困难</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="知识点" prop="knowledge">
                  <el-input v-model="strategydetail.knowledge"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                出题策略
                <el-form-item>

                  <el-table :data="lExtractQuestionsList" border style="width: 100%">
                    <el-table-column prop="extractQuestionsId" label="抽题序号" >
                    </el-table-column>
                    <el-table-column prop="questionsTypeId" label="题型" >
                    </el-table-column>
                    <el-table-column prop="number" label="数量">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button type="text" size="medium" @click = "delStrategy(scope.row.extractQuestionsId)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="选择试题分类" prop="questionsSortId">
                  <el-input @focus="showQc = true" v-model="twinqs" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 题型类型数量-->
            <!-- 出题策略列表-->
            <div class="question_type_list" v-if="strategydetail.questionsSortId!=0">
              <el-row v-for="l in strategydetail.lExtractQuestionsList" :key="l.id">
                <el-col :span="24">
                  <el-form-item :label="l.questionsTypeName" prop="typeNum">
                    <el-input-number :controls="false" :step="1" v-model="l.number" :min="0" :max="l.count">
                    </el-input-number>
                    / {{l.count}}

                    <span v-if="strategydetail.fractionType=='2'">
                      &nbsp;&nbsp;分数 <el-input-number :controls="false" :min="0" v-model="l.questionsFraction">
                      </el-input-number>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>

            <el-row>
              <el-col :span="24">
                <el-form-item label="出题方式" prop="assignTopic">
                  <el-radio v-model="strategydetail.assignTopic" label="1">固定试卷</el-radio>
                  <el-radio v-model="strategydetail.assignTopic" label="2">随机试卷</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="strategydetail.assignTopic=='2'">
              <el-col :span="24">
                <el-form-item label="随机试卷数" prop="randomSeveral">
                  <el-input-number v-model="strategydetail.randomSeveral"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="试题总数" prop="examTotal">
                  <el-input v-model="strategydetail.examTotal" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="出题方式" prop="fractionType">
                  <el-radio v-model="strategydetail.fractionType" label="1">使用题库试题分数</el-radio>
                  <el-radio v-model="strategydetail.fractionType" label="2">指定题型分数</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="试卷总分" prop="totalPoints">
                  <el-input-number v-model="strategydetail.totalPoints"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="及格分数" prop="passingMark">
                  <el-input-number v-model="strategydetail.passingMark"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20" :offset="8">

                <el-button type="primary" @click="addStrategy()">新增出题策略</el-button>
              </el-col>
            </el-row>

            <el-row style="margin-top: 15px;">
              <el-col :span="20" :offset="8">
                <el-button type="primary" @click="setPaper()">生成试卷</el-button>
              </el-col>
            </el-row>

          </el-form>
        </el-main>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-button @click="examStrategyDialog = false">关 闭</el-button>

      </span>
    </el-dialog>
    <!-- 组织机构树弹窗 试题类型树弹窗-->
    <OrganizationPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></OrganizationPanel>
    <ExamTypePanel :show="showOd2" @choose="getOd2" @turnOff="(e) => showOd2=e"></ExamTypePanel>
    <QuestionCategoryPanel :show="showQc" @choose="chooseQc" @turnOff="(e) => showQc = e"></QuestionCategoryPanel>

    <!-- 分组筛选列表-->
    <GroupPanel :show="showOd3" @choose="getOd3" @turnOff="(e) => showOd3=e"></GroupPanel>
  </div>

</template>

<script>
  import OrganizationPanel from '../panel/OrganizationPanel.vue'
  import QuestionCategoryPanel from '../panel/OrganizationCategoryPanel.vue'
  import ExamTypePanel from '../panel/ExamTypePanel.vue'
  import GroupPanel from '../panel/GroupPanel.vue'
  import {
    quillEditor
  } from 'vue-quill-editor'
  export default {
    components: {
      OrganizationPanel,
      QuestionCategoryPanel,
      ExamTypePanel,
      GroupPanel

    },
    data() {
      return {
        userTarget: false,
        showOd: false, //  组织结构弹窗
        showOd2: false, // 考试分类接口弹窗
        showOd3: false, // 分组结构弹窗

        twin: {
          /* 主板单位名字 */
          organizationName: '',
          examSortName: '',
          /* 发布考试指定公司机构名 */
          courseCompanyName: ''
          /* 发布考试指定分组名 */
        },
        orgTarget: false,
        typeNum: 1,
        lExamTarget: {
          examTargetType: '',
          examTarget: ''
        },
        examStrategyDialog: false, // false,

        showQc: false,

        strategydetail: {
          assignTopic: '1',
          description: '',
          examId: 0,
          examTotal: 0,
          fractionType: '1',
          difficulty: '1',
          lExtractQuestionsList: [],
          questionsSortId: 0,
          passingMark: 5,
          randomSeveral: 1,
          totalPoints: 20,
          knowledge: ''
        },
        lExtractQuestionsList: [],
        questionCatesBank: [],
        questionCates: [],
        twinqs: '',
        sdrules: {},
        examDetail: {},
        rules: {
          examCode: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examCoverUrl: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examFile: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examFrequency: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examName: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examNotice: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examPrologue: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          examSubmit: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          failureTime: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          isExaminee: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          organizationId: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          releaseState: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          timingType: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
        uploadUrl: this.$serverURL + 'common/uploadCover'
      }
    },
    created() {
      this.examDetail = this.$route.query.row
      /* 当存在指定发布对象的时候把指定发布按钮打开 */
      if (this.examDetail.lExamTarget) {
        this.userTarget = true
        this.lExamTarget = this.examDetail.lExamTarget
        this.twin.courseCompanyName = this.lExamTarget.examTarget
        this.twin.groupingName = this.lExamTarget.examTarget
      }

      // 出题策略详情id
      this.strategydetail.examId = this.examDetail.examId

      for (var i = 0; i < this.strategydetail.lExtractQuestionsList.length; i++) {
        this.strategydetail.lExtractQuestionsList[i].examId = this.examDetail.examId
      }
      /* 判断传参 */
      // 内容详情 把examSortName: "服务礼仪" organizationName ："联合工会" 分类名字赋值到twin里
      if (this.$route.query.twin != null) { 
        this.twin = this.$route.query.twin
      } else {
        this.twin.organizationName = this.examDetail.organizationName
        this.twin.examSortName = this.examDetail.examSortName
      }
      /* c 是否是在创建中进入，展开出题模式的弹窗 */
      if (this.$route.query.c != null) {
        this.examStrategyDialog = this.$route.query.c
      }

      this.strategydetail = this.examDetail

      if (this.examDetail.questionsSortId != null) {
        this.getQuetstionSort()
      }
      this.getStrategy()
      // this.$forceUpdate()
    },
    methods: {
      async getQuetstionSort() {
        /* 获取试题分类列表 parentNode： 父分类id questionsSortName：试题分类名称 */
        const {
          data: res
        } = await this.$http.post('/manager/qsort/list', {
          parentNode: 0,
          page: 1,
          rows: 100
        })
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].questionsSortId == this.examDetail.questionsSortId) {
              this.twinqs = res.data[i].questionsSortName
            }
          }
        //  this.getQuestionCateNum(true)
        }
      },
      /* 查询抽题策略 id :	考次id */
      async getStrategy() { // 获取出题策略
        const {
          data: res
        } = await this.$http.get('/manager/exam/eqinfo?id=' + this.examDetail.examId)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.lExtractQuestionsList = res.data
        }
      },
      /* 生成试卷 */
      async setPaper() {
        this.examDetail.lExtractQuestionsList = this.lExtractQuestionsList
        /* this.addStrategy(); */
        // 判读是否有出题策略
         if (this.lExtractQuestionsList.length > 0) {
           const {
             data: res
           } = await this.$http.get('/manager/exam/setPaper?id=' + this.strategydetail.examId)
           if (res.state !== 200) {
             return this.$message.error(res.msg)
           } else {
             this.strategydetail.lExtractQuestionsList = res.data

             return this.$message.success(res.msg)
             /* 生成试卷返回列表，防止多次编辑发布，发布对象增多 */
             $router.push('/examlist')
           }
         } else {
            return this.$message.error('请设置出题策略')
         }
      },
      /* 删除抽题策略 extractQuestionsId :	抽题策略id */
      async delStrategy(id) {
        const {
          data: res
        } = await this.$http.post('/manager/exam/eqdel', { extractQuestionsId: id })
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.getStrategy()

          return this.$message.success(res.msg)
        }
      },
      // 新增抽题测量
      async addStrategy() {
        const {
          data: res
        } = await this.$http.post('/manager/exam/eqadd', this.strategydetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.examDetail.questionsSortId = this.strategydetail.questionsSortId
          // 刷新抽题测量列表
          this.getStrategy()
          return this.$message.success(res.msg)
        }
      },
      handleAvatarSuccess(res, file) {
        this.examDetail.examCoverUrl = res.url
      },
      chooseQc(val) {
        this.strategydetail.questionsSortId = val.questionsSortId
        this.twinqs = val.questionsSortName
        this.getQuestionCateNum(false)
      },
      /* 查询对应题型分类下题的数量 questionsSortId : 题库id  ;knowledge: 知识点 ;  difficulty : 	难度 */
      async getQuestionCateNum(old) { // 获取每种题型各有几道题
        console.log(this.strategydetail.questionsSortId,'2222')
        var url = '/manager/exam/queryNum?questionsSortId=' +
          this.strategydetail.questionsSortId + '&difficulty=' + this.strategydetail.difficulty
        if (this.strategydetail.knowledge != '' && this.strategydetail.knowledge != null) {
          url += '&knowledge=' + this.strategydetail.knowledge
        }
        const {
          data: res
        } = await this.$http.get(url)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          // 如果是修改抽题策略，则获取各题型已选择的数量
          /* "questionsType": 1,  "questionsTypeName": "单选题","questionsType": 2, "questionsTypeName": "多选题","questionsType": 3, "questionsTypeName": "判断题", */
          if (!old) this.strategydetail.lExtractQuestionsList = res.data

          for (var i = 0; i < this.strategydetail.lExtractQuestionsList.length; i++) {
            if (old) {
              this.strategydetail.lExtractQuestionsList[i].questionsTypeName = res.data[i].questionsTypeName
              this.strategydetail.lExtractQuestionsList[i].count = res.data[i].count
            } else {
              this.strategydetail.lExtractQuestionsList[i].examId = this.examDetail.examId
              this.strategydetail.lExtractQuestionsList[i].questionsTypeId = this.strategydetail
                .lExtractQuestionsList[i].questionsType
            }
          }
          this.$forceUpdate()

          this.questionCatesBank = this.questionCates
          // console.log(this.questionCates)
        }
      },
      /* 组织 考试类别 数据导入 */
      getOd(val) {
        if (this.orgTarget) {
          this.lExamTarget.examTarget = val.organizationId
          this.twin.courseCompanyName = val.organizationName
        } else {
          this.examDetail.organizationId = val.organizationId
          this.twin.organizationName = val.organizationName
        }
      },
      getOd2(val) {
        this.examDetail.examSortId = val.examSortId
        this.twin.examSortName = val.examSortName
      },
      getOd3(val) {
        this.lExamTarget.examTarget = val.groupingId.toString()
        this.twin.groupingName = val.groupingName
      },
      // 提交考试修改内容，返回考试列表
      async submitCreation() {
        /* 判断是否是指定发布，如果是把发布对象填充到examDetail里面 */
        if (this.userTarget) {
          this.examDetail.lExamTarget = this.lExamTarget
        } else {
           this.examDetail.lExamTarget = undefined
        }
        const {
          data: res
        } = await this.$http.post('/manager/exam/edit', this.examDetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success('修改成功')
          // this.examDetail.examId = res.data

          this.$router.go(-1)
        }
      }
    },
    watch: {
      lExtractQuestionsList: {
        handler(val) {
          var total = 0
          var c = val
          if (c != null) {
            for (var i = 0; i < c.length; i++) {
              if (c[i].number != null) {
                total += c[i].number
              }
            }
          }

          this.strategydetail.examTotal = total
        },
        deep: true
      }, /* 监考查询条件，重新查询题型数量 */
      'strategydetail.difficulty': {
        handler(newval, old) {
         if (newval != old) {
           this.getQuestionCateNum()
         }
        },
        deep: true
      },
      'strategydetail.knowledge': {
        handler(newval, old) {
          if (newval != old && newval != undefined) {
            this.getQuestionCateNum()
          }
        },
        deep: true
      }
    },
    filters: {
      transformDate: function(date) {
        return date.split('T')[0]
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
