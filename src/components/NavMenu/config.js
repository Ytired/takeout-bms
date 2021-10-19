const routerList = [
	{
		icon: 'el-icon-s-home',
		path: '/main/home',
		title: '后台首页'
	},
	{
		icon: 'el-icon-s-order',
		path: '/main/order',
		title: '订单管理'
	},
	{
		icon: 'el-icon-s-goods',
		title: '商品管理',
		children: [
			{ path: '/main/product/list', title: '商品列表' },
			{ path: '/main/product/add', title: '商品添加' },
			{ path: '/main/product/category', title: '商品分类' }
		]
	},
	{
		icon: 'el-icon-s-shop',
		path: '/main/shop',
		title: '店铺管理'
	},
	{
		icon: 'el-icon-setting',
		title: '账号管理',
		children: [
			{ path: '/main/account/list', title: '账号列表' },
			{ path: '/main/account/add', title: '添加账号' },
			{ path: '/main/account/revise', title: '修改密码' }
		]
	},
	{
		icon: 'el-icon-s-data',
		title: '销售统计',
		children: [
			{ path: '/main/sales/salesStatistics', title: '商品统计' },
			{ path: '/main/sales/orderStatistics', title: '订单统计' }
		]
	}
]

export { routerList }
