export const contentTableConfig = {
	title: '商品列表',
	propList: [
		{ prop: 'name', label: '商品名称', minWidth: '100', slotName: 'unfold' },
		{ prop: 'category', label: '所属分类', minWidth: '100' },
		{ prop: 'price', label: '商品价格', minWidth: '100' },
		{ prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
		{ prop: 'desc', label: '商品描述', minWidth: '100' },
		{ label: '操作', minWidth: '100', slotName: 'operate' }
	],
	isExpand: true
}
