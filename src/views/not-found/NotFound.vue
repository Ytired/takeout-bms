<template>
	<div class="notFound">
		<img src="~@/assets/images/404error.svg" alt="" />
		<el-button type="primary" round class="to-home" @click="toHome">回到首页</el-button>
	</div>
</template>

<script>
export default {
	methods: {
		toHome() {
			this.$router.push('/main')
		}
	}
}
</script>

<style lang="less" scoped>
.notFound {
	width: 100vw;
	height: 100vh;
	img {
		width: 100%;
		height: 100%;
	}

	.to-home {
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 700;
	}
}
</style>
