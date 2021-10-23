const order = {
	namespaced: true,
	state: {
		crumbs: []
	},
	mutations: {
		changeCrumbs(state, crumbs) {
			state.crumbs = crumbs
		}
	},
	actions: {
		actionCrumbs({ commit }, crumbsArr) {
			commit('changeCrumbs', crumbsArr)
		}
	},
	getters: {}
}

export default order
