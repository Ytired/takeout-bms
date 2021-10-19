<template>
	<div>
		<PageContent :tableData="contentTableConfig" :listData="listData"></PageContent>
		<Dialog title="添加分类"></Dialog>
	</div>
</template>

<script>
import PageContent from '@/base/page-content'
import { contentTableConfig } from './config/tabData'
import { getProductCategoryList } from 'api/api'
import { EventBus } from '@/utils/eventBus'
import { handleData } from './config/handleCatData'
import Dialog from 'components/Dialog'

export default {
	components: {
		PageContent,
		Dialog
	},
	data() {
		return {
			contentTableConfig: contentTableConfig,
			listData: []
		}
	},
	async created() {
		const res = await getProductCategoryList(1, 10)
		const data = handleData(res)
		EventBus.$emit('total', res.total)
		this.listData = data
	},
	mounted() {
		// 更改页面
		EventBus.$on('changePage', async (value, pageSize) => {
			const res = await getProductCategoryList(value, pageSize)
			this.listData = handleData(res)
			EventBus.$emit('total', res.total)
		})
		// 更改条数
		EventBus.$on('changeSize', async value => {
			const res = await getProductCategoryList(1, value)
			this.listData = handleData(res)
			EventBus.$emit('total', res.total)
		})
	},
	destroyed() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped></style>
