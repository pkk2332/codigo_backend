import React from 'react';

const Evouchers = React.lazy(() => import('./views/evoucher/index'));
const Login = React.lazy(() => import('./views/evoucher/login'));
const Createpage = React.lazy(() => import('./views/evoucher/create'));
const EditPage = React.lazy(() => import('./views/evoucher/edit'));
const routes = [
	{
		path: '/evoucher',
		exact: true,
		name: 'Evouchers',
		component: Evouchers,
		auth: true
	},
	{
		path: '/evoucher/create',
		exact: true,
		name: 'Evoucher Create',
		component: Createpage,
		auth: true
	},
	{
		path: '/evoucher/edit/:id',
		exact: true,
		name: 'Edit Evoucher',
		component: EditPage,
		auth: true
	},
	{ path: '/login', exact: true, name: 'Login', component: Login }
];

export default routes;
