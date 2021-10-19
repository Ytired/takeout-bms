<template>
	<el-form inline :model="searchData" label-width="width" ref="search" :rules="rules">
		<el-form-item label="订单号" prop="orderNo">
			<el-input placeholder="订单号" v-model="searchData.orderNo"></el-input>
		</el-form-item>

		<el-form-item label="收货人" prop="consignee">
			<el-input placeholder="收货人" v-model="searchData.consignee"></el-input>
		</el-form-item>

		<el-form-item label="手机号" prop="phone">
			<el-input placeholder="手机号" v-model="searchData.phone"></el-input>
		</el-form-item>

		<el-form-item label="订单状态" prop="orderState">
			<el-select placeholder="订单状态" v-model="searchData.orderState">
				<el-option label="派送中" value="派送中"></el-option>
				<el-option label="已受理" value="已受理"></el-option>
				<el-option label="已完成" value="已完成"></el-option>
			</el-select>
		</el-form-item>

		<br />
		<el-form-item prop="date">
			选择时间
			<el-date-picker
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				v-model="searchData.date"
				value-format="yyyy-MM-dd hh:mm:ss"
			></el-date-picker>
			<el-button type="primary" @click="handleSearch">查询</el-button>
			<el-button @click="resetForm('search')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { rules } from './config'

export default {
	components: {},
	data() {
		return {
			rules,
			searchData: {
				orderNo: '',
				consignee: '',
				phone: '',
				orderState: '',
				date: ''
			}
		}
	},
	methods: {
		handleSearch() {
			const data = {}
			// 遍历
			for (const key in this.searchData) {
				if (this.searchData.hasOwnProperty(key) && this.searchData[key] !== '') {
					data[key] = this.searchData[key]
				}
			}
			this.$emit('searchData', data)
		},
		resetForm(formName) {
			console.log(this.$refs[formName])
			setTimeout(() => {
				this.$refs[formName].resetFields()
			}, 0)
		}
	}
}
</script>

<style lang="less" scoped>
.el-date-editor {
	margin: 0 10px;
}
</style>
