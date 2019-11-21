//导入axios
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
//判断开发、生产环境
const baseURL = location.host.indexOf(".com")!==-1? "m.bestcake.com" :"/apis"
var instance = axios.create({
    baseURL,
    timeout: 3000,
    // headers请求头，默认json
    transformRequest: [
        function(data){
            //对data进行转换处理
            //在请求发出之前，拿到ajax传入的参数

            return data;
        }
    ],
    //在传递给 then/catch之前，允许修改响应数据
    transformResponse: [
        function(data){
            return data;
        }
    ],
    //默认返回数据类型
    responseType: "json"
});

//拦截器

instance.interceptors.request.use(function (config) {
    //在发请求之前做什么
    //加入通用配置  通用参数
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 10000
      });
    return config
},function(error){
    //对请求错误做些什么
    return Promise.reject(error)
});

instance.interceptors.response.use(function (response) {
    //对响应数据做什么
    Toast.clear();
    return response;
},function(error){
    //对响应错误做什么
    return Promise.reject(error);
});

export default instance;