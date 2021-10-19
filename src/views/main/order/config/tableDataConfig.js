export const tableDataConfig = {
	propList: [
		{ prop: 'orderNo', label: '订单号', minWidth: 50 },
		{ prop: 'orderTime', label: '下单时间', minWidth: 70 },
		{ prop: 'phone', label: '手机号', minWidth: 100 },
		{ prop: 'consignee', label: '收货人', minWidth: 50 },
		{ prop: 'deliverAddress', label: '配送地址', minWidth: 80 },
		{ prop: 'deliveryTime', label: '送达时间', minWidth: 70 },
		{ prop: 'remarks', label: '用户备注', minWidth: 80 },
		{ prop: 'orderAmount', label: '订单金额', minWidth: 50 },
		{ prop: 'orderState', label: '订单状态', minWidth: 40 },
		{ label: '操作', minWidth: 100, slotName: 'operate' }
	],
	isShow: true
}
