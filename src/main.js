import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './axios'
import './assets/global.scss'
import common from './apis/common.js'
import * as echarts from 'echarts'
import videojs from 'video.js'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.prototype.$common = common
Vue.prototype.$echarts = echarts
Vue.prototype.$videojs = videojs
Vue.prototype.$serverURL = 'http://121.89.192.110:8088/'
// Vue.prototype.$serverURL = 'http://192.168.10.114:8089/'


document.addEventListener('plusready', function() { //添加一个点击事件监控返回按钮
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function() {
    webview.canBack(function(e) {
      if ( e.canBack() ) {
        webview.back(); //如果有上一个路由则直接返回上一个路由页面
      } else { //如果没有则询问是否要退出应用，或者执行其他操作
        if (confirm("确定要退出应用吗？")) {
            txt = "确定";
          } else {
            txt = "取消";
          }
          if (txt === "确定") {
            webview.close(); //关闭应用  
        }
      }
    })
  });
});
new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
