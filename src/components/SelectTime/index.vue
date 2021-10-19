<template>
	<div class="select-time">
		<el-date-picker
			v-model="value2"
			type="daterange"
			align="right"
			unlink-panels
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			:picker-options="pickerOptions"
		></el-date-picker>
		<el-button type="primary">查询</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}
				]
			},
			value1: '',
			value2: ''
		}
	}
}
</script>

<style lang="less" scoped>
.select-time {
	height: 60px;
	line-height: 60px;
	padding-left: 20px;
	margin-top: 20px;
	margin-bottom: 50px;
	button {
		margin-left: 30px;
	}
}
</style>
