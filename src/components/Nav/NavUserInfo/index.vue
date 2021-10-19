<template>
	<div class="user">
		<el-dropdown @command="toUserInfo">
			<span class="el-dropdown-link">
				<span>
					欢迎您！
					<strong>{{ userInfo.account }}</strong>
				</span>
				<el-avatar class="avatar" :src="userInfo.imgUrl"></el-avatar>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="exit">
					<i class="el-icon-circle-close"></i>
					退出登录
				</el-dropdown-item>
				<el-dropdown-item divided command="to">
					<i class="el-icon-user"></i>
					用户信息
				</el-dropdown-item>
				<el-dropdown-item>
					<i class="el-icon-s-tools"></i>
					系统管理
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
import { deleteCache } from '@/utils/localCache'

export default {
	props: {
		userInfo: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		toUserInfo(command) {
			if (command === 'to') {
				this.$router.push('/main/userInfo')
				return true
			}
			if (command === 'exit') {
				deleteCache('userInfo')
				this.$notify({
					title: '退出登录',
					type: 'success'
				})
				setTimeout(() => this.$router.push('/login'), 300)
				return true
			}
			return false
		}
	}
}
</script>

<style scoped lang="less">
.el-dropdown-link {
	cursor: pointer;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;

	.el-avatar {
		margin-left: 5px;
		margin-right: 5px;
	}

	&:hover {
		color: #409eff;
	}
}

.el-icon-arrow-down {
	font-size: 12px;
}

.el-dropdown-menu__item:hover {
	background-color: #ecf5ff;
	color: #66b1ff;
}
</style>
