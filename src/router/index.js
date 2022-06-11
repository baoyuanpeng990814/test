import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import MyStudy from '../views/Study/MyStudy.vue'
import MyCourses from '../views/Study/MyCourses.vue'
import MyExams from '../views/Study/MyExams.vue'
import Acquisition from '../views/Study/Acquisition.vue'
import CourseHome from '../views/Course/CourseHome.vue'
import CourseList from '../views/Course/CourseList.vue'
import CourseCategory from '../views/Course/CourseCategory.vue'
import CoursePurchase from '../views/Course/CoursePurchase.vue'
import CoursePreview from '../views/Course/CoursePreview.vue'
import ExamHome from '../views/Exams/ExamHome.vue'
import Exam from '../views/Exams/Exam.vue'
import UserInfo from '../views/Mine/UserInfo.vue'
import Mine from '../views/Mine/Mine.vue'
import ChangePassword from '../views/Mine/ChangePassword.vue'
import InvestigationHome from '../views/Investigation/InvestigationHome.vue'
import Questionary from '../views/Investigation/Questionary.vue'
import MyArchives from '../views/Study/MyArchives.vue'
import MenuIndex from '../views/Menu/MenuIndex.vue'
import News from '../views/Organize/News.vue'
import MyFiles from '../views/Files/MyFiles.vue'
import MessageHome from '../views/Message/MessageHome.vue'
import MessageList from '../views/Message/MessageList.vue'
import StudyRecord from '../views/Study/StudyRecord.vue'
import ContestIndex from '../views/Contest/ContestIndex.vue'
import ExerciseList from '../views/Exams/ExerciseList.vue'
import Exercise from '../views/Exams/Exercise.vue'
import ExamList from '../views/Exams/ExamList.vue'
import NewsDetail from '../views/Message/NewsDetail.vue'
import Score from '../views/Exams/Score.vue'
import Video from '../views/Contest/Video.vue'
import Test from '../views/Test.vue'
import Intrudes from '../views/Contest/Intrudes.vue'
import VideoScoreList from '../views/Contest/VideoScoreList.vue'
import RankList from '../views/Contest/RankList.vue'
import Final from '../views/Contest/Final.vue'
import ExamResult from '../views/Contest/ExamResult.vue'
import RankResult from '../views/Contest/RankResult.vue'
import ServiceSort from '../views/Contest/ServiceSort.vue'
import ExpertList from '../views/Contest/ExpertList.vue'
import ChooseLevel from '../views/Contest/ChooseLevel.vue'
import PreliminariesRank from '../views/Contest/PreliminariesRank.vue'
import Review from '../views/Exams/Review.vue'
import ContestList from '../views/Contest/ContestList.vue'
import ContestExam from '../views/Contest/Exam.vue'
import ContestNews from '../views/Contest/NewsDetail.vue'
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		children: [{
				path: '/mystudy',
				name: 'MyStudy',
				component: MyStudy,
				children: [ ],			
			}, {
				path: '/coursecategory',
				name: 'CourseCategory',
				component: CourseCategory
			}, {
				path: '/coursepurchase',
				name: 'CoursePurchase',
				component: CoursePurchase
			}, {
				path: '/coursepreview',
				name: 'CoursePreview',
				component: CoursePreview
			}, {
				path: '/userinfo',
				name: 'UserInfo',
				component: UserInfo
			}, {
				path: '/mine',
				name: 'Mine',
				component: Mine
			}, {
				path: '/changepassword',
				name: 'ChangePassword',
				component: ChangePassword
			},
			{
				path: '/menuindex',
				name: 'MenuIndex',
				component: MenuIndex
			},
			{
				path: '/news',
				name: 'News',
				component: News
			},
			{
				path: '/mycourses',
				name: 'MyCourses',
				component: MyCourses
			},
			{
				path: '/myexams',
				name: 'MyExams',
				component: MyExams
			},
			
		]
	},
	{
		path: '/exam',
		name: 'Exam',
		component: Exam
	},
	{
		path: '/messagelist',
		name: 'MessageList',
		component: MessageList
	},
	{
		path: '/contestindex',
		name: 'ContestIndex',
		component: ContestIndex,

	},
	{
		path: '/myfiles',
		name: 'MyFiles',
		component: MyFiles
	},
	{
		path: '/messagehome',
		name: 'MessageHome',
		component: MessageHome,

	},
	{
		path: '/studyrecord',
		name: 'StudyRecord',
		component: StudyRecord,

	},
	{
		path: '/coursehome',
		name: 'CourseHome',
		component: CourseHome
	},
	{
		path: '/courselist',
		name: 'CourseList',
		component: CourseList
	},
	{
		path: '/examhome',
		name: 'ExamHome',
		component: ExamHome
	},
	{
		path: '/investigationhome',
		name: 'InvestigationHome',
		component: InvestigationHome
	},
	
	{
		path: '/questionary',
		name: 'Questionary',
		component: Questionary
	},
	{
		path: '/acquisition',
		name: 'Acquisition',
		component: Acquisition,
	},
	{
		path: '/exerciselist',
		name: 'ExerciseList',
		component: ExerciseList,
	},
	{
		path: '/exercise',
		name: 'Exercise',
		component: Exercise,
	},
	{
		path: '/examlist',
		name: 'ExamList',
		component: ExamList
	},
	{
		path: '/newsdetail',
		name: 'NewsDetail',
		component: NewsDetail,
	},
	{
		path: '/myarchives',
		name: MyArchives,
		component: MyArchives
	},
	{
		path: '/score',
		name: 'Score',
		component: Score
	},
	{
		path: '/video',
		name: 'Video',
		component: Video
	},{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/intrudes',
		name: 'Intrudes',
		component: Intrudes
	},
	{
		path: '/videoscorelist',
		name: 'VideoScoreList',
		component: VideoScoreList
	},
	{
		path: '/ranklist',
		name: 'RankList',
		component: RankList
	},
	{
		path: '/final',
		name: 'Final',
		component: Final
	},
	{
		path: '/examresult',
		name: 'ExamResult',
		component: ExamResult
	},
	{
		path: '/serviceSort',
		name: 'ServiceSort',
		component: ServiceSort
	},
	{
		path: '/rankresult',
		name: 'RankResult',
		component: RankResult
	},
	{
		path: '/expertlist',
		name: 'ExpertList',
		component: ExpertList
	},
	{
		path: '/chooselevel',
		name: 'ChooseLevel',
		component: ChooseLevel
	},
	{
		path: '/preliminariesrank',
		name: 'PreliminariesRank',
		component: PreliminariesRank
	},
	{
		path: '/review',
		name: 'review',
		component: Review
	},
	{
		path: '/contestlist',
		name: 'ContestList',
		component: ContestList
	},
	{
		path: '/contestexam',
		name: 'ContestExam',
		component: ContestExam
	},
	{
		path: '/contestNews',
		name: 'ContestNews',
		component: ContestNews
	},
	
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path === '/') return next()
	const tokenstr = window.sessionStorage.getItem('token')
	if (!tokenstr) return next('/')
	next()
})

export default router



