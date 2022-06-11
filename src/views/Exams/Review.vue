<template>
	<v-main>
		<!-- 课程首页 -->


		<div class="exercise_bg">
			<v-app-bar flat style="background: transparent; ">
				<v-btn @click="$router.go(-3)" icon>
					<v-img src="../../images/icon/icon_back_white.png" height="18px" contain></v-img>

				</v-btn>
				<div class="tool_title" style="color: white; margin: auto;">错题复习</div>
				
			</v-app-bar>
			<header>
				<div class="time_bar">
					<div class="i-row i-align-center i-center">
						<!-- <div>答题时间：{{remnantTime | transfermTime}}</div>
						<div class="i-row">
							<div class="">{{questionIndex+1}}</div>
							<div style="font-size: 0.8rem;">/ {{questions.length}}</div>
						</div> -->
						 本次复习 {{questions.length}}道错题
					</div>
				</div>

				<div class="question_title">
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
				</div>
			</header>
			<div v-if="questions[questionIndex].questionsType==1">
				<div v-for="l in questions[questionIndex].lOptionList" :key="l.optionNum">
					<div class="i-row " style="position: relative;"
						@click="answerClick(l.optionNum,questions[questionIndex].questionsAnswer)">
						<div :class="getAnswerStyle(l.optionNum)" v-model="answer" v-html="l.optionContent"
							:value="l.optionNum">

						</div>
						<img :src="getAnswerSrc(l.optionNum)" v-show="getAnswerSrc(l.optionNum)" width="21px"
							height="21px" style="position: absolute; right: 10%; top: 2.6rem;" />
					</div>

				</div>

			</div>
			
			<div v-if="questions[questionIndex].questionsType==3">
				<div v-for="l in questions[questionIndex].lOptionList" :key="l.optionNum">
					<div class="i-row " style="position: relative;"
						@click="answerClick(l.optionNum,questions[questionIndex].questionsAnswer)">
						<div :class="getAnswerStyle(l.optionNum)" v-model="answer" 
							:value="l.optionNum">
							<!-- <img v-if="l.optionNum=='A'" src="../../images/icon/icon_true2.png" width="21px"
							height="21px">
							<img v-if="l.optionNum=='B'" src="../../images/icon/icon_false2.png" width="21px"
							height="21px">	 -->
							<div v-if="l.optionNum=='A'"> 正确</div>
							<div v-if="l.optionNum=='B'"> 错误</div>
						</div>
						<img :src="getAnswerSrc(l.optionNum)" v-show="getAnswerSrc(l.optionNum)" width="21px"
							height="21px" style="position: absolute; right: 10%; top: 2.6rem;" />
					</div>
			
				</div>
			
			</div>
			
			<footer>
				<!-- 考题跳转 -->
				<v-card-actions style="padding: 0 8%;">
					<div class="i-column i-align-center " style="color: white;" @click="previousQuestion()">
						<div class="btn_before"></div>
						上一题
					</div>
				
				
					<v-spacer></v-spacer>
					<div class="i-column i-align-center " style="color: white;" @click="nextQuestion()">
						<div class="btn_next"></div>
						下一题
					</div>
				
				</v-card-actions>
			</footer>
			
			<v-snackbar v-model="msg" :color="msgcolor" timeout=2000>
				{{msgtext}}
			</v-snackbar>



		

			<!-- 答题弹窗 -->
			<v-dialog v-model="dialog" width="500">

				<v-card>
					<v-card-title style="padding-top: 2.25rem;">

						<span class=" font-2A2B2B-1 i-center marginlr-auto ">
							错题已全复习，是否进行别的练习？
						</span>
					</v-card-title>
					<v-card-actions>
						<v-btn text @click="dialog = false" width="6rem" height="2.5rem"
							style="border: 0.0625rem solid #28BBCE; color: #28BBCE; ">
							取消
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn text @click="$router.go(-3)" width="6rem" height="2.5rem"
							style=" background-color: #28BBCE; color: white; ">
							确定
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

		</div>

	</v-main>
</template>

<script>
	export default {
		data() {
			return {
				datas: [],
				total: 0,
				id: 0,
				dialog: false,
				snackbar: false,
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
				msgcolor: "",
				msgtext: "",
				menu: false,
				trueNum: 0,
				falseNum: 0,
				totalNum: 0,
				errors:[],
			}
		},
		created() {	
			
			this.questions = this.$route.params.errors;
			this.errorChange();
		},
		methods: {

			goBack() {
				this.$router.go(-1)
			},
			go(url) {
				this.$router.push(url);
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

					/* this.msg = true
					this.msgcolor = "red"
					this.msgtext = "这已经是最后一题了" */
					this.dialog = true;
				} else {
					this.questionIndex++
				}
				this.answer = this.questions[this.questionIndex].answer
			},
			/* 选题 */
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
				this.menu = false
			},
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
			// 计时器 1s 时间格式过滤器
			translateTime(minute) {
				var _self = this;
				setInterval(function() {
					_self.remnantTime += 1000;
				}, 1000);

			},
			// 答题功能
			answerClick(userAnswer, questionsAnswer) {
				console.log("复习11111111")
				//答题判断首次答题  
			/* 	if (!this.questions[this.questionIndex].done) {
					this.questions[this.questionIndex].answer = userAnswer;
					if (userAnswer == questionsAnswer) {
						this.trueNum += 1;
					} else {
						this.falseNum += 1;
					}
				} */
				this.questions[this.questionIndex].done = true;
				this.$forceUpdate()
			},
			// 答题样式替换
			getAnswerStyle(opinion) {
				// 判断是否答过题
				if (!this.questions[this.questionIndex].done) {
					return "question_choose";
				} else {
					if (opinion == this.questions[this.questionIndex].questionsAnswer) {
						return "question_choose_true";
					} else if (opinion == this.questions[this.questionIndex].answer) {
						return "question_choose_false";
					} else {
						return "question_choose";
					}
				}
			},
			getAnswerSrc(opinion) {
				// 判断是否答过题
				if (!this.questions[this.questionIndex].done) {
					return false;
				} else {
					if (opinion == this.questions[this.questionIndex].questionsAnswer) {
						return require('../../images/icon/icon_true2.png');
					} else if (opinion == this.questions[this.questionIndex].answer) {
						return require('../../images/icon/icon_false2.png');
					} else {
						return false;
					}
				}
			},
			
			/* 换成重新答题模式 */
			errorChange(){
				for(var i=0;i<this.questions.length;i++){
					this.questions[i].done = false;
				}
			}



		},

		watch: {



		},
		filters: {
			truncateTime(val) {
				return val.split(' ')[0]
			},
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
	.exercise_bg {
		width: 100%;
		height: 100%;
		background-image: url(../../images/bg_anwser.png);
		background-size: cover;

	}

	.time_bar {
		width: 66%;
		margin: 1.5rem auto;
		border-radius: 1.5rem;
		padding: 0;
		line-height: 2rem;
		height: 2rem;
		background-color: #FFFFFFC9;
		color: #28BBCE;
		padding: 0 20px;
		font-size: 0.9rem;
		flex-direction: row;
		justify-content: space-between;
	}

	.question_title {
		width: 84%;
		margin: 0 auto;
		padding: 0;
		line-height: 1.5rem;
		color: #FFFFFF;
		font-size: 1rem;

	}

	.question_title>span {
		color: white;
		float: left;
		width: fit-content;
		display: block;
	}

	.question_title>div>p {
		margin-bottom: 0;
		text-indent: 0.5rem;

	}

	.question_choose {
		width: 84%;
		margin: 1.5rem auto;
		padding: 1rem 1.8rem 1rem 1rem;
		text-align: center;
		color: #28C3D7;
		font-size: 1rem;
		flex-direction: row;
		background: #FFFFFF;
		opacity: 0.84;
		border-radius: 5px;
		border: 1px solid #FFFFFF;

	}

	.question_choose_true {
		width: 84%;
		margin: 1.5rem auto;
		padding: 1rem 1.8rem 1rem 1rem;
		text-align: center;
		color: #22c376;
		font-size: 1rem;
		flex-direction: row;
		background: #FFFFFF;
		opacity: 0.84;
		border-radius: 5px;
		border: #22c376 1px solid;

	}

	.question_choose_false {
		width: 84%;
		margin: 1.5rem auto;
		padding: 1rem 1.8rem 1rem 1rem;
		text-align: center;
		color: #ff0000;
		font-size: 1rem;
		flex-direction: row;
		background: #FFFFFF;
		opacity: 0.84;
		border-radius: 5px;
		border: #ff0000 1px solid;

	}

	.question_choose>p {
		margin-bottom: 0;
		text-align: start;
	}

	.question_choose_true>p {
		margin-bottom: 0;
		text-align: start;
	}

	.question_choose_false>p {
		margin-bottom: 0;
		text-align: start;
	}
</style>
