export function handleData(res) {
	return res.data
		?.map((el, index) => ({
			...el,
			serialNumber: index + 1
		}))
		.map(el => {
			el.state = Boolean(el.state)
			return el
		})
}
