import Vue from 'vue'
import Vuex from 'vuex'
import order from './order'
import userInfo from './userInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		order,
		userInfo
	}
})

export default store
