<template>
	<div>
		<PageContent :tableData="contentTableConfig" :listData="listData"></PageContent>
		<Dialog title="修改账号"></Dialog>
	</div>
</template>

<script>
import PageContent from '@/base/page-content'
import { contentTableConfig } from './config/tabData'
import { getUserList } from 'api/api'
import { EventBus } from '@/utils/eventBus'
import { formatTime } from '@/utils/formatTime'
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
		const res = await getUserList(1, 10)
		this.listData = res.data
		formatTime(this.listData)
		EventBus.$emit('total', res.total)
	},
	mounted() {
		// 更改页面
		EventBus.$on('changePage', async (value, pageSize) => {
			const res = await getUserList(value, pageSize)
			this.listData = res.data
			formatTime(this.listData)
			EventBus.$emit('total', res.total)
		})
		// 更改条数
		EventBus.$on('changeSize', async value => {
			const res = await getUserList(1, value)
			this.listData = res.data
			formatTime(this.listData)
			EventBus.$emit('total', res.total)
		})
	},
	destroyed() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped></style>
