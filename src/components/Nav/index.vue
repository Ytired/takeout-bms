<template>
	<div class="nav-breadcrumb">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="item in crumbs" :key="item">
				{{ item }}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="user-info">
			<NavUserInfo :userInfo="userInfo" />
		</div>
	</div>
</template>

<script>
import NavUserInfo from './NavUserInfo'

export default {
	data() {
		return {
			userInfo: {}
		}
	},
	components: {
		NavUserInfo
	},
	created() {
		this.userInfo = this.$store.state.userInfo.userInfo
	},
	computed: {
		crumbs() {
			return this.$store.state.order.crumbs
		}
	}
}
</script>

<style lang="less" scoped>
.nav-breadcrumb {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.user-info {
		height: 100%;
		margin-right: 50px;
		display: flex;
		align-items: center;
	}
}
</style>
