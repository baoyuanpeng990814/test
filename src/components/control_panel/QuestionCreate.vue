<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questionlist' }"
        >试题管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>创建试题</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建考题</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="goBackFn"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form
                :model="datadetail"
                :rules="rules"
                ref="datadetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="知识点" prop="knowledge">
                      <el-input v-model="datadetail.knowledge"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="*题型" prop="questionsType">
                      <el-input
                        v-model="twin.questionsType"
                        @focus="showQp = true"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分数" prop="questionsFraction">
                      <el-input-number
                        v-model="datadetail.questionsFraction"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="难度" prop="questionsDifficulty">
                      <el-select
                        v-model="datadetail.questionsDifficulty"
                        placeholder="请选择"
                      >
                        <el-option label="容易" value="1"></el-option>
                        <el-option label="较易" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="较难" value="4"></el-option>
                        <el-option label="非常难" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="*分类" prop="questionsSort">
                      <el-input
                        v-model="twin.questionsSort"
                        @focus="showQc = true"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="序号" prop="questionsSeq">
                      <el-input-number
                        v-model="datadetail.questionsSeq"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="试题内容" prop="questionsContent">
                      <quill-editor
                        ref="text"
                        v-model="datadetail.questionsContent"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="选项数">
                      <el-input-number
                        v-model="optionslength"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row
                  v-for="(o, index) in datadetail.lOptionList.length"
                  :key="index"
                >
                  <el-col :span="3.5">
                    <el-form-item
                      :label="datadetail.lOptionList[o - 1].optionNum"
                    >
                      <el-checkbox v-model="answers[o - 1]"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <quill-editor
                      ref="text"
                      v-model="datadetail.lOptionList[o - 1].optionContent"
                      class="myQuillEditor"
                    />
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="题解" prop="questionsExplain">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="datadetail.questionsExplain"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation(false)"
                      >保存</el-button
                    >
                    <el-button type="primary" @click="submitCreation(true)"
                      >保存并添加下一题</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <QuestionPanel
      :show="showQp"
      @choose="chooseQd"
      @turnOff="e => (showQp = e)"
    ></QuestionPanel>
    <QuestionCategoryPanel
      :show="showQc"
      @choose="chooseQc"
      @turnOff="e => (showQc = e)"
    ></QuestionCategoryPanel>
  </div>
</template>

<script>
import QuestionPanel from '../panel/QuestionTypePanel.vue'
import QuestionCategoryPanel from '../panel/OrganizationCategoryPanel.vue'
/* import { timingSafeEqual } from 'crypto' */
export default {
  components: {
    QuestionPanel,
    QuestionCategoryPanel
  },
  data() {
    return {
      optionslength: 1,
      answers: [false],
      showQp: false,
      showQc: false,
      twin: {
        questionsType: ' ',
        questionsSort: ' '
      },
      datadetail: {
        knowledge: '',
        questionsFraction: 1,
        questionsDifficulty: '1',
        questionsSeq: 1,
        questionsType: null,
        questionsSortId: null,
        questionsContent: '',
        lOptionList: [
          {
            optionNum: 'A',
            optionContent: ''
          }
        ],
        questionsExplain: '',
        questionsAnswer: ''
      },
      rules: {
        knowledge: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        questionsFraction: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        questionsSeq: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        questionsContent: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.questionsSortId) {
      this.datadetail.questionsSortId = this.$route.query.questionsSortId
    }
  },
  methods: {
    // 返回按钮
    goBackFn() {
      if (this.datadetail.questionsSortId) {
        this.$router.push({
          path: '/questionlist',
          query: { questionsSortId: this.datadetail.questionsSortId }
        })
      } else {
        this.$router.go(-1)
      }
    },
    chooseQc(val) {
      this.datadetail.questionsSortId = val.questionsSortId
      this.twin.questionsSort = val.questionsSortName
    },
    chooseQd(val) {
      this.datadetail.questionsType = val.questionsTypeId
      this.twin.questionsType = val.questionsTypeName
    },
    async submitCreation(next) {
      this.datadetail.questionsAnswer = ''
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i]) {
          this.datadetail.questionsAnswer +=
            (i + 1 + 9).toString(36).toUpperCase() + ',' // 把数字转化成字母
        }
      }
      this.datadetail.questionsAnswer = this.datadetail.questionsAnswer.substring(
        0,
        this.datadetail.questionsAnswer.length - 1
      )

      const { data: res } = await this.$http.post(
        '/manager/questions/add',
        this.datadetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('创建成功')
        if (next) {
          this.$router.push({
            path: '/questioncreate',
            query: {
              questionsSortId: this.datadetail.questionsSortId
            }
          })

          var temp = this.datadetail
          this.datadetail = {
            knowledge: '',
            questionsFraction: 1,
            questionsDifficulty: '1',
            questionsType: null,
            questionsSortId: null,
            questionsContent: '',
            lOptionList: [
              {
                optionNum: 'A',
                optionContent: ''
              }
            ],
            questionsExplain: '',
            questionsAnswer: ''
          }
          this.datadetail.questionsSeq = temp.questionsSeq + 1
          this.datadetail.questionsType = temp.questionsType
          this.datadetail.questionsSortId = temp.questionsSortId
          this.answers = [false]
          this.optionslength = 1
        } else {
          this.$router.push('/questionlist')
        }
      }
    }
  },
  watch: {
    optionslength: function(val) {
      this.answers = []
      this.datadetail.lOptionList = []
      for (var i = 0; i < val; i++) {
        this.datadetail.lOptionList[i] = {
          optionNum: (i + 1 + 9).toString(36).toUpperCase(),
          optionContent: ''
        }
        this.answers[i] = false
      }
      this.$forceUpdate()
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
    }
  }
}
</script>

<style></style>
