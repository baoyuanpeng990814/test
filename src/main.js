import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'

import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import './plugins/element.js'
// 导入字体图标 阿里妈妈
import './fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

// 配置 axios(实现Ajax的异步请求)
import axios from 'axios'
// 配置axios请求的根路径

import jq from 'jquery' // 导入jquery

// 引入视频播放插件
import VideoPlayer from 'vue-video-player'

// 引入视频组件
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)
// 导入echart
Vue.prototype.$echarts = echarts

// 使用vuex
Vue.use(Vuex)

// 富文本
Vue.use(VueQuillEditor)

//
// http://192.168.10.116:8088
// http://127.0.0.1:8888/api/private/v1/

Vue.prototype.$jquery = jq// 导入jquery
// 正式地址
// Vue.prototype.$serverURL = 'http://121.89.192.110:8088/'
// axios.defaults.baseURL = 'http://121.89.192.110:8088/'
// 测试地址
Vue.prototype.$serverURL = 'http://121.89.192.110:8089/'
axios.defaults.baseURL = 'http://121.89.192.110:8089/'

axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
// 把axios挂载到vue的原型对象上 （必须操作否则无法实现异步操作）
Vue.prototype.$http = axios // 可以通过this直接访问到http从而去发起axios请求
Vue.config.productionTip = false

export const store = new Vuex.Store({
  state: {
    userinfo: {},
    role: {}
  },
  mutations: {
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
    },
    updateRole(state, role) {
      state.role = role
    }
  },
  getters: {
    userinfo: state => state.userinfo,
    role: state => state.role
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
