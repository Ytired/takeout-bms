import axios from 'axios'
import { Loading } from 'element-ui'
const DEAFULT_LOADING = true

export default class Request {
	constructor(config) {
		// 配置实例loading基本配置
		this.showLoading = config.showLoading ?? DEAFULT_LOADING
		// 创建实例
		this.instance = axios.create(config)
		// 去除拦截器
		this.interceptor = config.interceptor

		// 为单独的实例添加请求拦截
		this.instance.interceptors.response.use(
			// 取出请求拦截
			this.interceptor?.requestInterceptor,
			// 取出请求错误捕获
			this.interceptor?.requestInterceptorCatch
		)
		// 为单独的实例添加响应拦截
		this.instance.interceptors.response.use(
			// 取出响应拦截
			this.interceptor?.responseInterceptor,
			// 取出错误响应拦截
			this.interceptor?.responseInterceptorCatch
		)

		// 为所有实例添加请求拦截
		this.instance.interceptors.request.use(
			config => {
				// 判断是否开启loding加载
				if (this.showLoading) {
					this.loading = Loading.service({
						text: '正在加载中🚀🚀🚀客官请稍后~',
						background: 'rgba(0,0,0,0.5)',
						spinner: 'el-icon-loading',
						loading: true
					})
				}
				return config
			},
			error => {
				console.log('请求出错啦👿👿👿~', error)
				return error
			}
		)

		// 为所有实例添加响应拦截
		this.instance.interceptors.response.use(
			res => {
				// 对数据进行处理
				const data = res.data
				// 收到响应关闭loding
				this.loading?.close()
				return data
			},
			error => {
				// 将loading移除
				this.loading?.close()
				if (error.response.status === 404) {
					console.log('404的错误~')
				}
				return error
			}
		)
	}

	request(config) {
		return new Promise((resolve, reject) => {
			// 单独的请求拦截处理
			if (config.interceptor?.requestInterceptor) {
				config = config.interceptor.requestInterceptor(config)
			}

			// 关闭loading
			if (config.showLoading === false) {
				this.showLoading = config.showLoading
			}

			// 发送请求
			this.instance
				.request(config)
				.then(res => {
					// 将showLoading设置为true避免影响下一个请求
					this.showLoading = DEAFULT_LOADING

					// 单独的响应拦截器处理
					if (config.interceptor?.responseInterceptor) {
						res = config.interceptor?.responseInterceptor(res)
					}
					resolve(res)
				})
				.catch(error => {
					// 将showLoading设置为true避免影响下一个请求
					this.showLoading = DEAFULT_LOADING

					console.log('捕获到错误啦~', error)
					reject(error)
					return error
				})
		})
	}

	// get请求
	get(config) {
		return this.request({ ...config, method: 'GET' })
	}

	// post请求
	post(config) {
		return this.request({ ...config, method: 'POST' })
	}

	// delete请求
	delete(config) {
		return this.request({ ...config, method: 'DELETE' })
	}

	// patch请求
	patch(config) {
		return this.request({ ...config, method: 'PATCH' })
	}
}
