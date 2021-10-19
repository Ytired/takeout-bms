<template>
	<div class="table">
		<div class="table-header" v-if="title">
			<span>{{ title }}</span>
			<el-button type="primary" v-if="isShowBtn" @click="openDialog">添加分类</el-button>
		</div>

		<!-- 表格 -->
		<el-table
			:data="listData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
			:height="tableHeight || 'auto'"
			v-if="listData.length !== 0"
			ref="multipleTable"
		>
			<!-- 选择框 -->
			<el-table-column
				v-if="showSelectColumn"
				type="selection"
				align="center"
				width="40"
			></el-table-column>

			<!-- 遍历配置 -->
			<template v-for="propItem in propList">
				<el-table-column
					v-bind="propItem"
					align="center"
					show-overflow-tooltip
					:key="propItem.prop"
				>
					<template #default="scope">
						<slot :name="propItem.slotName" :row="scope.row" :index="scope.$index">
							{{ scope.row[propItem.prop] }}
						</slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<el-empty v-else description="暂无数据"></el-empty>

		<!-- 分页 -->
		<div class="block" v-if="isShowPagination">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>

		<!-- 按钮 -->
		<div class="btn" v-if="isShowOperateBtn">
			<el-button type="danger" @click="deleteSelect">删除选中</el-button>
			<el-button type="primary" @click="toggleSelection">取消选中</el-button>
		</div>
	</div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'

export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		propList: {
			type: Array,
			default: () => []
		},
		isShowBtn: {
			type: Boolean,
			default: false
		},
		listData: {
			type: Array,
			default: () => []
		},
		showSelectColumn: {
			type: Boolean,
			default: false
		},
		isShowPagination: {
			type: Boolean,
			default: true
		},
		isShowOperateBtn: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			total: 0,
			tableHeight: '',
			currentPage: 1,
			pageSize: 10,
			selection: []
		}
	},
	methods: {
		handleSizeChange(val) {
			this.pageSize = val
			// 更改每页多少条
			EventBus.$emit('changeSize', this.pageSize)
			console.log(`每页 ${val} 条`)
		},
		handleCurrentChange(val) {
			EventBus.$emit('changePage', val, this.pageSize)
			// 当钱页面
			console.log(`当前页: ${val}`)
		},
		handleSelectionChange(val) {
			this.selection = val
		},
		openDialog() {
			EventBus.$emit('openDialog', '显示')
		},
		deleteSelect() {
			const arr = this.selection.map(item => item.id)
			console.log(arr)
			EventBus.$emit('deleteItem', arr)
		},
		toggleSelection() {
			this.$refs.multipleTable.clearSelection()
		}
	},
	mounted() {
		const row = document.querySelector('.el-table__row')
		setTimeout(() => {
			this.tableHeight = row?.offsetHeight * 11 + ''
		}, 0)

		// 监听事件
		EventBus.$on('total', value => {
			this.total = value
		})
	},
	destroyed() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped>
.table {
	background-color: #fff;
	border-radius: 15px;
	padding: 15px;

	.table-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		border-bottom: 1px solid #ebeef5;

		span {
			font-weight: 700;
		}
	}

	.block {
		margin-top: 10px;
	}
	.btn {
		margin-top: 20px;
		button {
			margin-right: 10px;
		}
	}
}
</style>
