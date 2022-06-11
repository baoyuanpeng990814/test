<template>
	<v-main>
		<!-- 考试子页面 -->
		<v-toolbar color="white" >
			<v-btn @click="goBack()" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			
			<v-spacer></v-spacer>
			
			<v-btn @click="menu=true" class="ag" icon color="#28BBCE">
				筛选题库
			</v-btn>
			
		</v-toolbar>
		<div class="body_no_top ofs">
			
				<v-alert color="#F0F1F6" minWidth = "100%" >
					<div class="i-row i-align-center i-between">
						剩余时间: {{remnantTime | transfermTime}}
						<div class="i-row">
							<div class="fontb-24BFD3-1-2">
								{{questionIndex+1}}
							</div>
							 / {{questions.length}}
						</div>
						
					</div>
					
				</v-alert>
			
			<!-- 答题列表 -->
			<v-card class="m10" v-if="questions[questionIndex]!=null">
				<!-- 题型提示 -->
				<v-card-title>
					
					<div class="index_exam">{{questionIndex+1}}</div>
					<span v-if="questions[questionIndex].questionsType==1">
						[单选题]
					</span>
					<span v-if="questions[questionIndex].questionsType==2">
						[多选题]
					</span>
					<span v-if="questions[questionIndex].questionsType==3">
						[判断题]
					</span>
					<div v-html="questions[questionIndex].questionsContent"></div>
				</v-card-title>
				
				<v-divider></v-divider>
				<v-card-text>
					<span v-if="questions[questionIndex].questionsType==2">
						<span class="answer_list" v-for="l in questions[questionIndex].lOptionList" :key="l.optionNum">
							<div>
								<v-checkbox v-model="answer" :label="l.optionNum" :value="l.optionNum"></v-checkbox>
							</div>
							<div><span v-html="l.optionContent"></span></div>
							<div></div>
						</span>
					</span>
					<span v-else>
						<v-radio-group v-model="answer">
							<span class="answer_list" v-for="l in questions[questionIndex].lOptionList"
								:key="l.optionNum">
								<div>
									<v-radio :label="l.optionNum" :value="l.optionNum"></v-radio>
								</div>
								<div><span v-html="l.optionContent"></span></div>
								<div></div>
							</span>
						</v-radio-group>
					</span>
				</v-card-text>
				<v-divider></v-divider>
				
				<!-- 考题跳转 -->
				<v-card-actions>
					<div class="i-column i-align-center "@click="previousQuestion">			
						<div class="btn_before"></div>
						上一题
					</div>
					
					
					<v-spacer></v-spacer>
					<div class="i-column i-align-center " @click="nextQuestion">
						<div class="btn_next"></div>						
						下一题
					</div>
					
				</v-card-actions>
			</v-card>
			
			
			<div @click="finishExam" class="btn_sumit_exam">
				交卷
			</div>
			<div ></div>
		</div>
		

		
		
		<v-dialog v-model="menu" height="100vh" fullscreen hide-overlay transition="dialog-bottom-transition">


			<v-toolbar dark color="#34C4D6" dark>
				<v-btn icon dark @click="menu = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
				<v-toolbar-title>题目列表</v-toolbar-title>
			</v-toolbar>

			<v-card>
				<div class="question_list" v-if="datadetail.examQuestions != null">
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
								<!-- <div v-if="l.optionNum=='A'"> 正确</div>
								<div v-if="l.optionNum=='B'"> 错误</div> -->
							</li>
						</ul>
						<div class="cb"></div>
					</div>

				</div>

			</v-card>
		</v-dialog>



		<v-snackbar v-model="msg" :color="msgcolor" timeout = 2000 >
			{{msgtext}}
		</v-snackbar>


		<v-dialog v-model="dialogTableVisible" width="500">
			<v-card>
				<v-card-title class="headline teal lighten-2 white--text">
					信息
				</v-card-title>
				<v-card-text>
					<div class="exam_dialog">
						您确定要交卷吗？
					</div>

				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-btn color="red" text @click="dialogTableVisible = false">
						取消
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="teal" text @click="submit()">
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
				timer: null,
				questions: [],
				questionIndex: 0,
				answer: "",
				answerforc: [],
				msg: false,
				msgcolor: "red",
				msgtext: "考试已结束",
				menu: false,
				once:false,
				timeout:false,
				enrollId:0
			}
		},
		created() {
			this.id = this.$route.params.id		
			console.log(this.id +"id")
			//this.enrollId = this.$route.params.enrollId		
			this.getExam();
			
			
		},
		beforeDestroy(){
			if(!this.timeout){
				if(!this.once){
					this.submit()
				}
			}
		},
		methods: {
			submitAnswer() {
				if (typeof(this.answer) != "string") {
					var temp = ""
					for (var i = 0; i < this.answer.length; i++) {
						temp += this.answer[i] + ","
					}
					this.answer = temp.substring(0, temp.length - 1)
				}


				this.$store.dispatch("saveAnswer", {
					examUserId: this.datadetail.examUserId,
					questionsId: this.questions[this.questionIndex].questionsId,
					userAnswer: this.answer
				}).then((res) => {
					if (res.data.state == 200) {

					} else {
						this.msg = true
						this.msgcolor = "red"
						this.msgtext = "答案提交失败"
					}
				}).catch((res) => {

					this.msg = true
					this.msgcolor = "red"
					this.msgtext = "答案提交失败"
				})


			},
			// 上一题  this.questionIndex  序号
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
					this.msg = true
					this.msgcolor = "red"
					this.msgtext = "这已经是第一题了"
					
				} else {
					this.questionIndex--
				}
				this.answer = this.questions[this.questionIndex].answer
			},
			// 下一题
			nextQuestion() {
				
				if (this.answer.length != 0) {
					if (this.answer != this.questions[this.questionIndex].answer) {
						this.questions[this.questionIndex].done = true
						this.questions[this.questionIndex].answer = this.answer
						this.submitAnswer()
					}
				}

				this.$forceUpdate()
				if (this.questions.length - 1 == this.questionIndex) {
					
					this.msg = true
					this.msgcolor = "red"
					this.msgtext = "这已经是最后一题了"
				} else {
					this.questionIndex++
				}
				this.answer = this.questions[this.questionIndex].answer
			},
			checkThis(obj) {
				this.menu = false
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
				this.menu= false
			},
			finishExam() {
				this.dialogTableVisible = true
			},
			getExam() {
				// 获取考试详情信息
				this.$store.dispatch("getExamInfo", this.id).then((res) => {
					if (res.data.state == 200) {

						
						this.datadetail = res.data.data
						console.log(this.datadetail);
						if (this.datadetail.countType >= this.datadetail.exam.examSubmit) {
						  
						  this.timeout = true
						  clearInterval(this.timer)
						  this.$router.go(-1);
						}
						
						this.remnantTime = this.translateTime(parseInt(this.datadetail.exam.timingStartTime))

						this.questions = []
						
						/* 题型筛选 */
						if (this.datadetail.examQuestions.radio != null) {
							for (var i = 0; i < this.datadetail.examQuestions.radio.length; i++) {
								this.datadetail.examQuestions.radio[i].done = false
								this.datadetail.examQuestions.radio[i].answer = ""
								this.questions.push(this.datadetail.examQuestions.radio[i])
								
							}
						}

						if (this.datadetail.examQuestions.check != null) {
							for (var i = 0; i < this.datadetail.examQuestions.check.length; i++) {
								this.datadetail.examQuestions.check[i].done = false
								this.datadetail.examQuestions.check[i].answer = []
								this.questions.push(this.datadetail.examQuestions.check[i])
								
							}
						}

						if (this.datadetail.examQuestions.judge != null) {
							for (var i = 0; i < this.datadetail.examQuestions.judge.length; i++) {
								this.datadetail.examQuestions.judge[i].done = false
								this.datadetail.examQuestions.judge[i].answer = ""
								this.questions.push(this.datadetail.examQuestions.judge[i])
								
							}
						}
					} else {
						
					}
				}).catch((res) => {
					
				})
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
						//this.$message.error("考试已结束")
						this.msg = true
						this.msgcolor = "red"
						this.msgtext = "考试已结束"
						this.$router.go(-1)
					} else {
						this.setTimer()
					}

				} else {

					suppose = minute * 60 * 1000
					this.setTimer()

				}
				return suppose
			},
			submit() {
				this.once = true
				this.dialogTableVisible = false
				console.log(this.datadetail.examUserId)
				this.$store.dispatch("saveExam",{
					//examId:this.datadetail.exam.examId,
					examUserId:this.datadetail.examUserId,
					examTime:this.remnantTime
				} ).then((res) => {
					if (res.data.state == 200) {
						this.msg = true
						this.msgcolor = "teal"
						this.msgtext = "交卷成功"
						clearInterval(this.timer)
						this.$router.go(-1)
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
			goBack() {
				this.$router.go(-1)
			},
			

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
	
	.index_exam{
	    width: 2.5rem;
	    height: 2.5rem;
	    background: #28BBCE;
		color: white;
	    border-radius: 0px 0px 2.5rem 0px;
	    text-align: start;
		text-indent: 0.5rem;
		line-height: 2.5rem;
		font-size: 0.9rem;
		
	}
	.v-card__title >span{
		font-size: 0.9rem;
		color: #28BBCE;
	}
	.btn_sumit_exam{
		width: 11rem;
		height: 2.75rem;
		background: #28BBCE;
		box-shadow: 0px 10px 13px 0px rgba(123, 232, 246, 0.4);
		border-radius: 1.375rem;
		margin: 2rem auto;
		line-height: 2.75rem;
		text-align: center;
		color: #FFFFFF;
		
	}
	.btn_before{
		width: 30px;
		height: 30px;
		background-image: url(../../images/icon/icon_beforeHL.png);
		background-size: cover;
	}
	.btn_before:hover{
		width: 30px;
		height: 30px;
		background-image: url(../../images/icon/icon_before.png);
		background-size: cover;
	}
	.btn_next{
		width: 30px;
		height: 30px;
		background-image: url(../../images/icon/icon_nextHL.png);
		background-size: cover;
	}
	.btn_next:hover{
		width: 30px;
		height: 30px;
		background-image: url(../../images/icon/icon_next.png);
		background-size: cover;
	}
</style>
