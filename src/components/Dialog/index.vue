<template>
	<div>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<!-- 添加分类 -->
			<el-form :model="data" label-width="auto" :inline="inline" v-if="isShow">
				<template v-if="title === '添加分类'">
					<el-form-item label="分类名称" :label-width="formLabelWidth">
						<el-input v-model="data.cateName" autocomplete="off" placeholder="分类名称"></el-input>
					</el-form-item>
					<el-form-item label="是否启用" :label-width="formLabelWidth">
						<el-switch
							v-model="data.state"
							active-color="#13ce66"
							inactive-color="#ff4949"
						></el-switch>
					</el-form-item>
				</template>

				<!-- 修改订单 -->
				<template v-else-if="title === '修改订单' && show === false">
					<el-form-item label="订单号">
						<el-input v-model="data.orderNo"></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="data.consignee"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="data.phone"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="data.deliverAddress"></el-input>
					</el-form-item>
					<el-form-item label="订单金额">
						<el-input-number
							v-model="data.orderAmount"
							:min="0"
							:max="99999999999"
							label="金额"
						></el-input-number>
					</el-form-item>
					<el-form-item label="订单状态">
						<el-select placeholder="订单状态" v-model="data.orderState">
							<el-option label="派送中" value="派送中"></el-option>
							<el-option label="已受理" value="已受理"></el-option>
							<el-option label="已完成" value="已完成"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单备注">
						<el-input v-model="data.remarks"></el-input>
					</el-form-item>
				</template>

				<!-- 修改账号 -->
				<template v-else-if="title === '修改账号'">
					<el-form-item label="账号">
						<el-input v-model="data.account" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用户组">
						<el-select v-model="data.userGroup" placeholder="请选择用户组">
							<el-option label="超级管理员" value="超级管理员"></el-option>
							<el-option label="普通管理员" value="普通管理员"></el-option>
						</el-select>
					</el-form-item>
				</template>

				<!-- 修改商品 -->
				<template v-else-if="title === '修改商品'">
					<el-form-item label="商品名称">
						<el-input v-model="data.name"></el-input>
					</el-form-item>
					<el-form-item label="商品分类">
						<el-input v-model="data.category"></el-input>
					</el-form-item>
					<el-form-item label="商品价格">
						<el-input-number v-model="data.price" :precision="2"></el-input-number>
					</el-form-item>
					<el-form-item label="商品描述">
						<el-input v-model="data.goodsDesc"></el-input>
					</el-form-item>
					<el-form-item label="商品图片">
						<UploadImage></UploadImage>
					</el-form-item>
				</template>

				<!-- 查看订单 -->
				<template v-if="show === '查看订单'">
					<el-form-item label="订单号">
						<el-input v-model="data.orderNo" disabled></el-input>
					</el-form-item>
					<el-form-item label="收货人">
						<el-input v-model="data.consignee" disabled></el-input>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="data.phone" disabled></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="data.deliverAddress" disabled></el-input>
					</el-form-item>
					<el-form-item label="订单金额">
						<el-input-number v-model="data.orderAmount" label="金额" disabled></el-input-number>
					</el-form-item>
					<el-form-item label="订单状态">
						<el-select placeholder="订单状态" disabled v-model="data.orderState"></el-select>
					</el-form-item>
					<el-form-item label="订单备注">
						<el-input v-model="data.remarks" disabled></el-input>
					</el-form-item>
					<el-form-item label="下单时间">
						<el-input v-model="data.orderTime" disabled></el-input>
					</el-form-item>
					<el-form-item label="送达时间">
						<el-input v-model="data.deliveryTime" disabled></el-input>
					</el-form-item>
				</template>
			</el-form>

			<el-form v-else :model="form" label-width="auto" :inline="inline">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.cateName" autocomplete="off" placeholder="分类名称"></el-input>
				</el-form-item>
				<el-form-item label="是否启用" :label-width="formLabelWidth">
					<el-switch
						v-model="form.state"
						active-color="#13ce66"
						inactive-color="#ff4949"
					></el-switch>
				</el-form-item>
			</el-form>

			<!-- 确认框 -->
			<div slot="footer" class="dialog-footer" v-if="!show">
				<el-button @click="closureDialog">取 消</el-button>
				<el-button type="primary" @click="closureDialog('ok')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import UploadImage from 'components/UploadImage'
import {
	changeOrderInfo,
	changeGoodsInfo,
	changeCategoryInfo,
	changeAccountInfo,
	deleteOrder,
	deleteCategory,
	deleteGoods,
	deleteAccount,
	addCategory,
	batchDeleteAccount
} from 'api/api'
import { success, error, confirm } from '@/utils/notify'

export default {
	props: { title: { type: String, required: true }, inline: { default: false } },
	components: { UploadImage },
	data() {
		return {
			form: {
				cateName: '',
				state: true
			},
			formLabelWidth: '120px',
			dialogFormVisible: false,
			data: {},
			isShow: true,
			editFn: {
				修改订单: changeOrderInfo,
				修改商品: changeGoodsInfo,
				添加分类: changeCategoryInfo,
				修改账号: changeAccountInfo
			},
			delFn: {
				修改订单: deleteOrder,
				修改商品: deleteGoods,
				添加分类: deleteCategory,
				修改账号: deleteAccount
			},
			imgUrl: '',
			show: false
		}
	},
	methods: {
		async closureDialog(confirm) {
			this.dialogFormVisible = false
			// 如果是确认按钮
			if (confirm === 'ok' && this.isShow === true) {
				const { editFn, title, data } = this
				let actionData = {}

				if (data.serialNumber) {
					delete data.serialNumber
				}

				if (data.imgUrl) {
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							actionData[key] = data[key]
						}
					}

					if (this.imgUrl === undefined || this.imgUrl === '') {
						actionData.imgUrl = actionData.imgUrl.substring(data.imgUrl.lastIndexOf('/') + 1)
					} else {
						actionData.imgUrl = this.imgUrl
						data.imgUrl = `http://39.103.221.52:3000/upload/imgs/goods_img/${this.imgUrl}`
					}
				}

				if (Object.keys(actionData).length !== 0) {
					const res = await changeGoodsInfo(actionData)
					if (res.code === 0) {
						success('修改成功')
					} else {
						error('修改失败')
					}
				} else {
					const res = await editFn[title](data)
					if (res.code === 0) {
						success('修改成功')
					} else {
						error('修改失败')
					}
				}
			} else {
				const res = await addCategory(this.form)
				if (!res.code) {
					this.Message.success({
						message: '添加成功!'
					})
				} else if (res.code === 1) {
					this.Message.info({
						message: '添加失败!'
					})
				}
			}
		}
	},
	mounted() {
		EventBus.$on('openDialog', (index, data, show) => {
			this.show = false
			// 判断显示哪一个表单
			if (index === '显示') {
				this.isShow = false
			} else if (show) {
				this.show = show
				this.data = data
			} else {
				this.imgUrl = data?.imgUrl
				this.isShow = true
				this.data = data
			}

			this.dialogFormVisible = true
		})

		// 监听删除
		EventBus.$on('deleteItem', (index, data) => {
			if (index.length === 0) {
				this.Message.warning({
					message: '请选中要删除的账号!'
				})
				return false
			}

			confirm(this.title.substring(2))
				.then(async () => {
					let res = null
					if (Array.isArray(index)) {
						res = await batchDeleteAccount(index)
					} else {
						const { delFn, title } = this
						res = await delFn[title](data.id)
					}

					// 判断状态码
					if (res.status === 200 || res.code === 0) {
						EventBus.$emit('changeSize', 10)
						this.Message.success({
							message: '删除成功!'
						})
					} else {
						this.Message.info({
							message: '删除失败!'
						})
					}
				})
				.catch(() => {
					this.Message.info({
						message: '已取消删除'
					})
				})
		})

		EventBus.$on('uploadImg', imgUrl => {
			this.imgUrl = imgUrl
		})
	},
	deactivated() {
		EventBus.$off()
	}
}
</script>

<style lang="less" scoped></style>
