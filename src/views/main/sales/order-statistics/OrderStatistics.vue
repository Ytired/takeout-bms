<template>
	<div class="order">
		<SelectTime />
		<Charts width="1650" :reportData="reportData" />
	</div>
</template>

<script>
import SelectTime from 'components/SelectTime'
import Charts from 'components/Charts'
import { getOrderReportData } from 'api/api'

export default {
	data() {
		return {
			reportData: {}
		}
	},
	components: {
		SelectTime,
		Charts
	},
	async created() {
		const res = await getOrderReportData()
		res.title = '堆叠区域图'
		this.reportData = res
	}
}
</script>

<style lang="less" scoped>
.order {
	width: 100%;
	background-color: #fff;
	border-radius: 15px;
	overflow: hidden;
}
</style>
