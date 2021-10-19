import * as echarts from 'echarts'

export default function useInitCharts(el, options) {
	console.log(options)
	const echart = echarts.init(el)
	const option = judge(options)
	echart.setOption(option)
}

function judge(options) {
	switch (options.title) {
		case '数据统计':
			return {
				title: {
					text: options.title
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['订单', '销售额', '注册人数', '管理员人数']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: options.xData
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '订单',
						type: 'line',
						stack: 'Total',
						data: options.orderData
					},
					{
						name: '销售额',
						type: 'line',
						stack: 'Total',
						data: options.amountData
					},
					{
						name: '注册人数',
						type: 'line',
						stack: 'Total',
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '管理员人数',
						type: 'line',
						stack: 'Total',
						data: [320, 332, 301, 334, 390, 330, 320]
					}
				]
			}
		case '商品统计':
			return {
				title: {
					text: options.title
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['订单', '销售额', '注册人数', '管理员人数']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [
						'2019/11/17',
						'2019/11/18',
						'2019/11/19',
						'2019/11/20',
						'2019/11/21',
						'2019/11/22',
						'2019/11/23'
					]
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '订单',
						type: 'line',
						stack: 'Total',
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '销售额',
						type: 'line',
						stack: 'Total',
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '注册人数',
						type: 'line',
						stack: 'Total',
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '管理员人数',
						type: 'line',
						stack: 'Total',
						data: [320, 332, 301, 334, 390, 330, 320]
					}
				]
			}
		case '堆叠区域图':
			return {
				title: {
					text: options.title
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '邮件营销',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '联盟广告',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '视频广告',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '直接访问',
						type: 'line',
						stack: 'Total',
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [320, 332, 301, 334, 390, 330, 320]
					},
					{
						name: '搜索引擎',
						type: 'line',
						stack: 'Total',
						label: {
							show: true,
							position: 'top'
						},
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				]
			}
	}
}
