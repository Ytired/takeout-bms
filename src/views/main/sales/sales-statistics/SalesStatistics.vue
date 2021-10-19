<template>
	<div class="order">
		<SelectTime />
		<Charts width="1650" :reportData="reportData" />
	</div>
</template>

<script>
import SelectTime from 'components/SelectTime'
import Charts from 'components/Charts'

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
	created() {
		setTimeout(() => {
			this.reportData = { title: '商品统计' }
		}, 0)
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
