import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../apis'
import snackbar from "@/store/modules/snackbar";
Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		userinfo: {},
		index: 1,
	},
	mutations: {
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
		},

	},
	actions: {
		login(context, payload) {
			return Api.login(payload)
		},
		getCourseList(context, payload) {
			return Api.getCourseList(payload)
		},
		getCourseDetail(context, payload) {
			return Api.getCourseDetail(payload)
		},
		addNote(context, payload) {
			return Api.addNote(payload)
		},
		getNoteList(context, payload) {
			return Api.getNoteList(payload)
		},
		delNote(context, payload) {
			return Api.delNote(payload)
		},
		editNote(context, payload) {
			return Api.editNote(payload)
		},
		getChapterState(context, payload) {
			return Api.getChapterState(payload)
		},
		getCommentList(context, payload) {
			return Api.getCommentList(payload)
		},
		delComment(context, payload) {
			return Api.delComment(payload)
		},
		editComment(context, payload) {
			return Api.editComment(payload)
		},
		addComment(context, payload) {
			return Api.addComment(payload)
		},
		recordStudy(context, payload) {
			return Api.recordStudy(payload)
		},
		getCourseTheme(context) {
			return Api.getCourseTheme()
		},
		getProgramList(context, payload) {
			return Api.getProgramList(payload)
		},
		getCourseDetailPurchase(context, payload) {
			return Api.getCourseDetailPurchase(payload)
		},
		enrollCourse(context, payload) {
			return Api.enrollCourse(payload)
		},
		beingExamList(context, payload) {
			return Api.beingExamList(payload)
		},
		comingExamList(context, payload) {
			return Api.comingExamList(payload)
		},
		enrollExam(context, payload) {
			return Api.enrollExam(payload)
		},
		getExamInfo(context, payload) {
			return Api.getExamInfo(payload)
		},
		saveExam(context, payload) {
			return Api.saveExam(payload)
		},
		saveAnswer(context, payload) {
			return Api.saveAnswer(payload)
		},
		examSortlist(context, payload) {
			return Api.examSortlist(payload)
		},
		getExamList(context, payload) {
			return Api.getExamList(payload)
		},
		getUserInfo(context, payload) {
			return Api.getUserInfo(payload)
		},
		editUserInfo(context, payload) {
			return Api.editUserInfo(payload)
		},
		editPassword(context, payload) {
			return Api.editPassword(payload)
		},
		userRegister(context, payload) {
			return Api.userRegister(payload)
		},
		getOrganizationList(context, payload) {
			return Api.getOrganizationList(payload)
		},
		getBeingQuestionaryList(context, payload) {
			return Api.getBeingQuestionaryList(payload)
		},
		getComingQuestionaryList(context, payload) {
			return Api.getOrganizationList(payload)
		},
		getQuestionary(context, payload) {
			return Api.getQuestionary(payload)
		},
		saveQuestionary(context, payload) {
			return Api.saveQuestionary(payload)
		},
		applyGraduation(context, payload) {
			return Api.applyGraduation(payload)
		},
		getExamScore(context, payload) {
			return Api.getExamScore(payload)
		},
		getNewsList(context, payload) {
			return Api.getNewsList(payload)
		},
		getNewsDetail(context, payload) {
			return Api.getNewsDetail(payload)
		},
		getMessageCount(context, payload) {
			return Api.getMessageCount(payload)
		},
		getMessageList(context, payload) {
			return Api.getMessageList(payload)
		},
		cancelMessageCount(context, payload) {
			return Api.cancelMessageCount(payload)
		},
		getGraduationList(context, payload) {
			return Api.getGraduationList(payload)
		},
		getExerciseList(context, payload) {
			return Api.getExerciseList(payload)
		},
		enrollExercise(context, payload) {
			return Api.enrollExercise(payload)
		},
		rotateList(context, payload) {
			return Api.rotateList(payload)
		},
		autoCourseList(context, payload) {
			return Api.autoCourseList(payload)
		},
		autoCourseSortList(context, payload) {
			return Api.autoCourseSortList(payload)
		},
		enroll(context, payload) {
			return Api.enroll(payload)
		},
		competitionSort(context, payload) {
			return Api.competitionSort(payload)
		},
		competitionList(context, payload) {
			return Api.competitionList(payload)
		},
		competitionEnroll(context, payload) {
			return Api.competitionEnroll(payload)
		},
		competitionMatchInfo(context, payload) {
			return Api.competitionMatchInfo(payload)
		},
		competitionMatchExpertList(context, payload) {
			return Api.competitionMatchExpertList(payload)
		},
		competitionMatchUserList(context, payload) {
			return Api.competitionMatchUserList(payload)
		},
		competitionDetailInfo(context, payload) {
			return Api.competitionDetailInfo(payload)
		},
		competitionSaveAnswer(context, payload) {
			return Api.competitionSaveAnswer(payload)
		},
		competitionSave(context, payload) {
			return Api.competitionSave(payload)
		},
		competitionOperationList(context, payload) {
			return Api.competitionOperationList(payload)
		},
		competitionCommentList(context, payload) {
			return Api.competitionCommentList(payload)
		},
		competitionDeleteComment(context, payload) {
			return Api.competitionDeleteComment(payload)
		},		
		competitionSortRankInfo(context, payload) {
			return Api.competitionSortRankInfo(payload)
		},
		competitionSortRankList(context, payload) {
			return Api.competitionSortRankList(payload)
		},
		competitionNewsList(context, payload) {
			return Api.competitionNewsList(payload)
		},
		competitionNewsInfo(context, payload) {
			return Api.competitionNewsInfo(payload)
		},
	},
	modules: {
		snackbar
	},
	getters: {
		userinfo: state => state.userinfo
	}
})
