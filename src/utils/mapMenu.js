// 菜单
export function pathMapToMenu(userMenus, currentPath, breadcrumbs) {
	for (const menu of userMenus) {
		if (menu.type === 1) {
			const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
			if (findMenu) {
				breadcrumbs?.push({ name: menu.name })
				breadcrumbs?.push({ name: findMenu.name })
				return findMenu
			}
		} else if (menu.type === 2 && menu.url === currentPath) {
			return menu
		}
	}
}
