import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCache } from '@/utils/localCache'
import { checkToken } from 'api/api'
import store from '@/store'

Vue.use(VueRouter)

// 路由懒加载
const NotFound = () => import(/* webpackChunkName: "NotFound" */ 'views/not-found/NotFound.vue')
const Main = () => import(/* webpackChunkName: "Main" */ 'views/main/Mian.vue')
const Login = () => import(/* webpackChunkName: "Login" */ 'views/login/Login.vue')
const Home = () => import(/* webpackChunkName: "Main-Home" */ 'views/main/home/Home')
const Order = () => import(/* webpackChunkName: "Main-Order" */ 'views/main/order/Order')
const Shop = () => import(/* webpackChunkName: "Main-Shop" */ 'views/main/shop/Shop')
const ProductAdd = () =>
	import(/* webpackChunkName: "Main-Product-Add" */ 'views/main/product/product-add/ProductAdd')
const ProductCategory = () =>
	import(
		/* webpackChunkName: "Main-Product-Category" */ 'views/main/product/product-category/ProductCategory'
	)
const ProductList = () =>
	import(/* webpackChunkName: "Main-Product-List" */ 'views/main/product/product-list/ProductList')
const AccountAdd = () =>
	import(/* webpackChunkName: "Main-Account-Add" */ 'views/main/account/account-add/AccountAdd')
const AccountList = () =>
	import(/* webpackChunkName: "Main-Account-List" */ 'views/main/account/account-list/AccountList')
const AccountRevise = () =>
	import(
		/* webpackChunkName: "Main-Account-Revise" */ 'views/main/account/account-revise/AccountRevise'
	)
const OrderStatistics = () =>
	import(
		/* webpackChunkName: "Main-Sales-Order" */ 'views/main/sales/order-statistics/OrderStatistics'
	)
const SalesStatistics = () =>
	import(
		/* webpackChunkName: "Main-Sales-Sales" */ 'views/main/sales/sales-statistics/SalesStatistics'
	)
const UserInfo = () => import('views/main/userInfo/UserInfo')

// 定义路由匹配规则
const routes = [
	{
		path: '/',
		redirect: '/main/home'
	},
	{
		nama: 'main',
		path: '/main',
		redirect: '/main/home',
		component: Main,
		children: [
			{
				name: 'userInfo',
				path: 'userInfo',
				component: UserInfo
			},
			{
				name: 'home',
				path: 'home',
				component: Home
			},
			{
				name: 'order',
				path: 'order',
				component: Order
			},
			{
				name: 'shop',
				path: 'shop',
				component: Shop
			},
			{
				name: 'accound-add',
				path: 'account/add',
				component: AccountAdd
			},
			{
				name: 'accound-list',
				path: 'account/list',
				component: AccountList
			},
			{
				name: 'accound-revise',
				path: 'account/revise',
				component: AccountRevise
			},
			{
				name: 'product-add',
				path: 'product/add',
				component: ProductAdd
			},
			{
				name: 'product-category',
				path: 'product/category',
				component: ProductCategory
			},
			{
				name: 'product-list',
				path: 'product/list',
				component: ProductList
			},
			{
				name: 'sales-sales',
				path: 'sales/salesStatistics',
				component: SalesStatistics
			},
			{
				name: 'sales-order',
				path: 'sales/orderStatistics',
				component: OrderStatistics
			}
		]
	},
	{
		name: 'login',
		path: '/login',
		component: Login
	},
	{
		path: '*',
		name: 'notFound',
		component: NotFound
	}
]

const router = new VueRouter({
	routes
})

// /使用push的方法
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
	return RouterPush.call(this, to).catch(err => err)
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
	const token = getCache('userInfo')?.token
	const id = getCache('userInfo')?.id
	if (to.fullPath !== '/login') {
		const res = await checkToken(token)
		if (token === undefined || res?.code === 1) {
			router.push('/login')
		} else {
			store.dispatch('userInfo/actionUserInfo', id)
		}
	}
	next()
})

export default router
