<template>
	<div class="nav-menu">
		<div class="logo">
			<img class="img" src="~@/assets/images/logo.svg" alt="" />
			<span class="title">外卖管理系统</span>
		</div>
		<el-menu
			:default-active="this.$route.path"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@select="selectMenu"
			:unique-opened="true"
		>
			<template v-for="(item, index) in navList">
				<!-- 一级路由 -->
				<el-menu-item
					v-if="!(item.children && item.children.length)"
					:index="item.path"
					:key="index"
					@click="handleItemClick(item)"
				>
					<i :class="item.icon"></i>
					<span slot="title">{{ item.title }}</span>
				</el-menu-item>

				<!-- 二级路由 -->
				<el-submenu v-else :index="item.children[0].path" :key="item.title">
					<template #title>
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
					</template>
					<el-menu-item-group v-for="(menu, index) in item.children" :key="index">
						<el-menu-item @click="handleItemClick(menu)" :index="menu.path">
							{{ menu.title }}
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
import { routerList } from './config'
import { EventBus } from '@/utils/eventBus'

export default {
	emits: ['menuInfo'],
	data() {
		return {
			isCollapse: true,
			navList: [],
			crumbs: []
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			// if (key !== this.$route.path) {
			// 	setTimeout(() => {
			// 		this.$router.push(key)
			// 	}, 200)
			// }
			// return
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		handleItemClick(menu) {
			if (menu.path !== this.$route.path) {
				this.$router.push(menu.path)
			}
			return
		},
		selectMenu(index, indexPath) {
			const crumbs = []
			// 遍历拿到路由树里面的title
			for (const menu of routerList) {
				if (index === menu?.path) {
					crumbs.push(menu.title)
				} else {
					if (menu.children) {
						for (const menuChild of menu.children) {
							if (index === menuChild?.path) {
								crumbs.push(menu.title, menuChild.title)
							}
						}
					}
				}
			}

			// 触发事件
			this.$store.dispatch('order/actionCrumbs', crumbs)
		}
	},
	created() {
		this.navList = routerList
		this.selectMenu(this.$route.fullPath)
	},
	destroyed() {
		EventBus.$off()
	},
	watch: {
		$route(to) {
			this.selectMenu(to.path)
		}
	}
}
</script>

<style lang="less" scoped>
.nav-menu {
	height: 100%;
	.el-menu-vertical-demo {
		border-right: none;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.logo {
		width: 100%;
		height: 50px;
		display: flex;
		padding: 12px 0;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		margin-bottom: 20px;

		.img {
			height: 80%;
			margin: 8px 8px;
		}

		.title {
			width: 100%;
			font-size: 16px;
			font-weight: 700;
			color: rgb(0, 0, 0);
			text-align: center;
		}
	}
}
</style>
