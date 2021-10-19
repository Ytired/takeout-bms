<template>
	<div class="home-content">
		<Card v-bind="reportData" />
		<Charts :reportData="reportData" width="1650" />
	</div>
</template>

<script>
import Card from 'components/Card'
import Charts from 'components/Charts'
import { getHomeReportData } from 'api/api'

export default {
	data() {
		return {
			reportData: {}
		}
	},
	components: {
		Card,
		Charts
	},
	async created() {
		const res = await getHomeReportData()
		res.title = '数据统计'
		this.reportData = res
	}
}
</script>

<style lang="less" scoped></style>
