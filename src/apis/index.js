import axios from '../axios'

export default {
	login(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/user/login", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getCourseList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myLearn/courseList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getCourseDetail(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/myLearn/courseInfo?id=" + query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	delNote(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/snotes/del", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	editNote(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/snotes/edit", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	addNote(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/snotes/add", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getNoteList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/snotes/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getChapterState(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/myLearn/learningStatus?courseId=" + query.courseId +
					"&chapterId=" + query.chapterId)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getCommentList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/evaluate/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	delComment(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/evaluate/del", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	editComment(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/evaluate/edit", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	addComment(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/evaluate/add", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	recordStudy(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myLearn/recordLearning", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getCourseTheme() {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/treeTheme")
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getProgramList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/listTheme", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getCourseDetailPurchase(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/course/courseInfo?id=" + query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	enrollCourse(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/enroll", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	beingExamList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/exam/progressExam", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	comingExamList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/exam/aboutExam", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	enrollExam(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/exam/enrollExam", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getExamInfo(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/myexam/examInfo?id=" + query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	saveExam(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/myexam/save?examUserId=" + query.examUserId + "&examTime=" + query.examTime)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	saveAnswer(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/saveAnswer", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	examSortlist(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/examSortlist", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getExamList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/examList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getUserInfo(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/user/info?id=" + query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	editUserInfo(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/user/edit", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	editPassword(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/user/password", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	userRegister(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/user/register", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getOrganizationList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/org/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getBeingQuestionaryList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/examins/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getComingQuestionaryList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/examins/aboutExamine", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getQuestionary(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/examins/examineInfo?examineId=" + query.examineId)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	saveQuestionary(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/examins/examineUser", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	applyGraduation(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/myLearn/graduation?courseId=" + query.courseId)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getExamScore(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/myExamlist", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getNewsList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/new/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},

	getNewsDetail(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/new/info?id=" + query.id)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},

	getMessageCount() {
		return new Promise((resolve, reject) => {
			axios.post("/learn/message/count")
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getMessageList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/message/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	cancelMessageCount(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/message/edit", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	getGraduationList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/graduation/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},

	getExerciseList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/progressExam", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 报名练习接口 */
	enrollExercise(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/myexam/enrollExam", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 轮播图接口 */
	/* 参数名	必选	类型	说明
		page	是	string	第几页
		rows	是	string	每页多少条
		rotateTop	否	string	轮播图展示 1展示 2不展示 */
	rotateList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/rotate/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	
	/* 自主选课列表 */

	autoCourseList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/autonomyList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 自主选课分类列表 */

	autoCourseSortList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/autonomyThemeList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 自主选课报名 */
	enroll(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/course/enroll", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛分类接口 */
	/* 参数名	必选	类型	说明
		page	是	int	第几页
		rows	是	int	每页多少条
		competitionSortName	否	string	分类名称
		parentNode	否	string	父id */
	competitionSort(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/sortList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛列表接口 */
	/*	 page	是	int	第几页
		rows	是	int	每页多少条
		competitionSort	是	string	分类id */
	competitionList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/list", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 报名竞赛competitionId	 */
	competitionEnroll(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/enroll", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},

	
	/* 专家实操列表 */
	/* 参数名	必选	类型	说明
		competitionId	是	string	竞赛id
		page	是	string	第几页
		rows	是	string	每页多少条 */
	competitionMatchExpertList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/matchExpertList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 用户实操列表 */
	competitionMatchUserList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/matchUserList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 用户竞赛考试答题内容信息 */
	competitionDetailInfo(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/competition/info?id=" + query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛答题 */
	/* 
	competitionUserId	是	string	竞赛报名id
	questionsId	是	string	试题id
	userAnswer	否	string	答案 
	 */
	competitionSaveAnswer(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/saveAnswer", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛提交试卷 */
	/* 
	参数名	必选	类型	说明
	competitionId	是	string	竞赛id
	competitionTime	是	string	考试用时
	 */
	competitionSave(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/competition/saveAnswer?competitionId="+query.id+"&competitionTime="+query.time)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 实操列表 */
	/*	参数名	必选	类型	说明
		competitionId	是	int	考次id
		page	是	int	第几页
		rows	是	int	每页多少条 */
	competitionOperationList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/competition/operationList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 评论列表 operationId	 实操id*/
	competitionCommentList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/competition/commentList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 删除评论 commentId	 评论id*/
	competitionDeleteComment(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/competition/eqdelComment", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛分组排名 */
	/* 参数名	必选	  类型	说明
		page	是	int	第几页
		rows	是	int	每页多少条
		userId	是	int	用户id
		competitionSort	否	int	分类
		startTime	否	string	开始时间
		endTime	否	string	结束时间 */
	competitionSortRankInfo(query) {
		return new Promise((resolve, reject) => {
			axios.post("/manager/competition/rankInfo", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	
	/* 比赛答题排行 */
	/* 参数名	必选	类型	说明
		page	是	int	第几页
		rows	是	int	每页多少条
		competitionSort	是	string	分类id */
	competitionSortRankList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/rankingList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	
	/* 竞赛赛事报导 */
	/* 参数名	必选	  类型	说明
		page	是	int	第几页
		rows	是	int	每页多少条
		startTime	否	string	开始时间
		endTime	否	string	结束时间*/
	competitionNewsList(query) {
		return new Promise((resolve, reject) => {
			axios.post("/learn/competition/newList", query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
	/* 竞赛赛事报导详情 id 新闻id*/
	/*  */
	competitionNewsInfo(query) {
		return new Promise((resolve, reject) => {
			axios.get("/learn/competition/newInfo?id="+query)
				.then((res) => {
					resolve(res)
				}).catch((res) => {
					reject(res)
				})
		})
	},
}
