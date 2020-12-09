import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Code } from './Code';
import { Evoucher } from './Evoucher';

@Entity()
export class UserGift {
	@PrimaryGeneratedColumn() id: number;

	@Column() phone_no: string;

	@Column() to_user: string;

	@ManyToOne(() => Evoucher, (evoucher) => evoucher.id)
	evoucher: Evoucher;

	@ManyToOne(() => Code, (Code) => Code.id)
	code: Code;

	@Column() amount: number;
}
