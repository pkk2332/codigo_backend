import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { cms } from '../routes/cms';
import { estore } from '../routes/estore';
import { AuthMiddlware } from './auth';
var cors = require('cors');
require('dotenv').config();

const path = require('path');

const fakeMiddleware = (req, res, next) => {
	return next();
};

const registerRoute = (routes, app, middleware?) => {
	var applyMiddlware = middleware ? middleware : fakeMiddleware;
	routes.forEach((route) => {
		if (route.noMiddleware) {
			applyMiddlware = fakeMiddleware;
		}
		const controller = new (route.controller as any)();
		(app as any)[route.method](route.route, applyMiddlware, controller[route.action]);
	});
};

const dir = path.join(__dirname, 'qr_img');

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(express.static(dir));
		app.use(cors());
		app.use(
			bodyParser.urlencoded({
				extended: true
			})
		);
		// register express routes from defined application routes
		registerRoute(cms, app, AuthMiddlware);
		registerRoute(estore, app, AuthMiddlware);

		// setup express app here
		// ...

		// start express server
		app.listen(8000);

		console.log('Express server has started on port 8000. ');
	})
	.catch((error) => console.log(error));
