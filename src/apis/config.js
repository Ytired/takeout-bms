import Request from './index.js'

const request = new Request({
	baseURL: 'http://127.0.0.1:3000',
	timeout: 10000,
	// 实例拦截器配置
	interceptor: {
		// 配置请求拦截器
		requestInterceptor: config => config,
		// 配置请求失败拦截器
		requestInterceptorCatch: error => error,
		// 配置相应拦截器
		responseInterceptor: res => res,
		// 配置响应失败拦截器
		responseInterceptorCatch: error => error
	}
})

export { request }
