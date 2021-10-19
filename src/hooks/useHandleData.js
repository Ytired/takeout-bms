import { formatTime } from '@/utils/formatTime'
export function handleData(res) {
	const productInfo = [
		{ title: '商品id' },
		{ title: '创建时间' },
		{ title: '商品名称' },
		{ title: '所属分类' },
		{ title: '商品价格' },
		{ title: '商品图片' },
		{ title: '商品描述' },
		{ title: '商品评分' },
		{ title: '商品评论' },
		{ title: '商品销量' }
	]
	formatTime(res.data)
	return res.data?.map((el, index) => {
		const keys = Object.keys(el)
		el.productInfo = productInfo.map((item, index) => {
			const value = index === 8 ? JSON.parse(el[keys[index]])[0].text : el[keys[index]]
			return {
				title: item.title,
				value
			}
		})
		return el
	})
}
