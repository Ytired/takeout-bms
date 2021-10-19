<template>
	<el-row :gutter="20" class="main-card">
		<el-col :span="6" v-for="(item, index) in cardData" :key="index">
			<el-card shadow="always">
				<div class="card-content">
					<i :class="item.icon" :style="{ color: color[index] }"></i>
					<div class="card-data">
						<span>{{ item.title }}</span>
						<strong>{{ cardData2[index] }}</strong>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
export default {
	props: ['totalOrder', 'totayAmount', 'todayOrder', 'totalAmount'],
	data() {
		return {
			color: ['#1296db', '#d31c76', '#1296db', '#1afa29'],
			cardData: [
				{
					icon: 'el-icon-document',
					title: '总订单',
					order: '102,400'
				},
				{
					icon: 'el-icon-coin',
					title: '总销售额',
					order: '102,400'
				},
				{
					icon: 'el-icon-s-order',
					title: '今日订单数',
					order: '102,400'
				},
				{
					icon: 'el-icon-s-data',
					title: '今日销售额',
					order: '102,400'
				}
			],
			cardData2: []
		}
	},
	watch: {
		totalOrder() {
			this.cardData2 = [this.totalOrder, this.totayAmount, this.todayOrder, this.totalAmount]
		}
	}
}
</script>

<style lang="less" scoped>
.main-card {
	margin-bottom: 40px;
	.card-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;

		i {
			font-size: 50px;
		}

		.card-data {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-left: 30px;

			span {
				font-weight: 700;
				color: #cdcdcd;
				font-size: 20px;
				margin-bottom: 5px;
			}

			strong {
				font-size: 20px;
			}
		}
	}
}
</style>
