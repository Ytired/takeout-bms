import Vue from 'vue'
import { MessageBox, Message } from 'element-ui'
const duration = 2000
Vue.prototype.MessageBox = MessageBox

export function success(title) {
	Vue.prototype.$notify({
		duration,
		title,
		type: 'success'
	})
}

export function error(title) {
	Vue.prototype.$notify({
		duration,
		title,
		type: 'error'
	})
}

export function confirm(title) {
	return Vue.prototype.MessageBox.confirm(`此操作将永久删除该${title}, 是否继续?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
}
