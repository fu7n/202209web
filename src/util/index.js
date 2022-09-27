import axios from "axios";
import md5 from 'js-md5'
import Vue from "vue";

Vue.prototype.$md5 = md5;

const paramsL = {
    appid: "admin",
    api_secret: "admin",
    timestamp: Date.parse(new Date()) / 1000,
}
const jiami = md5(md5(paramsL.appid + paramsL.api_secret + paramsL.timestamp))
// console.log(jiami)


const request = axios.create({
    baseURL: 'https://www.hnssqyl.com/api.php/',
    timeout: 5000,
    url: 'https://www.hnssqyl.com',
    headers: {
        //请求头，可以不写
    }
})

///发送请求的配置项
request.interceptors.request.use((config) => {
    if (config.method === 'get') {
        console.log('信息正在加载中')
        config.params = {
            appid: paramsL.appid,
            timestamp: paramsL.timestamp,
            signature: jiami,
            ...config.params
        }
    } else if (config.method === 'post') {
        config.params = {
            appid: paramsL.appid,
            timestamp: paramsL.timestamp,
            signature: jiami,
        }
        config.data = {
            ...config.data
        }
        config.headers = {
            "Content-Type": "multipart/form-data",
            ...config.headers,

        }
    }

    // console.log(config)

    const token = localStorage.getItem('token')
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Beare ${token}`
        }
    }
    return config
}, (error) => {
    console.log('超市测试，不要怪自己，都是后台的错')
    return Promise.reject(error)
})


///返回请求的配置项
request.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log('超时测试，不要怪自己，都是后台的错')

    return Promise.reject(error)
})

export default request;