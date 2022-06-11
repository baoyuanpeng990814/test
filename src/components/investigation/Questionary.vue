<template>
  <div class="exam_panel">
    <div class="exam_head">
      <div class="ml15 exam_name">11
        {{datadetail.examineName}}
      </div>
      <div>
        <el-button @click="finishExam" round>提交问卷</el-button>
      </div>
    </div>
    <el-container>
      <el-aside width="200px" class="question_list">
        <div v-if="datadetail.lExamineQuestions!=null">
          <p>&nbsp</p>
          <ul>
            <li v-for="q in questions.length"
              @click="checkThis(questions[q-1])"
              :class="{ done : questions[q-1].done } ">
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
            </div>
            <div v-if="questions.length>0">
              <div v-html="questions[questionIndex].examineQuestionTitle"></div>
              <div>
                <span>
                  <li v-for="l in questions[questionIndex].examineQuestionOption">
                    <div>
                      <el-radio v-model="answer" :label="l">{{l}}</el-radio>
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
            examineName: ""
        },
        questions: [],
        questionIndex: 0,
        answer: "",
        answerforc: [],
        once:false
      }
    },
    created() {
      this.id= this.$route.params.id
      this.getExam()
    },
    beforeDestroy() {
      if(!this.once){
        this.submit()
      }
    },
    methods: {

      async submit() {  //提交问卷结果
        this.once = true
        this.dialogTableVisible = false

        var answers = ""
        for(var i=0;i<this.questions.length;i++){
          answers+= this.questions[i].examineQuestionId+":"+this.questions[i].answer+","
        }
        answers = answers.substring(0,answers.length-1)

        const {
          data: res
        } = await this.$http.post("/learn/examins/examineUser",{
          answer : answers,
          examineId : this.id
        })
        if (res.state !== 200) {
           this.once = false
          return this.$message.error('提交失败！')
        } else {
          this.$router.go('-1')
          return this.$message.success('提交成功！')
        }
      },
      finishExam() {
        this.dialogTableVisible = true
      },
      previousQuestion() {  //上一题
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
            //this.submitAnswer()
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
      nextQuestion() { //下一题
        //console.log(this.answer.length)
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
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
      checkThis(obj) {
        if (this.answer.length != 0) {
          if (this.answer != this.questions[this.questionIndex].answer) {
            this.questions[this.questionIndex].done = true
            this.questions[this.questionIndex].answer = this.answer
          }
        }
        this.$forceUpdate()
        this.questionIndex = this.questions.findIndex(i => i == obj)
        this.answer = this.questions[this.questionIndex].answer

      },
      async getExam() {  //获取问卷信息
        const {
          data: res
        } = await this.$http.get("/learn/examins/examineInfo?examineId=" + this.id)
        if (res.state !== 200) {
          //return this.$message.error('数据获取失败！')
        } else {
          this.datadetail = res.data
          //this.questions = this.datadetail.lExamineQuestions
          this.questions = []
          for(var i = 0;i<this.datadetail.lExamineQuestions.length;i++){
            this.datadetail.lExamineQuestions[i].done=false

            var fractions = this.datadetail.lExamineQuestions[i].examineQuestionFraction.split("|")
            var options = this.datadetail.lExamineQuestions[i].examineQuestionOption.split("|")
            var temp = {
              examineQuestionTitle: this.datadetail.lExamineQuestions[i].examineQuestionTitle,
              examineQuestionId: this.datadetail.lExamineQuestions[i].examineQuestionId,
              examineQuestionOption: [],
              examineQuestionFraction: [],
              length: fractions.length,
              answer:""
            }
            for (var j = 0; j < fractions.length; j++) {
              temp.examineQuestionFraction[j] = parseInt(fractions[j])
              temp.examineQuestionOption[j] = options[j]
            }
            this.questions.push(temp)

          }

        }
      },
    }
  }
</script>

<style>

</style>
