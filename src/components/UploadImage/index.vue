<template>
	<div>
		<el-upload
			:action="url"
			:file-list="fileList"
			list-type="picture-card"
			:on-success="handleSuccess"
			:before-upload="beforeAvatarUpload"
			:on-change="handeleChange"
			:on-remove="handleRemove"
		>
			<i slot="default" class="el-icon-plus"></i>
		</el-upload>
	</div>
</template>
<script>
import { EventBus } from '@/utils/eventBus'

export default {
	props: {
		fileList: {
			type: Array,
			default: () => []
		},
		url: {
			type: String,
			default: 'http://39.103.221.52:3000/goods/goods_img_upload'
		}
	},
	data() {
		return {}
	},
	methods: {
		handleRemove(file, fileList) {
			const imgArr = fileList.map(item => item.url)
			EventBus.$emit('removeImg', imgArr)
			console.log('handleRemove', file, fileList)
		},
		handleSuccess(respone) {
			if (!respone.code) {
				EventBus.$emit('uploadImg', respone.imgUrl)
				this.Message.success({
					message: '图片上传成功!'
				})
			} else {
				this.Message.error({
					message: '图片上传失败!'
				})
			}
			console.log('handleSuccess', respone)
		},
		beforeAvatarUpload(data) {
			console.log('beforeAvatarUpload', data)
		},
		handeleChange(file) {
			console.log('handeleChange', file)
		}
	},
	mounted() {
		console.log('挂载', this.fileList)
	},
	updated() {
		console.log('更新', this.fileList)
	}
}
</script>
