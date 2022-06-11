import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Welecome from './components/Welecome'
import MyStudy from './components/study/MyStudy.vue'
import Ranslates from './components/ranslate/Ranslates.vue'
import Videoplayback from './components/study/Videoplayback.vue'
import MyExam from './components/exam/MyExam.vue'
import Info from './components/user/info.vue'
import Control from './components/Control.vue'
import UserManagement from './components/control_panel/UserManagement.vue'

import HistoryList from './components/control_panel/historyList.vue'
import UserDetail from './components/control_panel/UserDetail.vue'
import UserEdit from './components/control_panel/UserEdit.vue'
import UserList from './components/control_panel/UserList.vue'
import UserCreate from './components/control_panel/UserCreate.vue'
import CourseManagement from './components/control_panel/CourseManagement.vue'
import CourseList from './components/control_panel/CourseList.vue'
import CourseCreate from './components/control_panel/CourseCreate.vue'
import CourseEdit from './components/control_panel/CourseEdit.vue'
import CourseTypeCreate from './components/control_panel/CourseTypeCreate.vue'
import CourseTypeList from './components/control_panel/CourseTypeList.vue'
import CourseTypeEdit from './components/control_panel/CourseTypeEdit.vue'
import ProgramList from './components/control_panel/ProgramList.vue'
import ProgramCreate from './components/control_panel/ProgramCreate.vue'
import ProgramEdit from './components/control_panel/ProgramEdit.vue'
import PaperList from './components/control_panel/PaperList.vue'
import PaperEdit from './components/control_panel/PaperEdit.vue'
import PaperCreate from './components/control_panel/PaperCreate.vue'
import ThemeList from './components/control_panel/ThemeList.vue'
import ThemeEdit from './components/control_panel/ThemeEdit.vue'
import ThemeCreate from './components/control_panel/ThemeCreate.vue'
import SystemManagement from './components/control_panel/SystemManagement.vue'
import OrganizationEdit from './components/control_panel/OrganizationEdit.vue'
import OrganizationCreate from './components/control_panel/OrganizationCreate.vue'
import OrganizationList from './components/control_panel/OrganizationList.vue'
import FunctionList from './components/control_panel/FunctionList.vue'
import FunctionEdit from './components/control_panel/FunctionEdit.vue'
import FunctionCreate from './components/control_panel/FunctionCreate.vue'
import RoleList from './components/control_panel/RoleList.vue'
import RoleEdit from './components/control_panel/RoleEdit.vue'
import RoleCreate from './components/control_panel/RoleCreate.vue'
import TeacherList from './components/control_panel/TeacherList'
import TeacherEdit from './components/control_panel/TeacherEdit'
import TeacherCreate from './components/control_panel/TeacherCreate'
import LogList from './components/control_panel/LogList'
import DictionaryTypeList from './components/control_panel/DictionaryTypeList.vue'
import DictionaryTypeEdit from './components/control_panel/DictionaryTypeEdit.vue'
import DictionaryTypeCreate from './components/control_panel/DictionaryTypeCreate.vue'
import DictionaryList from './components/control_panel/DictionaryList.vue'
import DictionaryEdit from './components/control_panel/DictionaryEdit.vue'
import DictionaryCreate from './components/control_panel/DictionaryCreate.vue'
import Selection from './components/study/Selection.vue'
import SelectionList from './components/study/SelectionList.vue'
import SelectionConfirm from './components/study/SelectionConfirm.vue'
import SelectionPreview from './components/study/SelectionPreview.vue'
import MyCourses from './components/study/MyCourses.vue'
import Acquisition from './components/study/Acquisition.vue'
import SourceManagement from './components/control_panel/SourceManagement.vue'
import QuestionTypeList from './components/control_panel/QuestionTypeList.vue'
import QuestionTypeCreate from './components/control_panel/QuestionTypeCreate.vue'
import QuestionTypeEdit from './components/control_panel/QuestionTypeEdit.vue'
import QuestionCategoryList from './components/control_panel/QuestionCategoryList.vue'
import QuestionCategoryCreate from './components/control_panel/QuestionCategoryCreate.vue'
import QuestionCategoryEdit from './components/control_panel/QuestionCategoryEdit.vue'
import QuestionList from './components/control_panel/QuestionList.vue'
import QuestionCreate from './components/control_panel/QuestionCreate.vue'
import QuestionEdit from './components/control_panel/QuestionEdit.vue'
import UploadQuestion from './components/control_panel/UploadQuestion.vue'
import ExamList from './components/control_panel/ExamList.vue'
import ExamHistory from './components/control_panel/examHistory.vue'
import ExamTypeCreate from './components/control_panel/ExamTypeCreate.vue'
import ExamTypeEdit from './components/control_panel/ExamTypeEdit.vue'
import ExamTypeList from './components/control_panel/ExamTypeList.vue'
import ExamCreate from './components/control_panel/ExamCreate.vue'
import ExamEdit from './components/control_panel/ExamEdit.vue'
import ExamFinder from './components/exam/ExamFinder.vue'
import Exam from './components/exam/Exam.vue'
import UserInfo from './components/mine/UserInfo.vue'
import ChangePWD from './components/mine/ChangePWD.vue'
import MyRecord from './components/statistics/MyRecord.vue'
import AnalyzationManagement from './components/control_panel/AnalyzationManagement.vue'
import ExamAnalyzation from './components/control_panel/ExamAnalyzation.vue'
import ExamAnalyzationDetail from './components/control_panel/ExamAnalyzationDetail.vue'
import StudyAnalyzation from './components/control_panel/StudyAnalyzation.vue'
import StudyAnalyzationDetail from './components/control_panel/StudyAnalyzationDetail.vue'
import QuestionaryAnalyzationList from './components/control_panel/QuestionaryAnalyzationList.vue'
import QuestionaryAnalyzationDetail from './components/control_panel/QuestionaryAnalyzationDetail.vue'
import InvestigationManagement from './components/control_panel/InvestigationManagement.vue'
import QuestionaryList from './components/control_panel/QuestionaryList.vue'
import QuestionarySortCreate from './components/control_panel/QuestionarySortCreate.vue'
import QuestionarySortEdit from './components/control_panel/QuestionarySortEdit.vue'
import InquiryList from './components/control_panel/InquiryList.vue'
import QuestionaryCreate from './components/control_panel/QuestionaryCreate.vue'
import ExamManagement from './components/control_panel/ExamManagement.vue'
import MyInvestigations from './components/investigation/MyInvestigations.vue'
import Questionary from './components/investigation/Questionary.vue'
import GraduationList from './components/control_panel/GraduationList.vue'
import GraduationConfirm from './components/control_panel/GraduationConfirm.vue'
import NewsManagement from './components/news/NewsManagement.vue'
import NewsCreate from './components/news/NewsCreate.vue'
import NewsDetail from './components/news/NewsDetail.vue'
import NewsEdit from './components/news/NewsEdit.vue'
import NewsList from './components/news/NewsList.vue'
import ContestNewsList from './components/news/ContestNewsList.vue'
import ContestNewsCreate from './components/news/ContestNewsCreate.vue'
import ContestNewsDetail from './components/news/ContestNewsDetail.vue'
import ContestNewsEdit from './components/news/ContestNewsEdit.vue'
import MessageDetail from './components/message/MessageDetail.vue'
import MessageEdit from './components/message/MessageEdit.vue'
import MessageList from './components/message/MessageList.vue'
import MessageCreate from './components/message/MessageCreate.vue'
import CarouselDetail from './components/carousel/CarouselDetail.vue'
import CarouselEdit from './components/carousel/CarouselEdit.vue'
import CarouselList from './components/carousel/CarouselList.vue'
import CarouselCreate from './components/carousel/CarouselCreate.vue'
import ContestTypeCreate from './components/contest/ContestTypeCreate.vue'
import ContestTypeEdit from './components/contest/ContestTypeEdit.vue'
import ContestTypeList from './components/contest/ContestTypeList.vue'
import ContestCreate from './components/contest/ContestCreate.vue'
import ContestEdit from './components/contest/ContestEdit.vue'
import ContestList from './components/contest/ContestList.vue'
import OperationList from './components/contest/OperationList.vue'
import RankList from './components/contest/RankList.vue'
import GroupCreate from './components/group/GroupCreate.vue'
import GroupList from './components/group/GroupList.vue'
import GroupTreeCreate from './components/group/GroupTreeCreate.vue'
import GroupTreeEdit from './components/group/GroupTreeEdit.vue'
import GroupTreeList from './components/group/GroupTreeList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // redirect:重定向
    {
      path: '/',
      redirect: '/login'
    },
    // 当用户访问login这个地址时，通过component属性来指定展示的组件
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welecome', // 路由重定向！转发列表中发向一台路由的路径改成另外一条路径
      children: [{
          path: '/mystudy',
          component: MyStudy,
          children: [{
              path: '/welecome',
              component: Welecome
            },
            {
              path: '/mycourses',
              component: MyCourses
            },
            {
              path: '/videoplayback',
              component: Videoplayback
            },
            {
              path: '/myexam',
              component: MyExam
            },
            {
              path: '/ranslates',
              component: Ranslates
            },
            {
              path: '/info',
              component: Info
            },
            {
              path: '/userinfo',
              component: UserInfo
            },
            {
              path: '/changepwd',
              component: ChangePWD
            },
            {
              path: '/myrecord',
              component: MyRecord
            }

          ]
        },
        {
          path: '/selection',
          component: Selection
        },
        {
          path: '/selectionlist',
          component: SelectionList
        },
        {
          path: '/selectionconfirm',
          component: SelectionConfirm
        }, {
          path: '/selectionpreview',
          component: SelectionPreview
        }, {
          path: '/acquisition',
          component: Acquisition
        }, {
          path: '/examfinder',
          component: ExamFinder
        },
        {
          path: '/myinvestigations',
          component: MyInvestigations
        },
        {
          path: '/questionary',
          component: Questionary,
          name: 'questionary'
        }
      ]
    },
    {
      path: '/exam',
      component: Exam,
      // redirect: '/welecome',
      name: 'exam'
    },
    {
      path: '/control',
      component: Control,
      redirect: '/welecome',
      children: [{
          path: '/usermanagement',
          component: UserManagement,
          children: [{
              path: '/userdetail',
              component: UserDetail
            },
           
            {
              path: '/useredit',
              component: UserEdit
            },
            {
              path: '/usercreate',
              component: UserCreate
            },
            {
              path: '/userlist',
              component: UserList
            },

            {
              path: '/groupcreate',
              component: GroupCreate
            },
            {
              path: '/grouplist',
              component: GroupList
            },

            {
              path: '/grouptreelist',
              component: GroupTreeList
            },
            {
              path: '/grouptreecreate',
              component: GroupTreeCreate
            }, {
              path: '/grouptreeedit',
              component: GroupTreeEdit
            }
          ]
        },

        {
          path: '/exammanagement',
          component: ExamManagement,
          children: [{
              path: '/examlist',
              component: ExamList
            }, {
              path: '/examcreate',
              component: ExamCreate
            }, {
              path: '/examHistory',
              component: ExamHistory
            }, {
              path: '/examedit',
              component: ExamEdit
            },
            {
              path: '/examtypecreate',
              component: ExamTypeCreate
            },
            {
              path: '/examtypeedit',
              component: ExamTypeEdit
            },
            {
              path: '/examtypelist',
              component: ExamTypeList
            },
            {
              path: '/contesttypecreate',
              component: ContestTypeCreate
            },
            {
              path: '/contesttypeedit',
              component: ContestTypeEdit
            },
            {
              path: '/contesttypelist',
              component: ContestTypeList
            },
            {
              path: '/contestcreate',
              component: ContestCreate
            },
            {
              path: '/contestedit',
              component: ContestEdit
            },
            {
              path: '/contestlist',
              component: ContestList
            },
            {
              path: '/operationList',
              component: OperationList
            },
            {
              path: '/rankList',
              component: RankList
            }
          ]

        }, {
          path: '/coursemanagement',
          component: CourseManagement,
          children: [{
              path: '/graduationlist',
              component: GraduationList
            }, {
              path: '/graduationconfirm',
              component: GraduationConfirm
            },
            {
              path: '/HistoryList',
              component: HistoryList
            },
            {
              path: '/courselist',
              component: CourseList
            }, {
              path: '/coursecreate',
              component: CourseCreate
            }, {
              path: '/courseedit',
              component: CourseEdit
            }, {
              path: '/coursetypecreate',
              component: CourseTypeCreate
            }, {
              path: '/coursetypelist',
              component: CourseTypeList
            }, {
              path: '/coursetypeedit',
              component: CourseTypeEdit
            }, {
              path: '/programlist',
              component: ProgramList
            }, {
              path: '/programcreate',
              component: ProgramCreate
            }, {
              path: '/programedit',
              component: ProgramEdit
            }, {
              path: '/paperlist',
              component: PaperList
            }, {
              path: '/paperedit',
              component: PaperEdit
            }, {
              path: '/papercreate',
              component: PaperCreate
            }

          ]

        }, {
          path: '/analyzationmanagement',
          component: AnalyzationManagement,
          children: [{
              path: '/examanalyzation',
              component: ExamAnalyzation
            },
            {
              path: '/examanalyzationdetail',
              component: ExamAnalyzationDetail
            },
            {
              path: '/studyanalyzation',
              component: StudyAnalyzation
            }, {
              path: '/studyanalyzationdetail',
              component: StudyAnalyzationDetail
            },
            {
              path: '/questionaryanalyzationlist',
              component: QuestionaryAnalyzationList
            }, {
              path: '/questionaryanalyzationdetail',
              component: QuestionaryAnalyzationDetail
            }

          ]
        }, {
          path: './sourcemanagement',
          component: SourceManagement,
          children: [{
              path: '/questioncategorylist',
              component: QuestionCategoryList
            },
            {
              path: '/questioncategorycreate',
              component: QuestionCategoryCreate
            },
            {
              path: '/questioncategoryedit',
              component: QuestionCategoryEdit
            },
            {
              path: '/questionlist',
              component: QuestionList
            },
            {
              path: '/questioncreate',
              component: QuestionCreate
            },
            {
              path: '/questionedit',
              component: QuestionEdit
            },

            {
              path: '/teacherlist',
              component: TeacherList
            },
            {
              path: '/teacheredit',
              component: TeacherEdit
            },
            {
              path: '/teachercreate',
              component: TeacherCreate
            },
            {
              path: '/newsdetail',
              component: NewsDetail
            },
            {
              path: '/newsedit',
              component: NewsEdit
            },
            {
              path: '/newscreate',
              component: NewsCreate
            },
            {
              path: '/newslist',
              component: NewsList
            },
            {
              path: '/contestnewsdetail',
              component: ContestNewsDetail
            },
            {
              path: '/contestnewsedit',
              component: ContestNewsEdit
            },
            {
              path: '/contestnewscreate',
              component: ContestNewsCreate
            },
            {
              path: '/contestnewslist',
              component: ContestNewsList
            },
            {
              path: '/messagedetail',
              component: MessageDetail
            },
            {
              path: '/messageedit',
              component: MessageEdit
            },
            {
              path: '/messagecreate',
              component: MessageCreate
            },
            {
              path: '/messagelist',
              component: MessageList
            },
            {
              path: '/carouseldetail',
              component: CarouselDetail
            },
            {
              path: '/carouseledit',
              component: CarouselEdit
            },
            {
              path: '/carouselcreate',
              component: CarouselCreate
            },
            {
              path: '/carousellist',
              component: CarouselList
            }

          ]
        }, {
          path: 'investigationmanagement',
          component: InvestigationManagement,
          children: [{
            path: '/questionarylist',
            component: QuestionaryList
          }, {
            path: '/questionarysortcreate',
            component: QuestionarySortCreate
          }, {
            path: '/questionarysortedit',
            component: QuestionarySortEdit
          }, {
            path: '/inquirylist',
            component: InquiryList
          }, {
            path: '/questionarycreate',
            component: QuestionaryCreate
          }]
        },
        {
          path: '/systemmanagement',
          component: SystemManagement,
          children: [{
              path: '/organizationList',
              component: OrganizationList
            },
            {
              path: '/organizationedit',
              component: OrganizationEdit
            },
            {
              path: '/organizationcreate',
              component: OrganizationCreate
            },
            {
              path: '/functionlist',
              component: FunctionList
            },
            {
              path: '/functionedit',
              component: FunctionEdit
            },
            {
              path: '/functioncreate',
              component: FunctionCreate
            },
            {
              path: '/rolelist',
              component: RoleList
            },
            {
              path: '/roleedit',
              component: RoleEdit
            },
            {
              path: '/rolecreate',
              component: RoleCreate
            },
            {
              path: '/loglist',
              component: LogList
            },
            {
              path: '/dictionarytypelist',
              component: DictionaryTypeList
            },
            {
              path: '/dictionarytypeedit',
              component: DictionaryTypeEdit
            },
            {
              path: '/dictionarytypecreate',
              component: DictionaryTypeCreate
            }, {
              path: '/dictionarylist',
              component: DictionaryList
            }, {
              path: '/dictionaryedit',
              component: DictionaryEdit
            }, {
              path: '/dictionarycreate',
              component: DictionaryCreate
            }, {
              path: '/questiontypelist',
              component: QuestionTypeList
            }, {
              path: '/questiontypecreate',
              component: QuestionTypeCreate
            }, {
              path: '/questiontypeedit',
              component: QuestionTypeEdit
            },
            {
              path: '/uploadquestion',
              component: UploadQuestion
            }, {
              path: '/themelist',
              component: ThemeList
            }, {
              path: '/themeedit',
              component: ThemeEdit
            }, {
              path: '/themecreate',
              component: ThemeCreate
            }

          ]

        }

      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  // 获取token值
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
