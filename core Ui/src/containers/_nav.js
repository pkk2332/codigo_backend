export default [
	{
		_tag: 'CSidebarNavItem',
		name: 'Dashboard',
		to: '/dashboard',
		icon: 'cil-speedometer'
		// badge: {
		// 	color: 'info',
		// 	text: 'NEW'
		// }
	},

	{
		_tag: 'CSidebarNavDropdown',
		name: 'Evoucher',
		route: '/evoucher',
		icon: 'cil-bell',
		_children: [
			{
				_tag: 'CSidebarNavItem',
				name: 'create Evoucher',
				to: '/evoucher/create'
			},
			{
				_tag: 'CSidebarNavItem',
				name: 'All',
				to: '/evoucher'
			}
		]
	}
];
