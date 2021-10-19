<template>
	<div class="order-manage">
		<div class="Search">
			<Search @searchData="handleSearch" />
		</div>
		<div class="order-table">
			<PageContent :tableData="contentTableConfig" :listData="productData"></PageContent>
		</div>
		<Dialog title="修改订单" :inline="true"></Dialog>
	</div>
</template>

<script>
import Search from 'components/Search'
import PageContent from '@/base/page-content'
import { tableDataConfig } from './config/tableDataConfig'
import { getOrderList } from 'api/api'
import { EventBus } from '@/utils/eventBus'
import { formatTime } from '@/utils/formatTime'
import Dialog from 'components/Dialog'

export default {
	components: {
		Search,
		PageContent,
		Dialog
	},
	data() {
		return {
			contentTableConfig: tableDataConfig,
			productData: []
		}
	},
	async created() {
		const res = await getOrderList(1, 10)
		this.productData = res.data
		formatTime(this.productData)
		EventBus.$emit('total', res.total)
	},
	methods: {
		async handleSearch(data) {
			const res = await getOrderList(1, 10, data)
			this.productData = res.data
			formatTime(this.productData)
			EventBus.$emit('total', res.total)
		}
	},
	mounted() {
		// 更改页面
		EventBus.$on('changePage', async (value, pageSize) => {
			console.log(pageSize)
			const res = await getOrderList(value, pageSize)
			this.productData = res.data
			formatTime(this.productData)
			EventBus.$emit('total', res.total)
		})
		// 更改条数
		EventBus.$on('changeSize', async value => {
			const res = await getOrderList(1, value)
			this.productData = res.data
			formatTime(this.productData)
			EventBus.$emit('total', res.total)
		})
	},
	destroyed() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped>
.order-manage {
	width: 100%;
	background-color: #fff;
	border-radius: 15px;

	.Search {
		padding: 20px 20px 0;
	}
}
</style>
