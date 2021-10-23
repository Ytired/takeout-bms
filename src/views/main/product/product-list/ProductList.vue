<template>
	<div class="product-list">
		<PageContent :tableData="contentTableConfig" :listData="productData">
			<!-- image插件 -->
			<template #image="scope">
				<el-image
					style="width: 60px; height: 60px"
					:src="scope.row.imgUrl"
					:preview-src-list="[scope.row.imgUrl]"
				></el-image>
			</template>

			<!-- 展开行 -->
			<template #unfold="scope">
				<el-form label-position="center" inline class="demo-table-expand">
					<el-form-item
						v-for="(item, index) in scope.row.productInfo"
						:key="index"
						:label="item.title"
					>
						<span>{{ item.value }}</span>
					</el-form-item>
				</el-form>
			</template>
		</PageContent>

		<Dialog title="修改商品"></Dialog>
	</div>
</template>

<script>
import PageContent from '@/base/page-content'
import { contentTableConfig } from './config/tabData'
import { getProductList } from 'api/api'
import { EventBus } from '@/utils/eventBus'
import { handleData } from '@/hooks/useHandleData'
import Dialog from 'components/Dialog'

export default {
	components: {
		PageContent,
		Dialog
	},
	data() {
		return {
			contentTableConfig: contentTableConfig,
			productData: []
		}
	},
	async created() {
		const res = await getProductList(1, 10)
		const data = handleData(res)
		this.productData = data
		EventBus.$emit('total', res.total)
	},
	mounted() {
		// 更改页面
		EventBus.$on('changePage', async (value, pageSize) => {
			const res = await getProductList(value, pageSize)
			const data = handleData(res)
			this.productData = data
			EventBus.$emit('total', res.total)
		})
		// 更改条数
		EventBus.$on('changeSize', async value => {
			const res = await getProductList(1, value)
			const data = handleData(res)
			this.productData = data
			EventBus.$emit('total', res.total)
		})
	},
	destroyed() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped></style>
