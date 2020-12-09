import { EstoreController } from '../src/controller/EstoreController';

export const estore = [
	{
		method: 'get',
		route: '/estore',
		controller: EstoreController,
		action: 'all'
	},
	{
		method: 'get',
		route: '/estore/:id',
		controller: EstoreController,
		action: 'one'
	},
	{
		method: 'post',
		route: '/estore/:id',
		controller: EstoreController,
		action: 'buyCode'
	},
	{
		method: 'get',
		route: '/estore/payment/list',
		controller: EstoreController,
		action: 'paymentList'
	},
	{
		method: 'post',
		route: '/estore/verify/code',
		controller: EstoreController,
		action: 'verifyCode'
	},
	{
		method: 'get',
		route: '/estore/purchase/history',
		controller: EstoreController,
		action: 'purchaseHistory'
	},
	{
		method: 'post',
		route: '/estore/auth/login',
		controller: EstoreController,
		action: 'login',
		noMiddleware: true
	}
];
