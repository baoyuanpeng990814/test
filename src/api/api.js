import axios from 'axios'

const service = axios.create({
    baseURL: '/',
    timeout: 30000 // 设置请求超时时间
})