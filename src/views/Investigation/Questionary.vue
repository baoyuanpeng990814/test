<!-- @format -->

<template>
  <div class="top-bg">
    <v-img
      height="100vh"
      width="100%"
      style="position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;"
      src="../../images/线条.png"
    ></v-img>
    <div class="top">
      <div class="title">
        <v-btn @click="goBack" icon style="color: #fff;">
          <v-img src="../../images/icon/返回.png" height="18pt" contain></v-img>
        </v-btn>
        <div class="ques_title">参与调研</div>
        <div class="choose_ques">
          筛选题库
        </div>
      </div>
    </div>

    <div class="main_container">
      <div class="container">
        <div class="title-time">
          <p>
            剩余时间：
          </p>
          {{ questionNaireDetail.examineName }}
          <div class="ques-count">{{ questionIndex + 1 }} / {{ this.questionNaireDetail.lExamineQuestions.length }}</div>
        </div>
      </div>

      <div class="question-name">
        {{ questionNaireDetail.examineName }}
      </div>
      <div class="btns-contain" v-for="(item, questionIndex) in quesAnswer" :key="item">
        <div class="btns" style="text-align: center;">
          <v-btn @click="chooseAnswerFn(item)" ref="answerRef">
            {{ item }}
          </v-btn>
        </div>
      </div>

      <div class="container" style="padding: 0 30pt;">
        <div class="last" @click="previousQuestion">
          <v-img src="../../images/上一题.png"></v-img>
        </div>
        <div class="submit_containera">
          <v-btn class="submit-btn" style="background-color:#28BBCE;height: 44pt;width: 108pt;" @click="quesSubmitFn()">
            提交问卷
          </v-btn>
        </div>
        <div class="next" @click="nextQuestion">
          <v-img src="../../images/下一题.png"></v-img>
        </div>
      </div>

      <!-- <v-card class="m10" v-if="questions.length > 0">
        <v-card-title> </v-card-title>
        <v-card-text>
          <div class="fs18 c_b">
            <div v-html="questions[questionIndex].examineQuestionTitle"></div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <span>
            <v-radio-group v-model="answer">
              <span class="answer_list" v-for="item in questions[questionIndex].examineQuestionOption" :key="item">
                <div>
                  <v-radio :label="item" :value="item"></v-radio>
                </div>
              </span>
            </v-radio-group>
          </span>
        </v-card-text>
        <v-divider></v-divider>
      </v-card> -->
    </div>

    <!-- <v-dialog v-model="menu" height="100vh" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="teal">
        <v-btn icon dark @click="menu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>题目列表</v-toolbar-title>
      </v-toolbar>

      <v-card>
        <div class="question_list" v-if="questions.length > 0">
          <p>&nbsp;</p>
          <ul>
            <li v-for="q in questions.length" @click="checkThis(questions[q - 1])" :class="{ done: questions[q - 1].done }">
              {{ q }}
            </li>
          </ul>
          <div class="cb"></div>
        </div>
      </v-card>
    </v-dialog> -->
  </div>
  <!-- 问卷调查子页面 -->
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      id: 0,
      questionNaireDetail: {
        exam: {
          examName: '',
        },
      },
      remnantTime: 0,
      questions: [],
      questionIndex: 0,
      quesAnswer: [], // 题目答案
      answerData: [],
      answer: '',
      answerforc: [],
      msg: false,
      msgcolor: 'red',
      msgtext: '考试已结束',
      menu: false,
      once: false,
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getExam()
  },
  // beforeDestroy() {
  //   if (!this.once) {
  //     this.quesSubmitFn()
  //   }
  // },
  methods: {
    // 上一题
    previousQuestion() {
      if (this.questionIndex === 0) {
      } else {
        this.questionIndex--
      }
      this.quesAnswer = this.questionNaireDetail.lExamineQuestions[this.questionIndex].examineQuestionOption.replaceAll('|', ',').split(',')
    },
    // 下一题
    nextQuestion() {
      if (this.questionNaireDetail.lExamineQuestions.length - 1 === this.questionIndex) {
      } else {
        this.questionIndex++
      }
      this.quesAnswer = this.questionNaireDetail.lExamineQuestions[this.questionIndex].examineQuestionOption.replaceAll('|', ',').split(',')
    },
    // 选择答案
    chooseAnswerFn(item) {
      this.$refs.answerRef.forEach((e) => {
        if (e.$el.innerHTML === item) {
          e.$el.innerHTML = 'eeqw'
        }
      })
      console.log(this.$refs.answerRef, '44444')
    },
    // checkThis(obj) {
    //   if (this.answer.length !== 0) {
    //     if (this.answer !== this.questions[this.questionIndex].answer) {
    //       this.questions[this.questionIndex].done = true
    //       this.questions[this.questionIndex].answer = this.answer
    //     }
    //   }
    //   this.$forceUpdate()
    //   this.questionIndex = this.questions.findIndex((i) => i === obj)
    //   this.answer = this.questions[this.questionIndex].answer
    //   this.menu = false
    // },
    finishExam() {
      this.dialogTableVisible = true
    },
    getExam() {
      this.$store
        .dispatch('getQuestionary', { examineId: this.id })
        .then((res) => {
          if (res.data.state === 200) {
            this.questionNaireDetail = res.data.data
            this.answerData = res.data
            this.quesAnswer = this.questionNaireDetail.lExamineQuestions[this.questionIndex].examineQuestionOption.replaceAll('|', ',').split(',')
            console.log(this.quesAnswer, 'str')
          }
        })
        .catch((res) => {})
    },
    // 提交问卷按钮
    quesSubmitFn() {
      this.once = true
      this.dialogTableVisible = false
      this.$store
        .dispatch('saveQuestionary', {
          answer: answers,
          examineId: this.id,
        })
        .then((res) => {
          if (res.data.state === 200) {
            this.msg = true
            this.msgcolor = 'teal'
            this.msgtext = '交卷成功'
            //this.$router.push('InvestigationHome')
            this.$router.go(-1)
          } else {
            this.once = false
            this.msg = true
            this.msgcolor = 'red'
            this.msgtext = '交卷失败'
          }
        })
        .catch((res) => {
          this.once = false
          this.msg = true
          this.msgcolor = 'red'
          this.msgtext = '交卷失败'
        })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.top-bg {
  display: flex;
  align-content: center;
  overflow: scroll;
  height: 100vh;
  align-items: center;
}
.top {
  position: absolute;
  width: 100%;
  left: 0;
  top: 30pt;
}
.title {
  display: flex;
  justify-content: space-between;
}
.main_container {
  position: absolute;
  width: 100%;
  left: 0;
  top: 60pt;
}
.ques_title {
  margin-left: 10%;
  font-size: 16.5pt;
  color: #ffffff;
}

.mg-20 {
  margin: 20px;
}
.title-time {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 38pt;
  border-radius: 19pt;
  background-color: #ffffff;
  background: rgba(255, 255, 255, 79%);
  line-height: 38pt;
  color: #28bbce;
}
.question-name {
  width: 100%;
  height: 36.5pt;
  font-size: 16pt;
  color: #ffffff;
  margin: 0 auto;
  padding: 0 20pt;
}
.ques-count {
  line-height: 38pt;
}
.btns-contain {
  padding: 5pt 30pt;
}
.btns-contain .v-btn {
  width: 100%;
  height: 53pt;
  font-size: 15pt;
  color: #28bbce;
}
.container {
  display: flex;
  width: 100%;
  padding: 5pt 30pt;
  justify-content: space-between;
}
.submit_container {
  position: absolute;
  left: 0;
  bottom: 30pt;
}
.last .next {
  height: 30pt;
  width: 52pt;
}
.submit-btn {
  width: 100%;
  font-size: 14pt;
  color: #ffffff;
  border-radius: 22pt;
  height: 44pt;
}
.choose_ques {
  font-size: 13pt;
  color: #ffffff;
}
</style>
