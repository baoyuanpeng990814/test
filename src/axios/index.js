import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.baseURL ='http://121.89.192.110:8088/'
/* axios.defaults.baseURL ='http://121.89.192.110:8089/' */
axios.interceptors.request.use(function(config) {
	config.headers.token = window.sessionStorage.getItem("token")
	return config;
}, function(error) {

	return Promise.reject(error);
});

export default axios
