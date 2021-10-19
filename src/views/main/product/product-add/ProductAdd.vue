<template>
	<div class="prouct-add">
		<h1>商品添加</h1>
		<div class="product-add-content">
			<div>
				<el-form label-width="auto" ref="form">
					<el-form-item label="商品名称">
						<el-input placeholder="商品名称" v-model="goodsData.name" />
					</el-form-item>
					<el-form-item label="商品分类">
						<el-select v-model="goodsData.category" placeholder="请选择">
							<el-option
								:value="item.cateName"
								v-for="item in options"
								:key="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品价格">
						<el-input-number
							v-model="goodsData.price"
							:min="1"
							label="请输入价格"
						></el-input-number>
					</el-form-item>
					<el-form-item label="商品图片">
						<UploadImage />
					</el-form-item>
					<el-form-item label="商品描述">
						<el-input
							type="textarea"
							placeholder="请输入内容"
							maxlength="100"
							show-word-limit
							clearable
							rows="5"
							v-model="goodsData.goodsDesc"
						></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="handleAddGoods">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import UploadImage from 'components/UploadImage'
import { EventBus } from '@/utils/eventBus'
import { addGoods, getCategorys } from 'api/api'

export default {
	components: { UploadImage },
	data() {
		return {
			goodsData: {
				name: '',
				category: '',
				price: 0,
				goodsDesc: '',
				imgUrl: '1634568124120.jpg'
			},
			options: []
		}
	},
	async created() {
		const res = await getCategorys()
		this.options = res.categories
	},
	mounted() {
		EventBus.$on('uploadImg', imgUrl => {
			this.goodsData.imgUrl = imgUrl
		})
	},
	destroyed() {
		EventBus.$off()
	},
	methods: {
		async handleAddGoods() {
			const res = await addGoods(this.goodsData)
			if (!res.code) {
				this.Message.success({
					message: '添加成功!',
					center: true
				})
			} else {
				this.Message.error({
					message: '添加失败!',
					center: true
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.prouct-add {
	width: 100%;
	background-color: #fff;
	border-radius: 15px;

	h1 {
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
	}

	.product-add-content {
		padding: 20px;
		& > div {
			width: 500px;
		}
	}
}
</style>
