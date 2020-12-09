import { EvoucherController } from '../src/controller/EvoucherController';

export const cms = [
	{
		method: 'post',
		route: '/evouchers',
		controller: EvoucherController,
		action: 'save'
	},
	{
		method: 'get',
		route: '/evouchers',
		controller: EvoucherController,
		action: 'all'
	},
	{
		method: 'get',
		route: '/evouchers/:id',
		controller: EvoucherController,
		action: 'one'
	},
	{
		method: 'post',
		route: '/evouchers/:id',
		controller: EvoucherController,
		action: 'update'
	},
	{
		method: 'post',
		route: '/evouchers/active/:id',
		controller: EvoucherController,
		action: 'changeActive'
	},
	{
		method: 'post',
		route: '/evouchers/auth/login',
		controller: EvoucherController,
		action: 'login',
		noMiddleware: true
	},
	{
		method: 'get',
		route: '/evouchers/payment/list',
		controller: EvoucherController,
		action: 'paymentList',
		noMiddleware: true
	}
];
