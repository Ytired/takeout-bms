import { request } from './config'

export function handleLogin(data) {
	return request.post({
		url: '/users/checkLogin',
		data
	})
}

// 验证token
export function checkToken(token) {
	return request.get({
		url: `/users/checktoken/?token=${token}`,
		showLoading: false
	})
}

// 请求用户列表
export function getUserList(currentPage, pageSize) {
	return request.get({
		url: '/users/list',
		params: {
			currentPage,
			pageSize
		}
	})
}

// 添加账号
export function getAddUser(data) {
	return request.post({
		url: '/users/add',
		data
	})
}

// 订单列表
export function getOrderList(currentPage, pageSize, args) {
	return request.get({
		url: '/order/list',
		params: {
			currentPage,
			pageSize,
			...args
		}
	})
}

// 获取商品列表
export function getProductList(currentPage, pageSize) {
	return request.get({
		url: '/goods/list',
		params: {
			currentPage,
			pageSize
		}
	})
}

// 获取商品分类列表
export function getProductCategoryList(currentPage, pageSize) {
	return request.get({
		url: '/goods/catelist',
		params: {
			currentPage,
			pageSize
		}
	})
}

// 获取账号信息
export function getAccountInfo(userId) {
	return request.get({
		url: '/users/accountinfo',
		params: {
			id: userId
		}
	})
}

//修改订单信息
export function changeOrderInfo(data) {
	return request.post({
		url: '/order/edit',
		data
	})
}

// 修改商品
export function changeGoodsInfo(data) {
	return request.post({
		url: '/goods/edit',
		data
	})
}

// 修改分类
export function changeCategoryInfo(data) {
	return request.post({
		url: '/goods/editcate',
		data
	})
}

// 修改账号
export function changeAccountInfo(data) {
	return request.post({
		url: '/users/editcate',
		data
	})
}

// 删除订单
export function deleteOrder(id) {
	return request.delete({
		url: '/order/delete',
		data: { id }
	})
}

// 删除商品分类
export function deleteCategory(id) {
	return request.get({
		url: '/goods/delcate',
		params: {
			id
		}
	})
}

// 删除商品
export function deleteGoods(id) {
	return request.get({
		url: '/goods/del',
		params: {
			id
		}
	})
}

// 删除账号
export function deleteAccount(id) {
	return request.get({
		url: '/users/del',
		params: {
			id
		}
	})
}

// 批量删除账号
export function batchDeleteAccount(args) {
	return request.get({
		url: '/users/batchdel',
		params: {
			ids: JSON.stringify(args)
		}
	})
}

// 添加商品
export function addGoods(data) {
	return request.post({
		url: '/goods/add',
		data
	})
}

// 添加分类
export function addCategory(data) {
	return request.post({
		url: '/goods/addcate',
		data
	})
}

// 检查旧密码
export function checkOldPwd(params) {
	return request.get({
		url: '/users/checkoldpwd',
		params
	})
}

// 修改密码
export function updatePwd(data) {
	return request.post({
		url: '/users/editpwd',
		data
	})
}

// 获取所有分类
export function getCategorys() {
	return request.get({
		url: '/goods/categories'
	})
}

// 获取店铺详情
export function getShopDetails() {
	return request.get({
		url: '/shop/info'
	})
}

// 修改店铺内容
export function changeShopDetails(data) {
	return request.post({
		url: '/shop/edit',
		data
	})
}

//头像上传
// export function changeAvatar(id) {
// 	return request.post({
// 		url: '/users/avatar_upload',
// 		data: { id }
// 	})
// }

// 获取首页报表数据
export function getHomeReportData() {
	return request.get({
		url: '/order/totaldata'
	})
}

// 获取订单报表数据
export function getOrderReportData(date = '["2019-10-01 00:00:00", "2019-10-10 00:00:00"]') {
	return request.get({
		url: '/order/ordertotal',
		params: {
			date
		}
	})
}
