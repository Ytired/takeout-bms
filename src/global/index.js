import registerElement from './register-element'

// 全局注册
export default function globalRegister(Vue) {
	// 使用插件
	Vue.use(registerElement)
}
