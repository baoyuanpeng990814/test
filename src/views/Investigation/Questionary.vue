<template>
	<v-main>
		<!-- 问卷调查子页面 -->
		<v-toolbar color="white">
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn @click="finishExam" text  class="submit_paper" style=" padding: 0;" >
				提交问卷
			</v-btn>
		</v-toolbar>
		<div class="body_height ofs">
			<div class="m10">
				<v-alert color="#28BBCE" dark>
					{{datadetail.examineName}}
				</v-alert>
			</div>

			<v-card class="m10" v-if="questions.length>0">
				<v-card-title>

					<span class="ml-4">
						{{questionIndex+1}} / {{questions.length}}
					</span>
				</v-card-title>
				<v-card-text>
					<div class="fs18 c_b">
						<div v-html="questions[questionIndex].examineQuestionTitle"></div>
					</div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-text>
					<span>
						<v-radio-group v-model="answer">						 
								<span class="answer_list" v-for="l in questions[questionIndex].examineQuestionOption"
									:key="l">
									<div>
										<v-radio :label="l" :value="l"></v-radio>
									</div>
									<div></div>
									<div></div>
								</span>
						</v-radio-group>
					</span>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-btn large color="#24BFD3" dark @click="previousQuestion">上一题
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn large color="#24BFD3" dark @click="nextQuestion">下一题
					</v-btn>
				</v-card-actions>
			</v-card>
		</div>
		<div>

		</div>
		<p class="cb"></p>
		</li>
		</span>

		</v-card-text>
		</v-card>
		<v-dialog v-model="menu" height="100vh" fullscreen hide-overlay transition="dialog-bottom-transition">


			<v-toolbar dark color="teal" dark>
				<v-btn icon dark @click="menu = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-toolbar-title>题目列表</v-toolbar-title>
			</v-toolbar>

			<v-card>
				<div class="question_list" v-if="questions.length>0">
						<p>&nbsp;</p>
						<ul>
							<li v-for="q in questions.length"
								@click="checkThis(questions[q-1])"
								:class="{ done : questions[q-1].done } ">
								{{q}}
							</li>
						</ul>
						<div class="cb"></div>
					</div>
				</div>

			</v-card>
		</v-dialog>



		<v-snackbar :v-model="msg" :color="msgcolor">
			{{msgtext}}
		</v-snackbar>


		<v-dialog v-model="dialogTableVisible" width="500">
			<v-card>
				<v-card-title class="headline teal lighten-2 white--text">
					信息
				</v-card-title>
				<v-card-text>
					<div class="exam_dialog">
						您确定要提交问卷吗？
					</div>

				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="red" text @click="dialogTableVisible = false">
						取消
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="teal" text @click="submit">
						确定
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>


		</div>
	</v-main>
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
						examName: ""
					}
				},
				remnantTime: 0,
				questions: [],
				questionIndex: 0,
				answer: "",
				answerforc: [],
				msg: false,
				msgcolor: "red",
				msgtext: "考试已结束",
				menu: false,
				once: false
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getExam()
		},
		beforeDestroy() {
			if (!this.once) {
				this.submit()
			}
		},
		methods: {
			previousQuestion() {
				if (this.answer.length != 0) {
					if (this.answer != this.questions[this.questionIndex].answer) {
						this.questions[this.questionIndex].done = true
						this.questions[this.questionIndex].answer = this.answer
					}
				}
				this.$forceUpdate()

				if (this.questionIndex == 0) {

				} else {
					this.questionIndex--
				}

				this.answer = this.questions[this.questionIndex].answer
			},
			nextQuestion() {
				if (this.answer.length != 0) {
					if (this.answer != this.questions[this.questionIndex].answer) {
						this.questions[this.questionIndex].done = true
						this.questions[this.questionIndex].answer = this.answer
					}
				}
				this.$forceUpdate()
				if (this.questions.length - 1 == this.questionIndex) {
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
				this.menu = false
			},
			finishExam() {
				this.dialogTableVisible = true
			},
			getExam() {
				this.$store.dispatch("getQuestionary", {examineId:this.id}).then((res) => {
					if (res.data.state == 200) {

						this.datadetail = res.data.data
						//this.questions = this.datadetail.lExamineQuestions
						this.questions = []
						for (var i = 0; i < this.datadetail.lExamineQuestions.length; i++) {
							this.datadetail.lExamineQuestions[i].done = false

							var fractions = this.datadetail.lExamineQuestions[i].examineQuestionFraction.split("|")
							var options = this.datadetail.lExamineQuestions[i].examineQuestionOption.split("|")
							var temp = {
								examineQuestionTitle: this.datadetail.lExamineQuestions[i]
									.examineQuestionTitle,
								examineQuestionId: this.datadetail.lExamineQuestions[i].examineQuestionId,
								examineQuestionOption: [],
								examineQuestionFraction: [],
								length: fractions.length,
								answer: ""
							}
							for (var j = 0; j < fractions.length; j++) {
								temp.examineQuestionFraction[j] = parseInt(fractions[j])
								temp.examineQuestionOption[j] = options[j]
							}
							this.questions.push(temp)

						}

					} else {

					}
				}).catch((res) => {

				})
			},
			submit() { 
				this.once = true
				this.dialogTableVisible = false
				
				
				var answers = ""
				for(var i=0;i<this.questions.length;i++){
				  answers+= i+":"+this.questions[i].answer+","
				}
				answers = answers.substring(0,answers.length-1)

				this.$store.dispatch("saveQuestionary", {
					answer : answers,
					examineId : this.id
				}).then((res) => {
					if (res.data.state == 200) {
						this.msg = true
						this.msgcolor = "teal"
						this.msgtext = "交卷成功"
						//this.$router.push('InvestigationHome')
						this.$router.go(-1);
					} else {
						this.once = false
						this.msg = true
						this.msgcolor = "red"
						this.msgtext = "交卷失败"
					}
				}).catch((res) => {
					this.once = false
					this.msg = true
					this.msgcolor = "red"
					this.msgtext = "交卷失败"
				})

			},
			goBack() {
				this.$router.go(-1)
			},

		}
	}
</script>

<style>
</style>
