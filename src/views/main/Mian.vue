<template>
	<div class="main">
		<el-container class="main-container">
			<el-aside width="200px">
				<NavMenu @menuInfo="menuInfo" />
			</el-aside>
			<el-container>
				<el-header>
					<Nav />
				</el-header>
				<el-main>
					<el-card>
						<transition name="main">
							<router-view></router-view>
						</transition>
					</el-card>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Nav from 'components/Nav'
import NavMenu from 'components/NavMenu'

export default {
	components: {
		Nav,
		NavMenu
	},
	data() {
		return {
			menus: []
		}
	},
	methods: {
		menuInfo(menu) {}
	}
}
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;

	.main-container {
		width: 100%;
		height: 100%;

		.el-aside {
			overflow-x: hidden;
			overflow-y: auto;
			text-align: left;
			cursor: pointer;
			transition: width 0.3s linear;
			scrollbar-width: none; /* firefox */
			-ms-overflow-style: none; /* IE 10+ */

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.el-header {
			display: flex;
			align-items: center;
			border-radius: 15px;
		}

		.el-main {
			padding: 20px 20px 0;
			background-color: #f1f2f6;
			border-radius: 15px;

			.main-enter-active,
			.main-leave-active {
				transition: all 0.2s;
			}
			.main-enter-to, .main-leave-to /* .fade-leave-active below version 2.1.8 */ {
				opacity: 0;
				transform: translateX(10px);
			}
		}
	}
}
</style>
