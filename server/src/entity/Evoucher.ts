import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Code } from './Code';
import { validateOrReject, IsDateString, IsDefined, IsDate, isNotEmpty, IsNotEmpty } from 'class-validator';

@Entity()
export class Evoucher {
	@PrimaryGeneratedColumn() id: number;

	@Column()
	@IsNotEmpty()
	title: string;

	@Column()
	@IsNotEmpty()
	description: string;

	@Column()
	@IsNotEmpty()
	@IsDate()
	expiry_date: Date;

	@Column()
	@IsNotEmpty()
	amount: number;

	@Column()
	@IsNotEmpty()
	payment_discount_type: string;

	@Column()
	@IsNotEmpty()
	discount_percent: number;

	@Column()
	@IsNotEmpty()
	maximun_limit: number;

	@Column()
	@IsNotEmpty()
	quantity: number;

	@OneToMany(() => Code, (code) => code.evoucher)
	code: Code[];

	@Column({
		default: false
	})
	active: boolean;

	@BeforeInsert()
	@BeforeUpdate()
	async validate() {
		await validateOrReject(this);
	}
}
