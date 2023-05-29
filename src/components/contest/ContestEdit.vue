<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/contestlist' }"
        >竞赛考试管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/contestedit' }"
        >编辑竞赛考次</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20"
              >编辑考次 &nbsp;&nbsp;
              <el-button @click="contestStrategyDialog = true"
                >设置出题策略</el-button
              >
            </el-col>
            <el-col :span="4">
              <el-button
                icon="el-icon-arrow-left"
                @click="$router.push('/contestlist')"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form
                :model="dataDetail"
                :rules="rules"
                ref="dataDetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="competitionCover">
                      <el-input
                        v-model="dataDetail.competitionCover"
                      ></el-input>
                      <el-upload
                        :on-success="handleAvatarSuccess"
                        class=" mt15 avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                      >
                        <img
                          v-if="dataDetail.competitionCover"
                          :src="dataDetail.competitionCover"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛类型" prop="competitionType">
                      <el-radio v-model="dataDetail.competitionType" label="1"
                        >1理论</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionType" label="2"
                        >2实操
                      </el-radio>
                      <el-radio v-model="dataDetail.competitionType" label="3"
                        >3理论+实操</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属分类" prop="competitionSort">
                      <el-input
                        v-model="twin.competitionSortName"
                        @focus="showOd2 = true"
                        :readonly="true"
                      ></el-input>
                      <!-- <el-input v-model="dataDetail.contestSortId"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 发布对象-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布对象分类" prop="competitionTarget">
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="0"
                        >机构</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="1"
                        >分组</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="2"
                        >用户</el-radio
                      >
                      <el-radio
                        v-model="competitionTarget.competitionTargetType"
                        label="3"
                        >职业</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 当发布对象类型是0是弹出发布对象的接口-->
                <el-row v-show="competitionTarget.competitionTargetType == '0'">
                  <el-col :span="24">
                    <div>
                      <el-form-item
                        label="发布机构对象"
                        prop="competitionTarget"
                      >
                        <el-input
                          v-model="twin.organizationName"
                          @focus="showOd = true"
                          suffix-icon="el-icon-search"
                          :readonly="true"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <!-- -->
                <el-row v-show="competitionTarget.competitionTargetType == '1'">
                  <el-col :span="24">
                    <div>
                      <el-form-item label="发布分组对象" prop="groupingId">
                        <el-input
                          v-model="twin.groupingName"
                          @focus="showOd3 = true"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分数定义" prop="fractionType">
                      <el-radio v-model="dataDetail.fractionType" label="1"
                        >1使用题库试题分数</el-radio
                      >
                      <el-radio v-model="dataDetail.fractionType" label="2"
                        >2指定题型分数</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛状态" prop="competitionState">
                      <el-radio v-model="dataDetail.competitionState" label="1"
                        >1答题阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="2"
                        >2实操阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="3"
                        >3专家评分阶段</el-radio
                      >
                      <el-radio v-model="dataDetail.competitionState" label="4"
                        >4结束</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛标题" prop="competitionName">
                      <el-input v-model="dataDetail.competitionName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="竞赛声明" prop="competitionExplain">
                      <quill-editor
                        ref="text"
                        v-model="dataDetail.competitionExplain"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="参赛次数限制"
                      prop="competitionFrequency"
                    >
                      <el-input-number
                        v-model="dataDetail.competitionFrequency"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="离开页面次数" prop="leavePage">
                      <el-input-number
                        v-model="dataDetail.leavePage"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布状态" prop="releaseState">
                      <el-radio v-model="dataDetail.releaseState" label="0"
                        >未发布</el-radio
                      >
                      <el-radio v-model="dataDetail.releaseState" label="1"
                        >已发布</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布时间" prop="releaseTime">
                      <el-date-picker
                        v-model="dataDetail.releaseTime"
                        type="datetime"
                        placeholder="发布时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="出题方式" prop="assignTopic">
                      <el-radio v-model="dataDetail.assignTopic" label="1"
                        >固定试卷</el-radio
                      >
                      <el-radio v-model="dataDetail.assignTopic" label="2"
                        >随机试卷</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="答题开始时间" prop="timingStartTime">
                      <el-date-picker
                        v-model="dataDetail.timingStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="答题结束时间" prop="timingEndTime">
                      <el-date-picker
                        v-model="dataDetail.timingEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="实操开始时间"
                      prop="operationStartTime"
                    >
                      <el-date-picker
                        v-model="dataDetail.operationStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实操结束时间" prop="operationEndTime">
                      <el-date-picker
                        v-model="dataDetail.operationEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="专家打分开始时间"
                      prop="expertStartTime"
                    >
                      <el-date-picker
                        v-model="dataDetail.expertStartTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="专家打分结束时间" prop="expertEndTime">
                      <el-date-picker
                        v-model="dataDetail.expertEndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation"
                      >提交</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>

    <!-- 出题策略弹出框  用于生成试卷-->
    <el-dialog
      title="出题策略"
      :visible.sync="contestStrategyDialog"
      :fullscreen="false"
    >
      <el-container>
        <el-main>
          <el-form
            :model="strategydetail"
            :rules="sdrules"
            ref="strategydetail"
            label-width="100px"
            class="demo-ruleForm login_form"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="难度" prop="difficulty">
                  <el-radio v-model="strategydetail.difficulty" label="1"
                    >容易</el-radio
                  >
                  <el-radio v-model="strategydetail.difficulty" label="2"
                    >较易</el-radio
                  >
                  <el-radio v-model="strategydetail.difficulty" label="3"
                    >一般</el-radio
                  >
                  <el-radio v-model="strategydetail.difficulty" label="4"
                    >较难</el-radio
                  >
                  <el-radio v-model="strategydetail.difficulty" label="5"
                    >困难</el-radio
                  >
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
                  <el-table
                    :data="competitionQuestionList"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="competitionQuestionId"
                      label="抽题序号"
                    >
                    </el-table-column>
                    <el-table-column prop="competitionTypeId" label="题型">
                      <template slot-scope="scope">{{
                        scope.row.competitionTypeId | transformType
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="number" label="数量">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="medium"
                          @click="delStrategy(scope.row.competitionQuestionId)"
                          >删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="选择试题分类" prop="questionsSortId">
                  <el-input
                    @focus="showQc = true"
                    v-model="twinqs"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 题型类型数量-->
            <!-- 出题策略列表-->
            <div
              class="question_type_list"
              v-if="strategydetail.questionsSortId != 0"
            >
              <el-row
                v-for="l in strategydetail.competitionQuestionList"
                :key="l.id"
              >
                <el-col :span="24">
                  <el-form-item :label="l.questionsTypeName" prop="typeNum">
                    <el-input-number
                      :controls="false"
                      :step="1"
                      v-model="l.number"
                      :min="0"
                      :max="l.count"
                    >
                    </el-input-number>
                    / {{ l.count }}
                    <span>
                      &nbsp;&nbsp;分数
                      <el-input-number
                        :controls="false"
                        :min="0"
                        v-model="l.questionsFraction"
                      >
                      </el-input-number>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-col :span="20" :offset="8">
                <el-button type="primary" @click="addStrategy()"
                  >新增出题策略</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>

      <span slot="footer" class="dialog-footer">
        <el-button @click="contestStrategyDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
    <OrganizationPanel
      :show="showOd"
      @choose="getOd"
      @turnOff="e => (showOd = e)"
    ></OrganizationPanel>
    <ContestTypePanel
      :show="showOd2"
      @choose="getOd2"
      @turnOff="e => (showOd2 = e)"
    ></ContestTypePanel>
    <GroupPanel
      :show="showOd3"
      @choose="getOd3"
      @turnOff="e => (showOd3 = e)"
    ></GroupPanel>
    <QuestionCategoryPanel
      :show="showQc"
      @choose="chooseQc"
      @turnOff="e => (showQc = e)"
    ></QuestionCategoryPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import ContestTypePanel from '../panel/ContestTypePanel.vue'
import GroupPanel from '../panel/GroupPanel.vue'
import QuestionCategoryPanel from '../panel/OrganizationCategoryPanel.vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    OrganizationPanel,
    ContestTypePanel,
    QuestionCategoryPanel,
    GroupPanel
  },
  data() {
    return {
      contestStrategyDialog: false,
      showOd: false,
      showOd2: false,
      showOd3: false, // 分组结构弹窗
      showQc: false,
      twin: {
        organizationName: '',
        competitionSortName: ''
      },
      competitionTarget: {
        competitionTargetType: '',
        competitionTarget: ''
      },
      dataDetail: {
        assignTopic: '', //出题方式 1固定试卷 2随机试卷
        competitionCover: '', //封面
        competitionExplain: '', //说明
        competitionFrequency: '', //参加次数限制
        competitionName: '', //竞赛标题
        competitionSort: '', //竞赛分类
        competitionState: '', //竞赛状态。1答题阶段，2实操阶段 3专家评分阶段 4结束
        competitionTarget: {
          competitionTarget: '', //发布对象
          competitionTargetType: '' //发布对象分类 0机构1分组2用户3职业
        },
        competitionType: '', //竞赛类型 1,理论 2 实操 3 理论+实操
        expertEndTime: '', //专家打分开始时间
        expertStartTime: '', //专家打分结束时间
        fractionType: '', //分数定义 1使用题库试题分数 2指定题型分数
        leavePage: '', //离开页面次数
        operationEndTime: '', //实操开始时间
        operationStartTime: '', //operation_end_time
        randomSeveral: 0, //随机几份试卷，默认为一份（固定试卷不用填）
        releaseState: '', //发布状态 0未发布1已发布
        releaseTime: '', //发布时间
        timingEndTime: '', //答题开始时间
        timingStartTime: '' //答题结束时间
      },

      strategydetail: {
        competitionFraction: '1', // 试题分数
        description: '',
        competitionId: 0,
        contestTotal: 0,
        fractionType: '1',
        difficulty: '1',
        competitionQuestionList: [],
        questionsSortId: 0,
        passingMark: 5,
        randomSeveral: 1,
        totalPoints: 20,
        knowledge: ''
      },
      competitionQuestionList: [],
      twinqs: '',
      sdrules: {},
      rules: {
        assignTopic: [
          {
            required: true,
            message: '出题方式不能为空',
            trigger: 'blur'
          }
        ],
        competitionCover: [
          {
            required: true,
            message: '封面不能为空',
            trigger: 'blur'
          }
        ],
        competitionExplain: [
          {
            required: true,
            message: '说明不能为空',
            trigger: 'blur'
          }
        ],
        competitionFrequency: [
          {
            required: true,
            message: '参赛次数不能为空',
            trigger: 'blur'
          }
        ],
        competitionName: [
          {
            required: true,
            message: '竞赛名称不能为空',
            trigger: 'blur'
          }
        ],
        competitionSort: [
          {
            required: true,
            message: '竞赛分类不能为空',
            trigger: 'blur'
          }
        ],
        competitionState: [
          {
            required: true,
            message: '竞赛状态不能为空',
            trigger: 'blur'
          }
        ],
        competitionTarget: [
          {
            required: true,
            message: '发布对象不能为空',
            trigger: 'blur'
          }
        ],
        competitionType: [
          {
            required: true,
            message: '竞赛模式类型不能为空',
            trigger: 'blur'
          }
        ],
        fractionType: [
          {
            required: true,
            message: '分数定义不能为空',
            trigger: 'blur'
          }
        ],
        releaseTime: [
          {
            required: true,
            message: '发布时间不能为空',
            trigger: 'blur'
          }
        ],
        releaseState: [
          {
            required: true,
            message: '发布状态不能为空',
            trigger: 'blur'
          }
        ],
        leavePage: [
          {
            required: true,
            message: '离开次数不能为空',
            trigger: 'blur'
          }
        ]
      },
      uploadUrl: this.$serverURL + 'common/uploadCover'
    }
  },
  created() {
    this.dataDetail = this.$route.query.row

    this.competitionTarget = this.dataDetail.competitionTarget

    // 出题策略详情id
    this.strategydetail.competitionId = this.dataDetail.competitionId

    for (
      var i = 0;
      i < this.strategydetail.competitionQuestionList.length;
      i++
    ) {
      this.strategydetail.competitionQuestionList[
        i
      ].competitionId = this.dataDetail.competitionId
    }
    /*判断传参 */
    // 内容详情 把contestSortName: "服务礼仪" organizationName ："联合工会" 分类名字赋值到twin里
    if (this.$route.query.twin != null) {
      this.twin = this.$route.query.twin
    } else {
      this.twin.organizationName = this.competitionTarget.competitionTarget
      this.twin.competitionSortName = this.dataDetail.competitionSort
      this.twin.groupingName = this.competitionTarget.competitionTarget
    }
    /* c 是否是在创建中进入，展开出题模式的弹窗*/
    if (this.$route.query.c != null) {
      this.contestStrategyDialog = this.$route.query.c
    }

    /* 查询当前的出题策略*/
    this.getStrategy()
  },
  methods: {
    async getQuetstionSort() {
      /* 获取试题分类列表 parentNode： 父分类id questionsSortName：试题分类名称 */
      const { data: res } = await this.$http.post('/manager/qsort/list', {
        parentNode: 0,
        page: 1,
        rows: 100
      })
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].questionsSortId == this.dataDetail.questionsSortId) {
            this.twinqs = res.data[i].questionsSortName
          }
        }
      }
    },
    /* 查询抽题策略 id :	考次id*/
    async getStrategy() {
      //获取出题策略
      const { data: res } = await this.$http.get(
        '/manager/competition/eqinfo?id=' + this.dataDetail.competitionId
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.competitionQuestionList = res.data
      }
    },
    /* 生成试卷 */

    /* 删除抽题策略 extractQuestionsId :	抽题策略id*/
    async delStrategy(id) {
      const { data: res } = await this.$http.post(
        '/manager/competition/eqdel',
        {
          competitionQuestionId: id
        }
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.getStrategy()

        return this.$message.success(res.msg)
      }
    },
    // 新增抽题测量
    async addStrategy() {
      var add = {}
      add.competitionId = this.strategydetail.competitionId
      add.competitionQuestionList = this.strategydetail.competitionQuestionList

      const { data: res } = await this.$http.post(
        '/manager/competition/eqadd',
        add
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.dataDetail.questionsSortId = this.strategydetail.questionsSortId
        // 刷新抽题测量列表
        this.getStrategy()
        return this.$message.success(res.msg)
      }
    },
    handleAvatarSuccess(res, file) {
      this.dataDetail.contestCoverUrl = res.url
    },
    chooseQc(val) {
      this.strategydetail.questionsSortId = val.questionsSortId
      this.twinqs = val.questionsSortName
      this.getQuestionCateNum(false)
    },
    /* 查询对应题型分类下题的数量 questionsSortId : 题库id  ;knowledge: 知识点 ;  difficulty : 	难度 */
    async getQuestionCateNum(old) {
      //获取每种题型各有几道题
      var url =
        '/manager/competition/queryNum?questionsSortId=' +
        this.strategydetail.questionsSortId +
        '&difficulty=' +
        this.strategydetail.difficulty
      if (
        this.strategydetail.knowledge != '' &&
        this.strategydetail.knowledge != null
      ) {
        url += '&knowledge=' + this.strategydetail.knowledge
      }
      const { data: res } = await this.$http.get(url)
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        //如果是修改抽题策略，则获取各题型已选择的数量把查询题数量注入到出题策略的列表中
        this.strategydetail.competitionQuestionList = res.data
        for (var i = 0; i < res.data.length; i++) {
          this.strategydetail.competitionQuestionList[i].competitionTypeId =
            res.data[i].questionsType
          this.strategydetail.competitionQuestionList[
            i
          ].difficulty = this.strategydetail.difficulty
          this.strategydetail.competitionQuestionList[
            i
          ].knowledge = this.strategydetail.knowledge
          this.strategydetail.competitionQuestionList[
            i
          ].questionsSortId = this.strategydetail.questionsSortId
          this.strategydetail.competitionQuestionList[
            i
          ].competitionId = this.strategydetail.competitionId
        }
        this.$forceUpdate()
      }
    },
    /* 组织 考试类别 数据导入 */
    getOd(val) {
      this.competitionTarget.competitionTarget = val.organizationId
      this.twin.organizationName = val.organizationName
    },

    getOd2(val) {
      this.dataDetail.competitionSort = val.competitionSortId
      this.twin.competitionSortName = val.competitionSortName
    },

    getOd3(val) {
      this.competitionTarget.competitionTarget = val.groupingId
      this.twin.groupingName = val.groupingName
    },

    // 提交考试修改内容，返回考试列表
    async submitCreation() {
      const { data: res } = await this.$http.post(
        '/manager/competition/edit',
        this.dataDetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('修改成功')
        this.$router.go(-1)
      }
    }
  },
  watch: {
    competitionQuestionList: {
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

        this.strategydetail.contestTotal = total
      },
      deep: true
    },
    /* 监考查询条件，重新查询题型数量 */
    'strategydetail.difficulty': {
      handler(newval, old) {
        if (newval !== old) {
          this.getQuestionCateNum()
        }
      },
      deep: true
    },
    'strategydetail.knowledge': {
      handler(newval, old) {
        if (newval !== old && newval !== undefined) {
          this.getQuestionCateNum()
        }
      },
      deep: true
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
    },
    transformType: function(val) {
      if (val === '1') return '单选题'
      if (val === '2') return '判断题'
      if (val === '3') return '多选题'
      return val
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
  border-color: #409eff;
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
