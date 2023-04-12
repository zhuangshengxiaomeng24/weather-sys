import {createApp} from 'vue'
import App from './App.vue'
import routers from './routers'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VCharts from 'v-charts'
import store from './store/index'
import axios from 'axios';
import * as echarts from "echarts";

//请求默认地址
axios.defaults.baseURL = "http://127.0.0.1:8080/";
//请求超时时间
axios.defaults.timeout = 10000;
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
app.use(routers)
app.use(store)
app.use(VCharts)

app.mount('#app')
