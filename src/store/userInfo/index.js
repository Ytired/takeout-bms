import { getAccountInfo } from 'api/api'
// import { getCache } from '@/utils/localCache'

const userInfo = {
	namespaced: true,
	state: () => ({
		userInfo: {}
	}),
	mutations: {
		changeUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		async actionUserInfo({ commit }, id) {
			const data = await getAccountInfo(id)
			commit('changeUserInfo', data.accountInfo)
		}
	},
	getters: {}
}

export default userInfo
