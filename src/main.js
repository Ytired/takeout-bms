import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalRegister from './global/index'
import './assets/styles/index.less'

Vue.config.productionTip = false
// 在初始化之前调用函数
globalRegister(Vue)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
