// 表单校验规则
export const rules = {
	orderNo: [
		{
			pattern: /^[0-9]{4,18}$/,
			message: 'id为4为以上的数字~',
			trigger: 'blur'
		}
	],
	consignee: [
		{
			pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
			message: '密码必须是英文或者汉字~',
			trigger: 'blur'
		}
	],
	phone: [
		{
			pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
			message: '手机号为11尾数的号码~',
			trigger: 'blur'
		}
	],
	orderState: [{ required: false }],
	date: [{ required: false }]
}
