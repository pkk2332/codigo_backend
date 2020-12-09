import { NextFunction, Request, Response } from 'express';

var jwt = require('jsonwebtoken');

function extractToken(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}

export const AuthMiddlware = (req: Request, res: Response, next: NextFunction) => {
	const token = extractToken(req);
	jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
		if (err) {
			return res.status(401).send({ msg: 'Unauthorized' });
		}
		req.user = decoded;
		return next();
	});
};

export const jwtsign = (data) => {
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, ///1 day
			data
		},
		process.env.SECRET_KEY
	);
};
