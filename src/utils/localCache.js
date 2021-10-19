// 写入
export function setCache(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value))
}

// 读取
export function getCache(key) {
	const value = window.localStorage.getItem(key)
	if (value) return JSON.parse(value)
}

// 移除
export function deleteCache(key) {
	window.localStorage.removeItem(key)
}

// 清除
export function clearCache() {
	window.localStorage.clear()
}
