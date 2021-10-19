<template>
	<div class="userInfo">
		<strong>管理员信息</strong>
		<el-divider></el-divider>
		<span>
			管理员ID：
			<strong>{{ userInfo.id }}</strong>
		</span>
		<el-divider></el-divider>
		<span>
			账号：
			<strong>{{ userInfo.account }}</strong>
		</span>
		<el-divider></el-divider>
		<span>
			用户组：
			<strong>{{ userInfo.userGroup }}</strong>
		</span>
		<el-divider></el-divider>
		<span>
			创建时间：
			<strong>{{ userInfo.ctime | formatTime }}</strong>
		</span>
		<el-divider></el-divider>
		<el-upload
			class="avatar-uploader"
			action="http://127.0.0.1:3000/users/avatar_upload"
			:data="{ id: userInfo.id }"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			imageUrl: ''
		}
	},
	methods: {
		handleAvatarSuccess(res, file) {
			console.log()
			this.imageUrl = URL.createObjectURL(file.raw)
			if (!res.code) {
				this.userInfo.imgUrl = 'http://127.0.0.1:3000/upload/imgs/acc_img/' + res.imgUrl
				this.Message.success({
					message: '修改成功！',
					center: true
				})
			} else {
				this.Message.error({
					message: '修改失败！',
					center: true
				})
			}
		},
		beforeAvatarUpload(file) {
			const isJPG = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isJPG.includes(file.type)) {
				this.Message.error('上传头像图片只能是 JPG/PNG/WEBP 格式!')
			}
			if (!isLt2M) {
				this.Message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		}
	},
	created() {
		this.userInfo = this.$store.state.userInfo.userInfo
		this.imageUrl = this.userInfo.imgUrl
	},
	filters: {
		formatTime(str) {
			const date = new Date(str)
			const Y = date.getUTCFullYear()
			const M = date.getUTCMonth() + 1
			const D = date.getUTCDate()
			const h = date.getUTCHours()
			const m = date.getUTCMinutes()
			const s = date.getUTCSeconds()
			const zero = time => (time >= 10 ? time : '0' + time)
			return `${Y}-${zero(M)}-${zero(D)} ${zero(h)}:${zero(m)}:${zero(s)}`
		}
	}
}
</script>

<style lang="less" scoped>
.userInfo {
	margin: 10px 0;

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
}
</style>
