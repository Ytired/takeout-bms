<template>
	<div class="change-password">
		<h1>添加账号</h1>
		<el-form
			:model="accountInfo"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="账号" prop="account">
				<el-input v-model="accountInfo.account" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="accountInfo.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户组">
				<el-select v-model="accountInfo.userGroup" placeholder="请选择用户组">
					<el-option label="超级管理员" value="超级管理员"></el-option>
					<el-option label="普通管理员" value="普通管理员"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { rules } from './config'
import { getAddUser } from 'api/api'
import { success, error } from '@/utils/notify'

export default {
	data() {
		return {
			rules,
			accountInfo: {
				account: '',
				password: '',
				userGroup: ''
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					const res = await getAddUser(this.accountInfo)
					if (res.code === 0) {
						success('添加成功')
					} else {
						error('添加失败,用户存在数据库')
						return false
					}
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
