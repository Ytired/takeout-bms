<template>
	<div>
		<div
			v-show="isShow"
			id="container"
			class="container"
			ref="container"
			:style="{ width: `${width}%` }"
		></div>
		<el-empty v-show="!isShow" description="暂无内容"></el-empty>
	</div>
</template>

<script>
import useCharts from '@/hooks/useInitCharts'

export default {
	props: {
		width: {
			type: String,
			default: '100'
		},
		reportData: {
			type: Object
		}
	},
	data() {
		return {
			isShow: true
		}
	},
	created() {
		if (Object.keys(this.reportData).length === 0) {
			this.isShow = false
		}
	},
	watch: {
		reportData: {
			handler(newValue, oldValue) {
				this.isShow = true
				useCharts(this.$refs.container, newValue)
			},
			deep: true
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	height: 500px;
	background-color: #fff;
	border-radius: 15px;
}
</style>
