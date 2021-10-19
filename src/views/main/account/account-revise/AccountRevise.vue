<template>
	<div class="change-password">
		<h1>修改账号</h1>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="旧密码" prop="oldPwd">
				<el-input show-password type="password" v-model="ruleForm.oldPwd" clearable></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPwd">
				<el-input show-password type="password" v-model="ruleForm.newPwd" clearable></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input show-password type="password" v-model="ruleForm.checkPass" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { checkOldPwd, updatePwd } from 'api/api'
import { getCache } from '@/utils/localCache'

export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码👿👿👿'))
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码👿👿👿'))
			} else if (value !== this.ruleForm.newPwd) {
				callback(new Error('两次输入密码不一致👿👿👿!'))
			} else {
				callback()
			}
		}

		return {
			ruleForm: {
				newPwd: '',
				checkPass: '',
				oldPwd: ''
			},
			rules: {
				oldPwd: [
					{ required: true, message: '请输入旧密码👿👿👿', trigger: 'blur' },
					{
						pattern: /^[a-zA-Z0-9]{4,16}$/,
						message: '密码必须是6~16个字母或者数字~',
						trigger: 'blur'
					}
				],
				newPwd: [
					{
						validator: validatePass,
						required: true,
						trigger: 'blur'
					}
				],
				checkPass: [
					{
						validator: validatePass2,
						required: true,
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					const { id } = getCache('userInfo')
					const res = await checkOldPwd({ id, oldPwd: this.ruleForm.oldPwd })
					if (!res.code) {
						const result = await updatePwd({ id, newPwd: this.ruleForm.newPwd })
						if (!result.code) {
							this.Message.success({ message: '修改密码成功,请重新登录🚀🚀🚀' })
							setTimeout(() => this.$router.replace({ path: '/login' }), 1500)
						} else {
							this.Message.error({ message: '修改密码错误🤬🤬🤬' })
						}
						console.log(result)
					} else {
						this.Message.error({ message: '原密码错误🤬🤬🤬' })
					}
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		}
	}
}
</script>

<style lang="less" scoped>
.change-password {
	width: 100%;
	background-color: #fff;
	border-radius: 15px;
	overflow: hidden;

	h1 {
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #dcdfe6;
		padding-left: 20px;
	}

	.el-form-item {
		margin: 30px 0;
		width: 500px;
	}
}
</style>
