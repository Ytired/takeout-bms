import {
	Button,
	Form,
	FormItem,
	Input,
	Checkbox,
	Container,
	Aside,
	Header,
	Main,
	Breadcrumb,
	BreadcrumbItem,
	Menu,
	MenuItemGroup,
	MenuItem,
	Submenu,
	Col,
	Card,
	Row,
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Tag,
	Table,
	TableColumn,
	Pagination,
	Switch,
	Image,
	Select,
	Option,
	DatePicker,
	Upload,
	Dialog,
	Rate,
	InputNumber,
	Divider,
	Empty,
	Notification,
	Message,
	CheckboxGroup,
	TimePicker
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)

// 将导入的组件放进数组
const components = [
	Button,
	Form,
	FormItem,
	Input,
	Checkbox,
	Container,
	Aside,
	Header,
	Main,
	Breadcrumb,
	BreadcrumbItem,
	Menu,
	MenuItemGroup,
	MenuItem,
	Submenu,
	Col,
	Card,
	Row,
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Tag,
	Table,
	TableColumn,
	Pagination,
	Switch,
	Image,
	Select,
	Option,
	DatePicker,
	Upload,
	Dialog,
	Rate,
	InputNumber,
	Divider,
	Empty,
	CheckboxGroup,
	TimePicker
]

// 导出函数
export default function (Vue) {
	Vue.prototype.Message = Message
	Vue.prototype.$notify = Notification
	// 对组件进行注册
	for (const cpn of components) {
		Vue.component(cpn.name, cpn)
	}
}
