export const contentTableConfig = {
	title: '账号列表',
	propList: [
		{ prop: 'account', label: '账号', minWidth: '100' },
		{ prop: 'userGroup', label: '用户组', minWidth: '100' },
		{ prop: 'ctime', label: '创建时间', minWidth: '100' },
		{ label: '操作', minWidth: '100', slotName: 'operate' }
	],
	isShowBtn: false,
	showSelectColumn: true,
	isShowOperateBtn: true
}
