<template>
	<el-form
		ref="loginForm"
		status-icon
		label-width="auto"
		class="loginForm sign-in-form"
		:rules="rules"
		:model="loginInfo"
	>
		<el-form-item label="账号" prop="account">
			<el-input placeholder="请输入您的用户名~" v-model.trim="loginInfo.account"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input
				type="password"
				placeholder="请输入您的密码~"
				show-password
				v-model.trim="loginInfo.password"
				clearable
				required
			></el-input>
		</el-form-item>

		<el-form-item class="login-submit">
			<el-button type="primary" class="submit-btn" @click="handleLoginBtn('loginForm')">
				登录
			</el-button>
		</el-form-item>

		<!-- 找回密码 -->
		<div class="account-info">
			<div class="remember-pwd">
				<el-checkbox>记住密码</el-checkbox>
			</div>
			<div class="tiparea">
				<p>
					忘记密码？
					<a>联系管理员</a>
				</p>
			</div>
		</div>
	</el-form>
</template>

<script>
import { setCache } from '@/utils/localCache'
import { success, error } from '@/utils/notify'
import { handleLogin } from 'api/api'
import { rules } from '../config'

export default {
	data() {
		return {
			loginInfo: {
				account: '',
				password: ''
			},
			rules
		}
	},
	methods: {
		handleLoginBtn(loginForm) {
			this.$refs[loginForm].validate(async valid => {
				if (valid) {
					const res = await handleLogin(this.loginInfo)
					if (res.code === 0) {
						setCache('userInfo', { id: res.id, role: res.role, token: res.token })
						success('登陆成功')
						this.$router.push('/main/home')
					} else {
						error('请输入正确的用户名或密码')
						return false
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.loginForm {
	margin-top: 20px;
	background-color: #fff;
	padding: 20px 40px 20px 20px;
	border-radius: 5px;
	box-shadow: 0px 5px 10px #cccc;
}

.login-submit {
	width: 100%;

	.submit-btn {
		width: 100%;
	}
}
.account-info {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.remember-pwd {
		margin-left: 13%;
	}
	.tiparea {
		text-align: right;
		font-size: 12px;
		color: #333;
	}

	.tiparea p a {
		color: #409eff;
		cursor: pointer;
	}

	.tiparea p a:hover {
		color: #278cf0;
	}
}
</style>
