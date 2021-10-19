export const contentTableConfig = {
	title: '商品分类',
	propList: [
		{ prop: 'serialNumber', label: '序号', minWidth: '100' },
		{ prop: 'cateName', label: '分类名称', minWidth: '100' },
		{ prop: 'isEnable', label: '是否启用', minWidth: '100', slotName: 'switchBtn' },
		{ label: '操作', minWidth: '100', slotName: 'operate' }
	],
	isShowBtn: true
}
