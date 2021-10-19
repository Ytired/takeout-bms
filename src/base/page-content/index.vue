<template>
	<div class="page-content">
		<div class="page-main">
			<Table v-bind="tableData" :listData="listData">
				<!-- 切换按钮 -->
				<template #switchBtn="scope">
					<el-switch
						v-model="scope.row.state"
						active-color="#13ce66"
						inactive-color="#ff4949"
						disabled
					></el-switch>
				</template>

				<!-- 操作按钮 -->
				<template #operate="scope">
					<el-button
						size="mini"
						type="info"
						v-if="tableData.isShow"
						@click="handleShow(scope.index, scope.row)"
					>
						查看
					</el-button>
					<el-button type="primary" size="mini" @click="handleEdit(scope.index, scope.row)">
						编辑
					</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.index, scope.row)">
						删除
					</el-button>
				</template>

				<!-- 动态生成其他插槽 -->
				<template v-for="item in slotData" #[item.slotName]="scope">
					<template v-if="item.slotName">
						<slot :name="item.slotName" :row="scope.row" :index="scope.$index"></slot>
					</template>
				</template>
			</Table>
		</div>
	</div>
</template>

<script>
import Table from 'components/Table'
import Dialog from 'components/Dialog'
import { EventBus } from '@/utils/eventBus'
import { confirm } from '@/utils/notify'

export default {
	props: {
		tableData: {
			type: Object,
			required: true
		},
		listData: {
			type: Array,
			default: () => []
		}
	},
	components: {
		Table,
		Dialog
	},
	data() {
		return {
			slotData: [],
			dialogFormVisible: false
		}
	},
	created() {
		this.slotData = this.tableData?.propList?.filter(item => {
			if (item.slotName === 'switchBtn') return false
			if (item.slotName === 'operate') return false
			return true
		})
	},
	methods: {
		handleEdit(index, row) {
			EventBus.$emit('openDialog', index, row)
		},
		handleDelete(index, row) {
			EventBus.$emit('deleteItem', index, row)
		},
		handleShow(index, row) {
			EventBus.$emit('openDialog', index, row, '查看订单')
		}
	}
}
</script>

<style lang="less" scoped></style>
