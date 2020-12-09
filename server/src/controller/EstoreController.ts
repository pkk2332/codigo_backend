import { getRepository, MoreThan } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Evoucher } from '../entity/Evoucher';
import { validate } from 'class-validator';
import { Code } from '../entity/Code';
import { PaymentTypes } from '../constant/PaymentType';
import { UserCode } from '../entity/UserCode';
import { UserGift } from '../entity/UserGift';
import { jwtsign } from '../auth';
import { format } from 'date-fns';

export class EstoreController {
	private UserCodeRepositry = getRepository(UserCode);
	private CodeRepository = getRepository(Code);
	private GiftRepository = getRepository(UserGift);

	today = new Date().toISOString();

	findone = async (id) => {
		return await this.CodeRepository
			.createQueryBuilder('code')
			.where('code.id=:id', { id })
			.andWhere('code.used=:used', { used: false })
			.andWhere('code.sold_out=:sold', { sold: false })
			.leftJoinAndSelect('code.evoucher', 'evoucher')
			.andWhere('Date(evoucher.expiry_date) >= :today', { today: this.today })
			.andWhere('evoucher.active=:active', { active: true })
			.getOne();
	};

	all = async (request: Request, response: Response, next: NextFunction) => {
		var page = request.query.page || 0;
		var codes = await this.CodeRepository
			.createQueryBuilder('code')
			.where('code.used=:used', { used: false })
			.andWhere('code.sold_out=:sold', { sold: false })
			.leftJoinAndSelect('code.evoucher', 'evoucher')
			.skip(page * 10)
			.take(10)
			.andWhere('Date(evoucher.expiry_date) >= :today', { today: this.today })
			.andWhere('evoucher.active = :active', { active: true })
			.getMany();
		return response.send(codes);
	};

	one = async (request: Request, response: Response, next: NextFunction) => {
		try {
			var id = request.params.id;
			var code = await this.findone(id);
			if (code) {
				return response.send(code);
			}
			return response.status(404).send({ msg: 'Couldnt find Code' });
		} catch (error) {
			return response.status(404).send(error);
		}
	};

	handleDiscount = async (code, payment_type) => {
		var amount = code.evoucher.amount;
		if (payment_type === code.evoucher.payment_discount_type) {
			var discount_amount = amount * (code.evoucher.discount_percent / 100);
			amount = amount - discount_amount;
		}
		return amount;
	};
	handleMebuytype = async (code, payment_type, response, phone_no) => {
		var used_code_count = await this.UserCodeRepositry.count({
			where: {
				phone_no: phone_no,
				evoucher: code.evoucher
			}
		});

		if (used_code_count >= code.evoucher.maximun_limit) {
			return response.send({ msg: 'Exceeding maximun limit' });
		}
		const amount = await this.handleDiscount(code, payment_type);

		const user_code = this.UserCodeRepositry.create({
			phone_no: phone_no,
			code: code,
			evoucher: code.evoucher,
			amount: amount
		});
		code.sold_out = true;
		this.CodeRepository.save(code);

		this.UserCodeRepositry.save(user_code);
		return response.send(user_code);
	};

	handleGiftType = async (code, payment_type, response, phone_no, toUser) => {
		var used_code_count = await this.GiftRepository.count({
			where: {
				phone_no: phone_no,
				evoucher: code.evoucher
			}
		});

		if (used_code_count >= code.evoucher.maximun_limit) {
			return response.send({ msg: 'Exceeding maximun limit' });
		}

		const amount = await this.handleDiscount(code, payment_type);
		const user_code = this.GiftRepository.create({
			to_user: toUser,
			phone_no: phone_no,
			code: code,
			evoucher: code.evoucher,
			amount: amount
		});

		code.sold_out = true;
		this.CodeRepository.save(code);

		this.GiftRepository.save(user_code);
		return response.send(user_code);
	};

	buyCode = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const { phone_no } = request.user.data;
			var id = request.params.id;
			var { payment_type, buy_type, to_user } = request.body;
			var code = await this.findone(id);
			if (!code) {
				return response.status(404).send({ msg: 'Couldnt find Code' });
			}
			if (buy_type !== 'gift') {
				return await this.handleMebuytype(code, payment_type, response, phone_no);
			}
			if (!to_user) {
				return response.status(422).send({ msg: 'to_user is required' });
			}
			return await this.handleGiftType(code, payment_type, response, phone_no, to_user);
		} catch (error) {
			return response.status(404).send(error);
		}
	};

	paymentList = async (request: Request, response: Response, next: NextFunction) => {
		return response.send(PaymentTypes);
	};

	verifyCode = async (request: Request, response: Response, next: NextFunction) => {
		var { promo_code } = request.body;
		const code = await this.CodeRepository.findOne({
			where: {
				promo_code: promo_code,
				sold_out: true,
				used: false
			}
		});

		if (code) {
			return response.send({ msg: 'This code is valid', amount: code.evoucher.amount });
		}
		return response.status(422).send({ msg: 'Invalid Code' });
	};

	purchaseHistory = async (request: Request, response: Response, next: NextFunction) => {
		const { phone_no } = request.user.data;
		const ForMeCode = await this.UserCodeRepositry.find({
			where: {
				phone_no
			},
			relations: [ 'evoucher', 'code' ]
		});
		const giftCode = await this.GiftRepository.find({
			where: {
				phone_no
			},
			relations: [ 'evoucher', 'code' ]
		});
		return response.send({ ForMeCode, giftCode });
	};

	login = async (request: Request, response: Response, next: NextFunction) => {
		const { phone_no, name } = request.body;
		if (!phone_no || !name) {
			return response.status(422).send({ msg: 'phone_no,name must be filled' });
		}
		var token = jwtsign({ phone_no, name });
		return response.send({
			token
		});
	};
}
