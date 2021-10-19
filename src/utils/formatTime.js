export function formatTime(data) {
	for (const value of data) {
		if (value.deliveryTime) {
			value.deliveryTime = format(value.deliveryTime)
		}
		if (value.orderTime) {
			value.orderTime = format(value.orderTime)
		}
		if (value.ctime) {
			value.ctime = format(value.ctime)
		}
	}
}

function format(time) {
	const date = new Date(time)
	const Y = date.getUTCFullYear()
	const M = date.getUTCMonth() + 1
	const D = date.getUTCDate()
	const h = date.getUTCHours()
	const m = date.getUTCMinutes()
	const s = date.getUTCSeconds()
	return `${Y}-${zero(M)}-${zero(D)} ${zero(h)}:${zero(m)}:${zero(s)}`
}

function zero(str) {
	return str >= 10 ? str : '0' + str
}
