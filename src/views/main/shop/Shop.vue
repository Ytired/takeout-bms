<template>
	<div class="shop-manage">
		<h1>
			店铺管理
			<el-button type="primary" @click="handleSave">保存</el-button>
		</h1>
		<div class="shop-manage-content">
			<div style="width: 600px">
				<el-form ref="form" label-width="auto">
					<el-form-item label="店铺名称">
						<el-input v-model="shopDetails.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺公告">
						<el-input
							type="textarea"
							placeholder="请输入内容"
							clearable
							rows="8"
							v-model="shopDetails.bulletion"
							:value="shopDetails.bulletion"
						></el-input>
					</el-form-item>
					<el-form-item label="店铺头像">
						<el-image
							style="width: 200px; height: 200px; border-radius: 10px"
							:src="shopDetails.avatar"
							:preview-src-list="shopDetails.pics"
							lazy
						></el-image>
					</el-form-item>
					<el-form-item label="店铺图片">
						<UploadImage :fileList="fileList" url="http://127.0.0.1:3000/shop/upload" />
					</el-form-item>
					<el-form-item label="配送费">
						<el-input v-model="shopDetails.deliveryPrice" />
					</el-form-item>
					<el-form-item label="配送时间">
						<el-input v-model="shopDetails.deliveryTime" />
					</el-form-item>
					<el-form-item label="配送描述">
						<el-input v-model="shopDetails.description" />
					</el-form-item>
					<el-form-item label="评分" class="rate">
						<el-rate v-model="shopDetails.score" show-score allow-half></el-rate>
					</el-form-item>
					<el-form-item label="销量">
						<el-input placeholder="0" v-model="shopDetails.sellCount" />
					</el-form-item>
					<el-form-item label="添加活动">
						<el-input v-model="activity" />
					</el-form-item>
					<el-form-item label="活动">
						<el-checkbox-group v-model="shopDetails.supports">
							<el-checkbox label="在线支付满28减5" value="在线支付满28减5"></el-checkbox>
							<el-checkbox label="VC无限橙果汁全场8折" value="VC无限橙果汁全场8折"></el-checkbox>
							<el-checkbox label="单人精彩套餐" value="单人精彩套餐"></el-checkbox>
							<el-checkbox label="特价饮品8折抢购" value="特价饮品8折抢购"></el-checkbox>
							<el-checkbox label="单人特色套餐" value="单人特色套餐"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="营业时间">
						<el-time-picker
							is-range
							v-model="shopDetails.date"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围"
							value-format="yyyy-MM-dd hh:mm:ss"
						></el-time-picker>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import UploadImage from 'components/UploadImage'
import { getShopDetails, changeShopDetails } from 'api/api'
import { EventBus } from '@/utils/eventBus'

export default {
	components: { UploadImage },
	data() {
		return {
			shopDetails: {
				supports: []
			},
			fileList: [],
			activity: ''
		}
	},
	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePreview(file) {
			console.log(file)
		},
		async handleSave() {
			let data = {}
			for (const key in this.shopDetails) {
				if (this.shopDetails.hasOwnProperty(key)) {
					if (key === 'avatar') {
						data[key] = this.shopDetails[key].substring(this.shopDetails[key].lastIndexOf('/') + 1)
					} else if (key === 'pics' && this.shopDetails[key].length !== 0) {
						data[key] = this.shopDetails.pics.map(item => {
							if (item.includes('http://127.0.0.1:3000/upload/shop/')) {
								return item.substring(this.shopDetails.avatar.lastIndexOf('/') + 1)
							}
							return item
						})
					} else {
						data[key] = this.shopDetails[key]
					}
				}
			}

			for (const key in data) {
				if (key === 'date' || key === 'pics' || key === 'supports') {
					data[key] = JSON.stringify(data[key])
				}
			}
			const res = await changeShopDetails(data)

			if (!res.code) {
				this.Message.success({ message: '修改成功', center: true })
			} else {
				this.Message.error({ message: '修改失败', center: true })
			}
		}
	},
	async created() {
		const res = await getShopDetails()
		this.shopDetails = res.data
		this.fileList = res.data.pics.map(item => ({ url: item }))
	},
	mounted() {
		EventBus.$on('uploadImg', imgUrl => {
			this.shopDetails.pics.push(imgUrl)
		})
	},
	destroyed() {
		EventBus.$off()
	},
	watch: {
		'shopDetails.supports'(newValue, oldValue) {
			if (newValue.length !== oldValue.length) {
				this.activity = newValue.join(' ')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.shop-manage {
	background-color: #fff;
	border-radius: 15px;
	h1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ebebeb;
		height: 60px;
		padding: 0 10px;
	}

	.shop-manage-content {
		padding: 10px 20px;
		overflow-y: auto;
		height: 730px;
	}

	.rate {
		display: flex;
		align-items: center;
	}
}
</style>
