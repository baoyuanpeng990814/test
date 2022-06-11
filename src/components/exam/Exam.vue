<template>
  <div class="exam_panel">
    <div class="exam_head">
      <div class="ml15 exam_name">
        {{datadetail.exam.examName}}
      </div>
      <div>
        <el-button @click="finishExam" round>提交答卷</el-button>
      </div>
      <div>
        剩余时间: {{remnantTime | transfermTime}}
      </div>
    </div>
    <el-container v-if="datadetail.examQuestions!=null">
      <el-aside width="200px" class="question_list">
        <div v-if="datadetail.examQuestions.radio!=null">
          <p>单选题</p>
          <ul>
            <li v-for="q in datadetail.examQuestions.radio.length"
              @click="checkThis(datadetail.examQuestions.radio[q-1])"
              :class="{ done : datadetail.examQuestions.radio[q-1].done } ">
              {{q}}
            </li>
          </ul>
          <div class="cb"></div>
        </div>

        <div v-if="datadetail.examQuestions.check!=null">
          <p>多选题</p>
          <ul>
            <li v-for="q in datadetail.examQuestions.check.length"
              @click="checkThis(datadetail.examQuestions.check[q-1])"
              :class="{ done : datadetail.examQuestions.check[q-1].done }">
              {{q}}
            </li>
          </ul>
          <div class="cb"></div>
        </div>

        <div v-if="datadetail.examQuestions.judge!=null">
          <p>判断题</p>
          <ul>
            <li v-for="q in datadetail.examQuestions.judge.length"
              @click="checkThis(datadetail.examQuestions.judge[q-1])"
              :class="{ done : datadetail.examQuestions.judge[q-1].done }">
              {{q}}
            </li>
          </ul>
          <div class="cb"></div>
        </div>

      </el-aside>
      <el-main>
        <div>
          <el-card class="box-card question_torso">
            <div slot="header" class="clearfix">
              <span v-if="questions[questionIndex].questionsType==1">
                单选题
              </span>
              <span v-if="questions[questionIndex].questionsType==2">
                多选题
              </span>
              <span v-if="questions[questionIndex].questionsType==3">
                判断题
              </span>
            </div>
            <div>
              <div v-html="questions[questionIndex].questionsContent"></div>
              <div>
                <span v-if="questions[questionIndex].questionsType==2">

                  <el-checkbox-group v-model="answer">

                    <li v-for="l in questions[questionIndex].lOptionList">
                      <div>
                        <el-checkbox :label="l.optionNum" :key="l.optionNum">{{l.optionNum}}</el-checkbox>
                      </div>
                      <div>
                        <span v-html="l.optionContent"></span>
                      </div>
                      <p class="cb"></p>
                    </li>
                  </el-checkbox-group>


                </span>
                <span v-else>
                  <li v-for="l in questions[questionIndex].lOptionList">
                    <div>
                      <el-radio v-model="answer" :label="l.optionNum">{{l.optionNum}}</el-radio>
                    </div>
                    <div>
                      <span v-html="l.optionContent"></span>
                    </div>
                    <p class="cb"></p>
                  </li>
                </span>




              </div>
              <div>
                <el-button type="primary" @click="previousQuestion">上一题</el-button>
                <el-button type="primary" @click="nextQuestion">下一题</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="信息" :visible.sync="dialogTableVisible">
      <span>您确定要交卷吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  var lasttime = null
  export default {
    data() {
      return {
        dialogTableVisible: false,
        id: 0,
        datadetail: {
          exam: {
            examName:""
          }
        },
        remnantTime: 0,
        timer: null,
        questions: [],
        questionIndex: 0,
        answer: "",
        answerforc: [],
        once: false,
        timeout: false,
        enrollId:0
      }
    },
    created() {
      //this.id = 4
      this.id = this.$route.params.id
      this.enrollId = this.$route.params.enrollId
      this.getExam()
    },
    beforeDestroy() {
      clearInterval(this.timer)
      if (!this.timeout) {
        if (!this.once) {
          this.$http.get("/learn/myexam/save?examId=" + this.datadetail.exam.examId + "&examUserId="+this.datadetail.examUserId+"&examTime=" + this.remnantTime)
        }
      }

    },
    methods: {

      async submit() {
        this.once = true
        this.dialogTableVisible = false

        const {
          data: res
        } = await this.$http.get("/learn/myexam/save?examId=" + this.datadetail.exam.examId +
          "&&examTime=" + this.remnantTime)
        if (res.state !== 200) {
          this.once = false
          return this.$message.error('提交失败！')
        } else {
          clearInterval(this.timer)
          this.$router.push('/ExamFinder')
          return this.$message.success('提交成功！')
        }
      },
      finishExam() {
        this.dialogTableVisible = true
      },
      async submitAnswer() {
        if (typeof(this.answer) != "string") {   //把多选题的结果转换为字符串用 ',' 分割
          var temp = ""
          for (var i = 0; i < this.answer.length; i++) {
            temp += this.answer[i] + ","
          }
          this.answer = temp.substring(0, temp.length - 1)
        }
        const {
          data: res
        } = await this.$http.post("/learn/myexam/saveAnswer", {
          examUserId: this.datadetail.examUserId,
          questionsId: this.questions[this.questionIndex].questionsId,
          userAnswer: this.answer
        })

      },
      previousQuestion() {
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
            this.submitAnswer()
          }
        }
        this.$forceUpdate()

        if (this.questionIndex == 0) {
          this.$message.success("这已经是第一题")
        } else {
          this.questionIndex--
        }

        this.answer = this.questions[this.questionIndex].answer
      },
      nextQuestion() {
        //console.log(this.answer.length)
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
            this.submitAnswer()
          }
        }
        this.$forceUpdate()
        if (this.questions.length - 1 == this.questionIndex) {
          this.$message.success("这已经是最后一题")
        } else {
          this.questionIndex++
        }

        this.answer = this.questions[this.questionIndex].answer

      },
      checkThis(obj) { //直接跳转到指定题目
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
            this.submitAnswer()
          }
        }
        this.$forceUpdate()
        this.questionIndex = this.questions.findIndex(i => i == obj)
        this.answer = this.questions[this.questionIndex].answer

      },
      async getExam() {
        const {
          data: res
        } = await this.$http.get("/learn/myexam/examInfo?id=" + this.enrollId)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.datadetail = res.data
          //console.log(this.datadetail)
          if (this.datadetail.count >= this.datadetail.exam.examSubmit) {
            this.$message.error("您已经完成了此考试")
            clearInterval(this.timer)
            this.timeout = true
            this.$router.push('/ExamFinder')
          }

          this.remnantTime = this.translateTime(parseInt(this.datadetail.exam.timingStartTime))
          this.questions = []
          if (this.datadetail.examQuestions.radio != null) {  //分割出单选题
            for (var i = 0; i < this.datadetail.examQuestions.radio.length; i++) {
              this.datadetail.examQuestions.radio[i].done = false
              this.datadetail.examQuestions.radio[i].answer = ""
              this.questions.push(this.datadetail.examQuestions.radio[i])
            }
          }

          if (this.datadetail.examQuestions.check != null) {  //分割出多选题
            for (var i = 0; i < this.datadetail.examQuestions.check.length; i++) {
              this.datadetail.examQuestions.check[i].done = false  //标记题目为未答题
              this.datadetail.examQuestions.check[i].answer = []  //标记题目的答案格式
              this.questions.push(this.datadetail.examQuestions.check[i])
            }
          }

          if (this.datadetail.examQuestions.judge != null) {  //分割出判断题
            for (var i = 0; i < this.datadetail.examQuestions.judge.length; i++) {
              this.datadetail.examQuestions.judge[i].done = false
              this.datadetail.examQuestions.judge[i].answer = ""
              this.questions.push(this.datadetail.examQuestions.judge[i])
            }
          }
        }
      },
      setTimer() {
        if (lasttime == null) {
          lasttime = Date.now()
        }
        var t = this
        this.timer = setInterval(function() {
          var now = Date.now()
          t.remnantTime -= (now - lasttime)
          lasttime = now
          if (t.remnantTime <= 0) {
            t.submit()
          }

        }, 1000)
      },
      translateTime(minute) {
        var suppose = minute * 60 * 1000
        if (this.datadetail.exam.timingType == 2) {


          var date = this.datadetail.exam.timingEndTime
          date = date.substring(0, 19)
          date = date.replace(/-/g, '/')
          var timestamp = new Date(date).getTime()
          suppose = timestamp - Date.now()
          if (suppose <= 0) {
            clearInterval(this.timer)
            this.$message.error("考试已结束")
            this.$router.go(-1)
          } else {
            this.setTimer()
          }

        } else {
          suppose = minute * 60 * 1000
          this.setTimer()
        }
        return suppose


      }
    },
    filters: {
      transfermTime(sec) {
        sec = Math.round(sec / 1000)
        let hour = Math.floor(sec / 3600);
        let minute = Math.floor((sec - hour * 3600) / 60);
        let second = sec - hour * 3600 - minute * 60;
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }
        return hour + ":" + minute + ":" + second;
      }
    }
  }
</script>

<style>

</style>
